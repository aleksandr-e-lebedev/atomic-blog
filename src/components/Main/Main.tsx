import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";

import type { PostType } from "@/types";
import "./Main.styles.css";

interface AddPostFormProps {
  className?: string;
  onAddPost: (post: PostType) => void;
}

function AddPostForm(props: AddPostFormProps) {
  const { className = "", onAddPost } = props;

  const title = "";
  const body = "";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return;
  }

  const formClassName = className
    ? `form add-post-form ${className}`
    : "form add-post-form";

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <Input
        type="text"
        className="form__input"
        placeholder="Post title"
        value={title}
        onChange={(e) => {
          return;
        }}
      />
      <Textarea
        className="form__textarea"
        placeholder="Post body"
        value={body}
        onChange={(e) => {
          return;
        }}
      />
      <Button type="submit">Add post</Button>
    </form>
  );
}

interface PostProps {
  title: string;
  body: string;
}

function Post({ title, body }: PostProps) {
  return (
    <li className="posts__post">
      <h3 className="posts__post-title">{title}</h3>
      <p className="posts__post-text">{body}</p>
    </li>
  );
}

interface PostsProps {
  className?: string;
  posts: PostType[];
}

function Posts({ className = "", posts }: PostsProps) {
  return (
    <div className={className ? `posts ${className}` : "posts"}>
      <ul className="posts__list">
        {posts.map((post) => (
          <Post key={post.id} title={post.title} body={post.body} />
        ))}
      </ul>
    </div>
  );
}

export interface MainProps {
  className?: string;
  posts: PostType[];
  onAddPost: (post: PostType) => void;
}

export default function Main(props: MainProps) {
  const { className = "", posts, onAddPost } = props;

  return (
    <main className={className ? `main ${className}` : "main"}>
      <AddPostForm className="main__form" onAddPost={onAddPost} />
      <Posts className="main__posts" posts={posts} />
    </main>
  );
}
