import { useState } from "react";

import Button from "@/components/Button";
import type { PostType } from "@/types";
import { createRandomPost } from "@/utils";

import "./Archive.styles.css";

interface ArchivePostProps {
  post: PostType;
  onAddPost: (post: PostType) => void;
}

function ArchivePost({ post, onAddPost }: ArchivePostProps) {
  return (
    <li className="archive__post">
      <p className="archive__post-text">
        <strong>{post.title}:</strong> {post.body}
      </p>
      <Button
        type="button"
        className="archive__add-post-button"
        onClick={() => {
          onAddPost(post);
        }}
      >
        Add as new post
      </Button>
    </li>
  );
}

interface ArchivePostsProps {
  posts: PostType[];
  onAddPost: (post: PostType) => void;
}

function ArchivePosts({ posts, onAddPost }: ArchivePostsProps) {
  return (
    <ul className="archive__posts">
      {posts.map((post) => (
        <ArchivePost key={post.id} post={post} onAddPost={onAddPost} />
      ))}
    </ul>
  );
}

function createInitialPosts(): PostType[] {
  // 💥 WARNING: This might make your computer slow! Try a smaller `length` first
  // return Array.from({ length: 10_000 }, () => createRandomPost());
  return Array.from({ length: 500 }, () => createRandomPost());
}

export interface ArchiveProps {
  className?: string;
  onAddPost: (post: PostType) => void;
}

export default function Archive(props: ArchiveProps) {
  const { className = "", onAddPost } = props;
  const posts = createInitialPosts();
  const [showArchive, setShowArchive] = useState(false);

  return (
    <aside className={className ? `archive ${className}` : "archive"}>
      <h2 className="archive__title">Post archive</h2>
      <Button
        type="button"
        className="archive__toggle-posts-button"
        onClick={() => {
          setShowArchive((s) => !s);
        }}
      >
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </Button>
      {showArchive && <ArchivePosts posts={posts} onAddPost={onAddPost} />}
    </aside>
  );
}
