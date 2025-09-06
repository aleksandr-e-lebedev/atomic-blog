import { useEffect } from "react";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import Message from "@/components/Message";

import type { PostType } from "@/types";
import { useArchive } from "@/contexts/ArchiveContext";
import { usePosts } from "@/contexts/PostsContext";

import "./Archive.styles.css";

interface ArchivePostProps {
  post: PostType;
}

function ArchivePost({ post }: ArchivePostProps) {
  // Global Remote State
  const { archivePostState, getArchiveState } = useArchive();
  const { archivePost } = archivePostState;
  const { getArchive } = getArchiveState;

  const { getPostsState } = usePosts();
  const { getPosts } = getPostsState;

  function handleButtonClick() {
    async function addAndGetPosts() {
      await archivePost(post.id, false);
      await getPosts();
      await getArchive();
    }

    void addAndGetPosts();
  }

  return (
    <li className="archive__post">
      <p className="archive__post-text">
        <strong>{post.title}:</strong> {post.body}
      </p>
      <Button
        type="button"
        className="archive__add-post-button"
        onClick={handleButtonClick}
      >
        Add as new post
      </Button>
    </li>
  );
}

function ArchivePosts() {
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
            <ArchivePost key={post.id} post={post} />
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
}

export default function Archive(props: ArchiveProps) {
  const { className = "" } = props;

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
      {showArchive && <ArchivePosts />}
    </aside>
  );
}
