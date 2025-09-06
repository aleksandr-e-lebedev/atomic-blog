import type { PostType, GetArchiveSuccessResponse } from "@/types";
import { DEFAULT_ERR_MSG } from "@/config";
import { sleep } from "@/utils";

// Get All Archive Posts
export async function getArchive(): Promise<PostType[]> {
  await sleep();
  const res = await fetch("/api/posts/archive");
  if (!res.ok) throw new Error(DEFAULT_ERR_MSG);
  const { data } = (await res.json()) as GetArchiveSuccessResponse;
  return data.archive;
}
