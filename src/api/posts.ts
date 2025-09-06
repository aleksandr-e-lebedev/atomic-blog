import type { PostType, GetPostsSuccessResponse } from "@/types";
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
