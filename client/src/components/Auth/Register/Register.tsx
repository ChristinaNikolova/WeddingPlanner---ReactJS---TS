import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../shared/Tags/Input/Input";
import ClientError from "../../shared/Errors/ClientError/ClientError";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { RegisterModel } from "../../../interfaces/models/RegisterModel";
import { useAuth } from "../../../hooks/useAuth";
import * as authService from "../../../services/auth";
import * as validator from "../../../utils/validators/auth";
import * as helpers from "../../../utils/helpers/form";
import styles from "./Register.module.css";

const Register = () => {
  const { userLogin } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState<RegisterModel>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repass: "",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [repassError, setRepassError] = useState<string>("");
  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {
    checkDisabled();
  }, [
    values,
    emailError,
    firstNameError,
    lastNameError,
    passwordError,
    repassError,
    serverError,
  ]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setEmailError(validator.validEmail(values.email));
    setFirstNameError(validator.validName(values.firstName));
    setLastNameError(validator.validName(values.lastName));
    setPasswordError(validator.validPassword(values.password));
    setRepassError(
      validator.validPasswordMatch(values.password, values.repass as string)
    );

    if (
      emailError ||
      firstNameError ||
      lastNameError ||
      passwordError ||
      repassError
    ) {
      return;
    }

    const registerData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };

    authService
      .register(registerData)
      .then((data) => {
        if (!data.accessToken) {
          setServerError(data.message!);
          return;
        }

        userLogin(data);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateEmail = (): void => {
    setEmailError(validator.validEmail(values.email));
  };

  const validateFirstName = (): void => {
    setFirstNameError(validator.validName(values.firstName));
  };

  const validateLastName = (): void => {
    setLastNameError(validator.validName(values.lastName));
  };

  const validatePassword = (): void => {
    setPasswordError(validator.validPassword(values.password));
  };

  const validateRepass = (): void => {
    setRepassError(
      validator.validPasswordMatch(values.password, values.repass as string)
    );
  };

  const checkDisabled = (): void => {
    setIsDisabled(
      helpers.isButtonDisabled(values, [
        emailError,
        firstNameError,
        lastNameError,
        passwordError,
        repassError,
      ])
    );
  };

  return (
    <section id={styles["register"]} className="section-background">
      {serverError && <ServerError errors={serverError} />}
      <div className="section-title-wrapper">
        <h2 className="section-title">Register</h2>
        <p className={styles["register-content"]}>
          Please complete the register form to start planning you wedding day.
          You already have an account? Go to{" "}
          <Link className="navigation-link" to="/login">
            Login
          </Link>
        </p>
      </div>
      <div className={styles["register-content-wrapper"]}>
        <img
          className={`${styles["register-img"]} img-shadow`}
          src="./img/wedding-634526_1280.jpg"
          alt="bride_accessories"
          loading="lazy"
        />
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
              name="firstName"
              type="text"
              label="First Name"
              value={values.firstName}
              onChangeHandler={changeHandler}
              onBlurHandler={validateFirstName}
            />
            {firstNameError && <ClientError message={firstNameError} />}
          </div>
          <div className="form-wrapper">
            <Input
              name="lastName"
              type="text"
              label="Last Name"
              value={values.lastName}
              onChangeHandler={changeHandler}
              onBlurHandler={validateLastName}
            />
            {lastNameError && <ClientError message={lastNameError} />}
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
          <div className="form-wrapper">
            <Input
              name="repass"
              type="password"
              label="Repeat Password"
              value={values.repass}
              onChangeHandler={changeHandler}
              onBlurHandler={validateRepass}
            />
            {repassError && <ClientError message={repassError} />}
          </div>
          <button className="btn" disabled={isDisabled}>
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
