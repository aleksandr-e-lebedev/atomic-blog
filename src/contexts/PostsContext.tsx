import { createContext, useContext } from "react";

import { useGetPosts } from "@/hooks";
import type { GetPostsState } from "@/hooks";

interface PostsState {
  getPostsState: GetPostsState;
}

const PostsContext = createContext<PostsState | null>(null);
PostsContext.displayName = "PostsState";

export function PostsProvider({ children }: { children: React.ReactNode }) {
  // Remote State
  const getPostsState = useGetPosts();

  const state: PostsState = {
    getPostsState,
  };

  return (
    <PostsContext.Provider value={state}>{children}</PostsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePosts() {
  const state = useContext(PostsContext);

  if (!state) {
    throw new Error("usePosts must be used within the PostsProvider");
  }

  return state;
}
