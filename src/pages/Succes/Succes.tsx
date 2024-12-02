import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./Succes.scss"

export function Succes() {
    const navigate = useNavigate()
  return (
    <div>
      <img src="/success-img.png" alt="success-img" />
      <p>Ваш заказ успешно оформлен!</p>
      <Button onClick={() => navigate("/")}>Сделать норвый заказ</Button>
    </div>
  );
}
