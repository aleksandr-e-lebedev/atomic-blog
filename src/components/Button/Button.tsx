import "./Button.styles.css";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button(props: ButtonProps) {
  const { children, className = "", ...restProps } = props;

  return (
    <button
      className={className ? `button ${className}` : "button"}
      {...restProps}
    >
      {children}
    </button>
  );
}
