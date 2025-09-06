import { useState, useCallback } from "react";

import type { PostType } from "@/types";
import { DEFAULT_ERR_MSG } from "@/config";
import { getPosts as getAllPosts } from "@/api/posts";

type Status = "idle" | "pending" | "success" | "failure";

export interface GetPostsState {
  status: Status;
  posts: PostType[];
  error: Error | null;
  getPosts: () => Promise<void>;
}

export function useGetPosts(): GetPostsState {
  const [status, setStatus] = useState<Status>("idle");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const getPosts = useCallback(async function getPosts() {
    try {
      setStatus("pending");
      setPosts([]);
      setError(null);

      const data = await getAllPosts();

      setStatus("success");
      setPosts(data);
    } catch (error) {
      setStatus("failure");

      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(DEFAULT_ERR_MSG));
      }
    }
  }, []);

  return { status, posts, error, getPosts };
}
