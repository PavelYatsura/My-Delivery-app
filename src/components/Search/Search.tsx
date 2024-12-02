import { forwardRef } from "react";
import { SearchProps } from "./Search.props";
import "./Search.scss";

const Search = forwardRef<HTMLInputElement, SearchProps>(function Input(
  { ...props },
  ref
) {
  return (
    <>
      <div className="imput-wpapper">
        <input className="search" ref={ref} {...props}></input>
        <img className="icon" src="/serch.svg" alt="serch" />
      </div>
    </>
  );
});
export default Search;
