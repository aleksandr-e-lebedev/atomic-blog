import { useState, useCallback } from "react";

import type { PostType } from "@/types";
import { DEFAULT_ERR_MSG } from "@/config";
import { getArchive as getArchivePosts } from "@/api/archive";

type Status = "idle" | "pending" | "success" | "failure";

export interface GetArchiveState {
  status: Status;
  posts: PostType[];
  error: Error | null;
  getArchive: () => Promise<void>;
}

export function useGetArchive(): GetArchiveState {
  const [status, setStatus] = useState<Status>("idle");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const getArchive = useCallback(async function getArchive() {
    try {
      setStatus("pending");
      setPosts([]);
      setError(null);

      const data = await getArchivePosts();

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

  return { status, posts, error, getArchive };
}
