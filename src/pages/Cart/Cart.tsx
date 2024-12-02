import { useDispatch, useSelector } from "react-redux";
import Heading from "../../components/Heading/Heading";
import { AppDispath, RootState } from "../../store/store";
import CartItem from "../../components/CartItem/CartItem";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product.interface";
import axios from "axios";
import { PREFIX } from "../../helpers/API";
import "./Cart.scss";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { cartActon } from "../../store/cart.slice";

const DELIVERY_FEE = 169;

export function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const items = useSelector((s: RootState) => s.cart.items);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispath>()
  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);


  const getItem = async (id: number) => {
    const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
    return data;
  };
  const loadAllItems = async () => {
    const res = await Promise.all(items.map((i) => getItem(i.id)));
    setCartProducts(res);
  };
  const checkout = async () => {
     await axios.post(`${PREFIX}/order`, {
      product: items
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    dispatch(cartActon.clean())
    navigate("/success")
  }



  useEffect(() => {
    loadAllItems();
  }, [items]);

  return (
    <div className="cart">
      <Heading className="cart__title">Корзина</Heading>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (!product) {
          return;
        }
        return <CartItem key={product.id} count={i.count} {...product} />;
      })}
      <div className="cart__result">
        <p className="cart__text">Итог</p>
        <div className="cart__price">
          {total}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className="cart__line" />
      <div className="cart__delivery">
        <p className="cart__text">Доставка</p>
        <p className="cart__price">
          {DELIVERY_FEE}&nbsp;<span>₽</span>
        </p>
      </div>
      <hr className="cart__line" />
      <div className="cart__result-all">
        <p className="cart__text">Итог&nbsp;<span>({items.length})</span></p>
        <div className="cart__price">
          {total + DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <Button className="btn btn_big cart__btn" onClick={checkout}>Оформить</Button>
    </div>
  );
}
