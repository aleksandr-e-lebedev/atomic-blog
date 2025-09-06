import { useEffect } from "react";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import Message from "@/components/Message";

import type { PostType } from "@/types";
import { useArchive } from "@/contexts/ArchiveContext";

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
  onAddPost: (post: PostType) => void;
}

function ArchivePosts({ onAddPost }: ArchivePostsProps) {
  // Global Remote State
  const { getArchiveState } = useArchive();
  const { status, posts, error, getArchive } = getArchiveState;

  // Sync with External System (Getting Archive Posts from API)
  useEffect(() => {
    void getArchive();
  }, [getArchive]);

  // Derived Remote State (for Readability)
  const isLoading = status === "pending";
  const isLoaded = status === "success";
  const isEmpty = posts.length === 0;

  return (
    <>
      {isLoading && <Spinner />}
      {isLoaded && (
        <ul className="archive__posts">
          {posts.map((post) => (
            <ArchivePost key={post.id} post={post} onAddPost={onAddPost} />
          ))}
        </ul>
      )}
      {isLoaded && isEmpty && (
        <Message message="Start by adding a post to the archive" />
      )}
      {error && <ErrorMessage message={error.message} />}
    </>
  );
}

export interface ArchiveProps {
  className?: string;
  onAddPost: (post: PostType) => void;
}

export default function Archive(props: ArchiveProps) {
  const { className = "", onAddPost } = props;

  // Global UI State
  const { showArchive, toggleArchive } = useArchive();

  return (
    <aside className={className ? `archive ${className}` : "archive"}>
      <h2 className="archive__title">Post archive</h2>
      <Button
        type="button"
        className="archive__toggle-posts-button"
        onClick={toggleArchive}
      >
        {showArchive ? "Hide archive posts" : "Show archive posts"}
      </Button>
      {showArchive && <ArchivePosts onAddPost={onAddPost} />}
    </aside>
  );
}
