import { useEffect } from "react";

import Header from "@/components/Header";
import Main from "@/components/Main";
import Archive from "@/components/Archive";
import Footer from "@/components/Footer/Footer";

import type { PostType } from "@/types";
import { usePosts } from "./contexts/PostsContext";

import "./App.styles.css";

export default function App() {
  // Global Remote State
  const { getPostsState } = usePosts();
  const { posts, getPosts } = getPostsState;

  const searchedPosts: PostType[] = posts;
  const searchQuery = "";
  const setSearchQuery = () => {
    return;
  };

  function handleClearPosts() {
    return;
  }

  function handleAddPost() {
    return;
  }

  // Sync with External System (Getting Current Posts from API)
  useEffect(() => {
    void getPosts();
  }, [getPosts]);

  return (
    <div className="app">
      <Header
        className="app__header"
        posts={searchedPosts}
        onClearPosts={handleClearPosts}
        searchQuery={searchQuery}
        onSetSearchQuery={setSearchQuery}
      />
      <Main className="app__main" posts={searchedPosts} />
      <Archive className="app__archive" onAddPost={handleAddPost} />
      <Footer />
    </div>
  );
}
