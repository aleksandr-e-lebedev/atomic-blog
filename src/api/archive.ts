import type {
  PostType,
  GetArchiveSuccessResponse,
  ArchiveSuccessResponse,
  ArchiveFailedResponse,
} from "@/types";
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

// Move Current Post to Archive or Move Post from Archive
export async function archivePost(
  id: string,
  archived: boolean
): Promise<PostType> {
  await sleep();
  const res = await fetch(`/api/posts/${id}/archive`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ archived }),
  });

  if (!res.ok) {
    const { message } = (await res.json()) as ArchiveFailedResponse;
    throw new Error(message);
  }

  const { data } = (await res.json()) as ArchiveSuccessResponse;
  return data.post;
}
