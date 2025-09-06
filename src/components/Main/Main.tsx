import { useState } from "react";

import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Message from "@/components/Message";
import ErrorMessage from "@/components/ErrorMessage";

import type { PostType } from "@/types";
import { usePosts } from "@/contexts/PostsContext";

import "./Main.styles.css";

interface AddPostFormProps {
  className?: string;
}

function AddPostForm(props: AddPostFormProps) {
  const { className = "" } = props;

  // Global Remote State
  const { addPostState, getPostsState } = usePosts();
  const { addPost } = addPostState;
  const { getPosts } = getPostsState;

  // Local UI State
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title || !body) return;
    const post = { title, body };

    async function addAndGetPosts() {
      await addPost(post);
      await getPosts();
    }

    void addAndGetPosts();

    setTitle("");
    setBody("");
  }

  const formClassName = className
    ? `form add-post-form ${className}`
    : "form add-post-form";

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <Input
        type="text"
        className="form__input"
        placeholder="Post title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Textarea
        className="form__textarea"
        placeholder="Post body"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <Button type="submit">Add post</Button>
    </form>
  );
}

interface PostProps {
  post: PostType;
}

function Post({ post }: PostProps) {
  return (
    <li className="posts__post">
      <h3 className="posts__post-title">{post.title}</h3>
      <p className="posts__post-text">{post.body}</p>
    </li>
  );
}

interface PostsProps {
  className?: string;
  posts: PostType[];
}

function Posts(props: PostsProps) {
  const { className = "", posts } = props;

  return (
    <div className={className ? `posts ${className}` : "posts"}>
      <ul className="posts__list">
        {posts.map((post) => (
          <li className="posts__list-item" key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface MainProps {
  className?: string;
  posts: PostType[];
}

export default function Main(props: MainProps) {
  const { className = "", posts } = props;

  // Global Remote State
  const { getPostsState } = usePosts();
  const { status, error } = getPostsState;

  // Derived Remote State (for Readability)
  const isLoading = status === "pending";
  const isLoaded = status === "success";
  const isEmpty = posts.length === 0;

  return (
    <main className={className ? `main ${className}` : "main"}>
      <AddPostForm className="main__form" />
      {isLoading && <Spinner />}
      {isLoaded && <Posts className="main__posts" posts={posts} />}
      {isLoaded && isEmpty && <Message message="Start by posting a new post" />}
      {error && <ErrorMessage message={error.message} />}
    </main>
  );
}
