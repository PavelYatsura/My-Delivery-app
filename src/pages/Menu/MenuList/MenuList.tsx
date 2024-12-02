import ProductCart from "../../../components/ProductCard/ProductCart";
import { MenuListprops } from "./MenuList.props";

export default function MenuList({ products }: MenuListprops) {
  return products.map((p) => (
    <ProductCart
      key={p.id}
      id={p.id}
      name={p.name}
      ingredients={p.ingredients.join(", ")}
      image={p.image}
      price={p.price}
      rating={p.rating}
    ></ProductCart>
  ));
}
