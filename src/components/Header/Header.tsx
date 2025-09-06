import Input from "@/components/Input";
import Button from "@/components/Button";

import type { PostType } from "@/types";
import { usePosts } from "@/contexts/PostsContext";

import "./Header.styles.css";

export interface HeaderProps {
  className?: string;
  posts: PostType[];
  searchQuery: string;
  onSetSearchQuery: (query: string) => void;
}

export default function Header(props: HeaderProps) {
  const { className = "", posts, searchQuery, onSetSearchQuery } = props;

  // Global Remote State
  const { getPostsState, deletePostsState } = usePosts();
  const { getPosts } = getPostsState;
  const { deletePosts } = deletePostsState;

  function handleClearPostsButtonClick() {
    async function clearPosts() {
      await deletePosts();
      await getPosts();
    }

    void clearPosts();
  }

  return (
    <header className={className ? `header ${className}` : "header"}>
      <h1 className="header__title">
        <span className="header__icon">⚛️</span>The Atomic Blog
      </h1>
      <div className="header__container">
        <p className="header__results">🚀 {posts.length} atomic posts found</p>
        <Input
          type="text"
          className="search-posts-input header__input"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => {
            onSetSearchQuery(e.target.value);
          }}
        />
        <Button
          type="button"
          className="header__clear-posts-button"
          onClick={handleClearPostsButtonClick}
        >
          Clear posts
        </Button>
      </div>
    </header>
  );
}
