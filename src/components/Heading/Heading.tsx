
import { HeadingProps } from "./Heading.props";
import "./Heading.scss";

export default function Heading({ children, ...props }: HeadingProps) {
  return (
    
      <h1 {...props}> {children}</h1>
      
    
  );
}
