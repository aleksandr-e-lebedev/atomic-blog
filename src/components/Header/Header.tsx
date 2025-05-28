import Input from "@/components/Input";
import Button from "@/components/Button";

import type { PostType } from "@/types";
import "./Header.styles.css";

export interface HeaderProps {
  className?: string;
  posts: PostType[];
  searchQuery: string;
  onSetSearchQuery: (query: string) => void;
  onClearPosts: () => void;
}

export default function Header(props: HeaderProps) {
  const { className = "" } = props;
  const { posts, searchQuery, onSetSearchQuery, onClearPosts } = props;

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
          onClick={onClearPosts}
        >
          Clear posts
        </Button>
      </div>
    </header>
  );
}
