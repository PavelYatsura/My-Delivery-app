import { Outlet } from "react-router-dom";
import "./AuthLayout.scss";

export function AuthLayout() {
    return (
        <div className="authorization">
            <div className="authorization__logo">
                <img src="/authorization.svg" alt="authorization-logo"  />
            </div>
            <div className="authorization__content">
                <Outlet></Outlet>
            </div>
        </div>
    )
}