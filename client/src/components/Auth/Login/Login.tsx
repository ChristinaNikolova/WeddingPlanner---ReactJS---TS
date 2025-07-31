import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../shared/Tags/Input/Input";
import ClientError from "../../shared/Errors/ClientError/ClientError";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import * as helpers from "../../../utils/helpers/form";
import * as validator from "../../../utils/validators/auth";
import * as authService from "../../../services/auth";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./Login.module.css";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";

// todo interface
interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  //todo update names of the interfaces Props/Values
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {
    checkDisabled();
  }, [values, emailError, passwordError]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError(validator.validEmail(values.email));
    setPasswordError(validator.validPassword(values.password));

    if (emailError || passwordError) {
      return;
    }

    authService
      .login(values.email, values.password)
      .then((data) => {
        if (!data.accessToken) {
          setServerError(data.message);
          return;
        }

        userLogin(data);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = () => {
    setEmailError(validator.validEmail(values.email));
  };

  const validatePassword = () => {
    setPasswordError(validator.validPassword(values.password));
  };

  const checkDisabled = () => {
    setIsDisabled(
      helpers.isButtonDisabled(values, [emailError, passwordError])
    );
  };

  return (
    <section id={styles["login"]} className="section-background">
      {serverError && <ServerError errors={serverError} />}
      <div className="section-title-wrapper">
        <h2 className="section-title">Login</h2>
        <p className={styles["login-content"]}>
          Please complete the login. You don't have an account? Go to{" "}
          <Link className="navigation-link" to="/register">
            Register
          </Link>
        </p>
      </div>
      <div className={styles["login-content-wrapper"]}>
        <form onSubmit={submitHandler} className="auth-form">
          <div className="form-wrapper">
            <Input
              name="email"
              type="email"
              label="Email"
              value={values.email}
              onChangeHandler={changeHandler}
              onBlurHandler={validateEmail}
            />
            {emailError && <ClientError message={emailError} />}
          </div>
          <div className="form-wrapper">
            <Input
              name="password"
              type="password"
              label="Password"
              value={values.password}
              onChangeHandler={changeHandler}
              onBlurHandler={validatePassword}
            />
            {passwordError && <ClientError message={passwordError} />}
          </div>
          <button className="btn" disabled={isDisabled}>
            Login
          </button>
        </form>
        <img
          className={`${styles["login-img"]} img-shadow`}
          src="./img/flowers-3992893_1920.jpg"
          alt="wedding_accessories"
        />
      </div>
    </section>
  );
};

export default Login;
