import { Link } from "react-router-dom";
import { ProductCartProps } from "./ProductCart.props";
import "./ProductCart.scss";
import { MouseEvent } from 'react';
import { useDispatch } from "react-redux";
import { AppDispath } from "../../store/store";
import { cartActon } from "../../store/cart.slice";

export default function ProductCart(props: ProductCartProps) {
  const dispatch = useDispatch<AppDispath>()
  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActon.increase(props.id))
  }
  return (
    <Link key={props.id} to={`/product/${props.id}`} className="card__link">
      <div className="card">
        <div
          className="card__head"
          style={{ backgroundImage: `url("${props.image}")` }}
        >
          <div className="card__price">
            {props.price}
            <span className="card__currency">&nbsp;₽</span>
          </div>
          <button className="card__buy" onClick={add}>
            <img src="./cart__buy.svg" alt="cart__buy" />
          </button>
          <div className="card__rating">
            {props.rating}&nbsp;
            <img src="./rating-icon.svg" alt="rating-icon" />
          </div>
        </div>
        <div className="card__footer">
          <h3 className="card__title">{props.name}</h3>
          <p className="cart__disription">{props.ingredients}</p>
        </div>
      </div>
    </Link>
  );
}
