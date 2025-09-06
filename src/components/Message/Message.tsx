import "./Message.styles.css";

export interface MessageProps {
  message: string;
}

export default function Message({ message }: MessageProps) {
  return (
    <p className="message">
      <span role="img">👋</span> {message}
    </p>
  );
}
