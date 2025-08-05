import { useState, useEffect, useRef } from "react";
import ClientError from "../../shared/Errors/ClientError/ClientError";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import Input from "../../shared/Tags/Input/Input";
import Select from "../../shared/Tags/Select/Select";
import type { FormGuestProps } from "../../../interfaces/props/guests/FormGuestProps";
import type { GuestModel } from "../../../interfaces/models/GuestModel";
import * as global from "../../../utils/constants/global";
import * as helpers from "../../../utils/helpers/form";
import * as validator from "../../../utils/validators/guest";
import styles from "./FormGuest.module.css";

const FormGuest = ({
  firstName,
  lastName,
  gender,
  age,
  side,
  role,
  table,
  mainDish,
  confirmed,
  serverError,
  children,
  onSubmitHandler,
  checkIsDisabled,
}: FormGuestProps) => {
  const [values, setValues] = useState<GuestModel>({
    firstName,
    lastName,
    gender,
    age,
    side,
    role,
    table,
    mainDish,
    confirmed: confirmed ? "yes" : "no",
  });
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!formRef.current) return;
    formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    checkDisabled();
  }, [values, firstNameError, lastNameError]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateFirstName = (): void => {
    setFirstNameError(validator.validName(values.firstName));
  };

  const validateLastName = (): void => {
    setLastNameError(validator.validName(values.lastName));
  };

  const checkDisabled = (): void => {
    const valuesToCheck = {
      firstName: values.firstName,
      lastName: values.lastName,
    };

    const isDisabled = helpers.isButtonDisabled(valuesToCheck, [
      firstNameError,
      lastNameError,
    ]);
    checkIsDisabled!(isDisabled);
  };

  const onSubmitHelperHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setFirstNameError(validator.validName(values.firstName));
    setLastNameError(validator.validName(values.lastName));

    if (firstNameError || lastNameError) {
      return;
    }

    const guest = {
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      age: values.age,
      side: values.side,
      role: values.role,
      table: values.table,
      mainDish: values.mainDish,
      confirmed: values.confirmed,
    };

    onSubmitHandler(guest);
  };

  return (
    <div ref={formRef} className="form-wrapper-center">
      <form
        onSubmit={onSubmitHelperHandler}
        className={[styles["guest-form"], "form-error-message-width"].join(" ")}
      >
        {serverError && <ServerError errors={serverError} />}
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
          <label className="label">Gender:</label>
          <div className="radio">
            <div className="form-wrapper-input-radio">
              <Input
                name="gender"
                type="radio"
                label="Male"
                value="male"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.gender === "male"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="gender"
                type="radio"
                label="Female"
                value="female"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.gender === "female"}
              />
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <label className="label">Age:</label>
          <div className="radio">
            <div className="form-wrapper-input-radio">
              <Input
                name="age"
                type="radio"
                label="Adult"
                value="adult"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.age === "adult"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="age"
                type="radio"
                label="Child"
                value="child"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.age === "child"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="age"
                type="radio"
                label="Baby"
                value="baby"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.age === "baby"}
              />
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <label className="label">Side:</label>
          <div className="radio">
            <div className="form-wrapper-input-radio">
              <Input
                name="side"
                type="radio"
                label="Bride"
                value="bride"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.side === "bride"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="side"
                type="radio"
                label="Groom"
                value="groom"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.side === "groom"}
              />
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <Select
            name="role"
            label="Role"
            value={values.role as string}
            onChangeHandler={changeHandler}
            onBlurHandler={undefined}
            categories={global.roles.map((r) => r.toString())}
          />
        </div>
        <div className="form-wrapper">
          <Input
            name="table"
            type="text"
            label="Table"
            value={values.table}
            onChangeHandler={changeHandler}
            onBlurHandler={undefined}
          />
        </div>
        <div className="form-wrapper">
          <label className="label">Main dish:</label>
          <div className="radio">
            <div className="form-wrapper-input-radio">
              <Input
                name="mainDish"
                type="radio"
                label="No info"
                value="no info"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.mainDish === "no info"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="mainDish"
                type="radio"
                label="Meat"
                value="meat"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.mainDish === "meat"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="mainDish"
                type="radio"
                label="Fish"
                value="fish"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.mainDish === "fish"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="mainDish"
                type="radio"
                label="Veggies"
                value="veggies"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.mainDish === "veggies"}
              />
            </div>
          </div>
        </div>
        <div className="form-wrapper">
          <label className="label">Confirmed:</label>
          <div className="radio">
            <div className="form-wrapper-input-radio">
              <Input
                name="confirmed"
                type="radio"
                label="Yes"
                value="yes"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.confirmed === "yes"}
              />
            </div>
            <div className="form-wrapper-input-radio">
              <Input
                name="confirmed"
                type="radio"
                label="No"
                value="no"
                onChangeHandler={changeHandler}
                onBlurHandler={undefined}
                checked={values.confirmed === "no"}
              />
            </div>
          </div>
        </div>
        {children}
      </form>
    </div>
  );
};

export default FormGuest;
