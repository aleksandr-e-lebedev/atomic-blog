import { createServer, Response } from "miragejs";
import { faker } from "@faker-js/faker";

import type { PostType } from "@/types";

function createPosts(quantity: number): PostType[] {
  return Array.from({ length: quantity }, () => ({
    id: crypto.randomUUID(),
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  }));
}

function makePostNotFoundResponse() {
  return new Response(
    404,
    {},
    { status: "failed", message: "There is no such post with the specified ID" }
  );
}

// RESTful archiving of entities in WebAPI
// https://stackoverflow.com/questions/16201905/restful-archiving-of-entities-in-webapi

createServer({
  seeds(server) {
    server.db.loadData({
      posts: createPosts(2),
      archive: createPosts(2),
    });
  },

  routes() {
    // Get All Current Posts
    this.get("/api/posts", (schema) => {
      return {
        status: "success",
        results: (schema.db.posts as PostType[]).length,
        data: { posts: schema.db.posts as PostType[] },
      };
    });

    // Add New Current Post
    this.post("/api/posts", (schema, request) => {
      const data = {
        id: crypto.randomUUID(),
        ...(JSON.parse(request.requestBody) as Omit<PostType, "id">),
      };
      const post = schema.db.posts.insert(data) as PostType;
      return { status: "success", data: { post } };
    });

    // Delete All Current Posts
    this.delete("api/posts", (schema) => {
      schema.db.posts.remove();
      return {
        status: "success",
        message: "All posts have been deleted.",
      };
    });

    // Move Post to Archive or Move Post from Archive
    this.put("/api/posts/:id/archive", (schema, request) => {
      const { archived } = JSON.parse(request.requestBody) as {
        archived: boolean;
      };
      const id = request.params.id;

      if (archived) {
        // Move Post to Archive
        const post = schema.db.posts.find(id) as PostType | null;
        if (post) {
          schema.db.posts.remove(id);
          schema.db.archive.insert({ ...post, id: crypto.randomUUID() });
          return { status: "success", data: { post } };
        } else {
          return makePostNotFoundResponse();
        }
      }

      // Move Post from Archive
      const post = schema.db.archive.find(id) as PostType | null;
      if (post) {
        schema.db.archive.remove(id);
        schema.db.posts.insert({ ...post, id: crypto.randomUUID() });
        return { status: "success", data: { post } };
      } else {
        return makePostNotFoundResponse();
      }
    });

    // Get All Archive Posts
    this.get("/api/posts/archive", (schema) => {
      return {
        status: "success",
        results: (schema.db.archive as PostType[]).length,
        data: { archive: schema.db.archive as PostType[] },
      };
    });
  },
});
