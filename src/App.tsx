import Header from "@/components/Header";

import type { PostType } from "./types";
import "./App.styles.css";

export default function App() {
  const searchedPosts: PostType[] = [];
  const searchQuery = "";
  const setSearchQuery = () => {
    return;
  };

  function handleClearPosts() {
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
    </div>
  );
}
