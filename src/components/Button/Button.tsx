import { ButtonProps } from "./Button.props";
import "./Button.scss";

export default function Button({
  children,
  ...props
}: ButtonProps) {
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  );
}
