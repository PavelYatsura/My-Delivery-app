import "./CartItem.scss";
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";
import { cartActon } from "../../store/cart.slice";
import { CartItemProps } from "./CartItem.props";

export default function CartItem(props: CartItemProps) {
  const dispatch = useDispatch<AppDispath>();
  const increase = () => {
    dispatch(cartActon.increase(props.id));
  };
  const descrease = () => {
    dispatch(cartActon.descrease(props.id));
  };
  const remove = () => {
    dispatch(cartActon.remove(props.id));
  };

  return (
    <div className="cart-item">
      <div className="cart-item__inform">
        <div
          className="cart-item__image"
          style={{ backgroundImage: `url("${props.image}")` }}
        ></div>
        <div className="cart-item__description">
          <p className="cart-item__name">{props.name}</p>
          <div className="cart-item__price">{props.price}&nbsp;₽</div>
        </div>
      </div>
      <div className="cart-item__action">
        <button className="cart-item__remove" onClick={descrease}>
          <img src="/cart-remove.svg" alt="cart-remove.svg" />
        </button>
        <span className="cart-item__count">{props.count}</span>
        <button className="cart-item__add" onClick={increase}>
          <img src="/cart-add.svg" alt="cart-add.svg" />
        </button>
        <button className="cart-item__delete" onClick={remove}>
          <img src="/cart-deleted.svg" alt="cart-deleted.svg" />
        </button>
      </div>
    </div>
  );
}
