import { ChangeEvent, useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import { PREFIX } from "../../helpers/API";
import { Product } from "../../interfaces/product.interface";
import "./Menu.scss";
import axios, { AxiosError } from "axios";
import MenuList from "./MenuList/MenuList";

export default function Menu() {
  const [products, setproducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [filter, setFilter] = useState<string>();
  useEffect(() => {
    getMenu(filter);
  }, [filter]);
  const getMenu = async (name?: string) => {
    // Реализация через Axios
    try {
      setLoading(true);
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: {
          name,
        },
      });
      setproducts(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        setError(e.message);
      }
      setLoading(false);
      return;
    }
    // Рeализация через Fetch
    // try {
    //   const res = await fetch(`${PREFIX}/products`);
    //   if (!res.ok) {
    //     return;
    //   }
    //   const data = (await res.json()) as Product[];
    //   setproducts(data);
    // } catch (e) {
    //   console.error(e);
    //   return;
    // }
  };

  const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <div className="head">
        <Heading>Меню</Heading>
        <Search
          placeholder="Введите блюдо или состав"
          onChange={updateFilter}
        ></Search>
      </div>
      <div className="menu">
        {error && <p>{error}</p>}
        {!loading && products.length > 0 && <MenuList products={products} />}
        {loading && <p>Загрузка...</p>}
        {!loading && products.length === 0 && <h2>Такого товара нет</h2>}
      </div>
    </>
  );
}
