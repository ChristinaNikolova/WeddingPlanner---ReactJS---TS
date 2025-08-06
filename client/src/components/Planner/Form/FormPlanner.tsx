import React, { useState, useEffect } from "react";
import ClientError from "../../shared/Errors/ClientError/ClientError";
import ServerError from "../../shared/Errors/ServerError/ServerError";
import Input from "../../shared/Tags/Input/Input";
import TextArea from "../../shared/Tags/TextArea/TextArea";
import FormButton from "../../shared/Buttons/Form/FormButton";
import type { PlannerModel } from "../../../interfaces/models/PlannerModel";
import type { FormPlannerProps } from "../../../interfaces/props/planners/FormPlannerProps";
import * as validator from "../../../utils/validators/planner";
import * as helpers from "../../../utils/helpers/form";

const FormPlanner = ({
  formName,
  description,
  date,
  budget,
  location,
  bride,
  groom,
  serverError,
  onSubmitHandler,
  onCancelFormHandler,
}: FormPlannerProps) => {
  const [values, setValues] = useState<PlannerModel>({
    description,
    date,
    budget,
    location,
    bride,
    groom,
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");
  const [budgetError, setBudgetError] = useState<string>("");
  const [locationError, setLocationError] = useState<string>("");
  const [brideError, setBrideError] = useState<string>("");
  const [groomError, setGroomError] = useState<string>("");

  useEffect(() => {
    checkDisabled();
  }, [
    values,
    descriptionError,
    dateError,
    budgetError,
    locationError,
    brideError,
    groomError,
  ]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const validateDescription = (): void => {
    setDescriptionError(validator.validDescription(values.description));
  };

  const validateDate = (): void => {
    setDateError(validator.validDate(values.date));
  };

  const validateBudget = (): void => {
    setBudgetError(validator.validBudget(Number(values.budget)));
  };

  const validateLocation = (): void => {
    setLocationError(validator.validLocation(values.location));
  };

  const validateBride = (): void => {
    setBrideError(validator.validName(values.bride));
  };

  const validateGroom = (): void => {
    setGroomError(validator.validName(values.groom));
  };

  const checkDisabled = (): void => {
    setIsDisabled(
      helpers.isButtonDisabled(values, [
        descriptionError,
        dateError,
        budgetError,
        locationError,
        brideError,
        groomError,
      ])
    );
  };

  const onSubmitHelperHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    setDescriptionError(validator.validDescription(values.description));
    setDateError(validator.validDate(values.date));
    setBudgetError(validator.validBudget(Number(values.budget)));
    setLocationError(validator.validLocation(values.location));
    setBrideError(validator.validName(values.bride));
    setGroomError(validator.validName(values.groom));

    if (
      descriptionError ||
      dateError ||
      budgetError ||
      locationError ||
      brideError ||
      groomError
    ) {
      return;
    }

    const planner = {
      description: values.description,
      date: values.date,
      budget: values.budget,
      location: values.location,
      bride: values.bride,
      groom: values.groom,
    };

    onSubmitHandler(planner);
  };

  return (
    <section className="section-background">
      {serverError && <ServerError errors={serverError} />}
      <div className="section-title-wrapper">
        <h2 className="section-title">{formName} Planner</h2>
      </div>
      <div className="form-wrapper-center">
        <form onSubmit={onSubmitHelperHandler} className="form-width">
          <div className="form-wrapper">
            <TextArea
              name="description"
              label="Description"
              value={values.description}
              rows={8}
              onChangeHandler={changeHandler}
              onBlurHandler={validateDescription}
            />
            {descriptionError && <ClientError message={descriptionError} />}
          </div>
          <div className="form-wrapper">
            <Input
              name="date"
              type="text"
              label="Date"
              value={values.date}
              onChangeHandler={changeHandler}
              onBlurHandler={validateDate}
            />
            {dateError && <ClientError message={dateError} />}
          </div>
          <div className="form-wrapper">
            <Input
              name="budget"
              type="number"
              label="Budget"
              value={values.budget}
              onChangeHandler={changeHandler}
              onBlurHandler={validateBudget}
            />
            {budgetError && <ClientError message={budgetError} />}
          </div>
          <div className="form-wrapper">
            <Input
              name="location"
              type="text"
              label="Location"
              value={values.location}
              onChangeHandler={changeHandler}
              onBlurHandler={validateLocation}
            />
            {locationError && <ClientError message={locationError} />}
          </div>
          <div className="form-wrapper">
            <Input
              name="bride"
              type="text"
              label="Bride"
              value={values.bride}
              onChangeHandler={changeHandler}
              onBlurHandler={validateBride}
            />
            {brideError && <ClientError message={brideError} />}
          </div>
          <div className="form-wrapper">
            <Input
              name="groom"
              type="text"
              label="Groom"
              value={values.groom}
              onChangeHandler={changeHandler}
              onBlurHandler={validateGroom}
            />
            {groomError && <ClientError message={groomError} />}
          </div>
          <FormButton
            formName={formName}
            isDisabled={isDisabled}
            onCancelFormHandler={onCancelFormHandler!}
          />
        </form>
      </div>
    </section>
  );
};

export default FormPlanner;
