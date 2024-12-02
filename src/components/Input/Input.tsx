import { forwardRef } from "react";
import { InputProps } from "./Input.props";
import "./Input.scss"


const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ ...props}, ref) {
    return (
        <input className="input" ref={ref} {...props}></input>
    )
})
export default Input