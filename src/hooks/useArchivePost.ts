import { useState, useCallback } from "react";

import type { PostType } from "@/types";
import { DEFAULT_ERR_MSG } from "@/config";
import { archivePost as archive } from "@/api/archive";

type Status = "idle" | "pending" | "success" | "failure";

export interface ArchivePostState {
  status: Status;
  post: PostType | null;
  error: Error | null;
  archivePost: (id: string, archived: boolean) => Promise<void>;
}

export function useArchivePost(): ArchivePostState {
  const [status, setStatus] = useState<Status>("idle");
  const [post, setPost] = useState<PostType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const archivePost = useCallback(async function archivePost(
    id: string,
    archived: boolean
  ) {
    try {
      setStatus("pending");
      setPost(null);
      setError(null);

      const data = await archive(id, archived);

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

  return { status, post, error, archivePost };
}
