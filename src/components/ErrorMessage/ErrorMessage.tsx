import "./ErrorMessage.styles.css";

export interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}
