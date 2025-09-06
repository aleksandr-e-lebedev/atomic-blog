import { useState, useCallback } from "react";

import type { PostType } from "@/types";
import { DEFAULT_ERR_MSG } from "@/config";
import { addPost as addNewPost } from "@/api/posts";

type Status = "idle" | "pending" | "success" | "failure";

export interface AddPostState {
  status: Status;
  post: PostType | null;
  error: Error | null;
  addPost: (post: Omit<PostType, "id">) => Promise<void>;
}

export function useAddPost(): AddPostState {
  const [status, setStatus] = useState<Status>("idle");
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const addPost = useCallback(async function addPost(
    post: Omit<PostType, "id">
  ) {
    try {
      setStatus("pending");
      setPost(null);
      setError(null);

      const data = await addNewPost(post);

      setStatus("success");
      setPost(data);
    } catch (error) {
      setStatus("failure");

      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(DEFAULT_ERR_MSG));
      }
    }
  }, []);

  return { status, post, error, addPost };
}
