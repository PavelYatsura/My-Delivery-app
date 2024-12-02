import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import "./Register.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispath, RootState } from "../../store/store";
import { FormEvent, useEffect } from "react";
import { register, userActon } from "../../store/user.slice";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActon.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    );
  };

  return (
    <>
      <div className="register">
        <Heading className="register__title">Регистрация</Heading>
        {registerErrorMessage && (
          <p className="login__error">{registerErrorMessage}</p>
        )}
        <form onSubmit={submit}>
          <label htmlFor="email" className="register__label">
            Ваш email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="register__email input"
          ></Input>
          <label htmlFor="password" className="register__label">
            Ваш пароль
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Пароль"
            autoComplete="on"
            className="register__password input"
          ></Input>
          <label htmlFor="name" className="register__label">
            Ваш имя
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Имя"
            className="register__name input"
          ></Input>
          <Button className="register__btn btn">Зарегестрироваться</Button>
          <p className="register__text">Есть аккаунт?</p>
          <Link className="register__link" to={"/auth/login"}>
            Войти
          </Link>
        </form>
      </div>
    </>
  );
}
