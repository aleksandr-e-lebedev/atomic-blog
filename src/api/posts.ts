import type {
  PostType,
  GetPostsSuccessResponse,
  AddPostSuccessResponse,
  DeletePostsSuccessResponse,
} from "@/types";
import { DEFAULT_ERR_MSG } from "@/config";
import { sleep } from "@/utils";

// Get All Current Posts
export async function getPosts(): Promise<PostType[]> {
  await sleep();
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error(DEFAULT_ERR_MSG);
  const { data } = (await res.json()) as GetPostsSuccessResponse;
  return data.posts;
}

// Add New Current Post
export async function addPost(post: Omit<PostType, "id">): Promise<PostType> {
  await sleep();
  const res = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!res.ok) throw new Error(DEFAULT_ERR_MSG);
  const { data } = (await res.json()) as AddPostSuccessResponse;
  return data.post;
}

// Delete All Current Posts
export async function deletePosts(): Promise<null> {
  await sleep();
  const res = await fetch("/api/posts", { method: "DELETE" });
  if (!res.ok) throw new Error(DEFAULT_ERR_MSG);
  (await res.json()) as DeletePostsSuccessResponse;
  return null;
}
