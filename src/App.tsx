import Header from "@/components/Header";
import Main from "@/components/Main";
import Archive from "@/components/Archive";

import type { PostType } from "@/types";
import { createRandomPost } from "@/utils";

import "./App.styles.css";

function createInitialPosts(): PostType[] {
  return Array.from({ length: 30 }, () => createRandomPost());
}

export default function App() {
  const posts = createInitialPosts();
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

  return (
    <div className="app">
      <Header
        className="app__header"
        posts={searchedPosts}
        onClearPosts={handleClearPosts}
        searchQuery={searchQuery}
        onSetSearchQuery={setSearchQuery}
      />
      <Main
        className="app__main"
        posts={searchedPosts}
        onAddPost={handleAddPost}
      />
      <Archive className="app__archive" onAddPost={handleAddPost} />
    </div>
  );
}
