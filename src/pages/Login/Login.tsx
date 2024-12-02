import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./Login.scss";
import Heading from "../../components/Heading/Heading";
import { FormEvent, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispath, RootState } from "../../store/store";
import { login, userActon} from "../../store/user.slice";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const {jwt, loginErrorMessage} = useSelector((s: RootState) => s.user);
  

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActon.clearLoginError())
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };
  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className="login">
      <Heading className="login__title">Вход</Heading>
      {loginErrorMessage && <p className="login__error">{loginErrorMessage}</p>}
      <form onSubmit={submit}>
        <label htmlFor="email" className="login__label">
          Ваш email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="login__email input"
        ></Input>
        <label htmlFor="password" className="login__label">
          Ваш пароль
        </label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          autoComplete="on"
          className="login__password input"
        ></Input>
        <Button className="login__btn btn btn_big">Вход</Button>
        <p className="login__text">Нет аккаунта?</p>
        <Link className="login__link" to={"/auth/register"}>
          Зарегестрироваться
        </Link>
      </form>
    </div>
  );
}
