import "./Input.styles.css";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input(props: InputProps) {
  const { className = "", ...restProps } = props;

  return (
    <input
      className={className ? `input ${className}` : "input"}
      {...restProps}
    />
  );
}
