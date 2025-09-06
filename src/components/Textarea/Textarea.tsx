import "./Textarea.styles.css";

export type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export default function Textarea(props: TextareaProps) {
  const { className = "", ...restProps } = props;

  return (
    <textarea
      className={className ? `textarea ${className}` : "textarea"}
      {...restProps}
    />
  );
}
