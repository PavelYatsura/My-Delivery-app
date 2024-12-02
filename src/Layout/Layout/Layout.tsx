import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./layout.scss";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispath, RootState } from "../../store/store";
import { getPorfile, userActon } from "../../store/user.slice";
import { useEffect } from "react";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  useEffect(() => {
    dispatch(getPorfile());
  }, [dispatch]);

  const logout = () => {
    dispatch(userActon.logout());
    navigate("/auth/login");
  };
  return (
    <main className="main">
      <div className="sidebar">
        <div className="user">
          <img className="user_img" src="/Mask Group.png" alt="Mask Group" />
          <p className="name">{profile?.name}</p>
          <p className="email">{profile?.email}</p>
        </div>
        <div className="nav">
          <NavLink to="/" className="link">
            <img src="/menu-icon.svg" alt="menu-icon"></img>
            Меню
          </NavLink>
          <NavLink to="/cart" className="link">
            <img src="/cart-icon.svg" alt="cart-icon"></img>Корзина&nbsp;
            <span className="link__count">{items.reduce((acc, item) => (acc += item.count), 0)}</span>
          </NavLink>
        </div>
        <Button className="btn btn-exit" onClick={logout}>
          <img src="/exit-btn.svg" alt="exit-btn" />
          Выйти
        </Button>
      </div>
      <div className="content">
        <Outlet></Outlet>
      </div>
    </main>
  );
}
