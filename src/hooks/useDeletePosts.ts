import { useState, useCallback } from "react";

import { DEFAULT_ERR_MSG } from "@/config";
import { deletePosts as deleteAllPosts } from "@/api/posts";

type Status = "idle" | "pending" | "success" | "failure";

export interface DeletePostsState {
  status: Status;
  error: Error | null;
  deletePosts: () => Promise<void>;
}

export function useDeletePosts(): DeletePostsState {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<Error | null>(null);

  const deletePosts = useCallback(async function deletePosts() {
    try {
      setStatus("pending");
      setError(null);

      await deleteAllPosts();

      setStatus("success");
    } catch (error) {
      setStatus("failure");

      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(DEFAULT_ERR_MSG));
      }
    }
  }, []);

  return { status, error, deletePosts };
}
