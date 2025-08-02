import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormPlanner from "../Form/FormPlanner";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import * as plannersService from "../../../services/planners";
import { formNames } from "../../../utils/constants/global";

const CreatePlanner = () => {
  const formName = formNames.CREATE;
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {}, [serverError]);
  // todo add type
  const submitHandler = (
    description: string,
    date: string,
    budget: string,
    location: string,
    bride: string,
    groom: string
  ) => {
    plannersService
      .create(description, date, budget, location, bride, groom)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }

        // todo test
        navigate(`/plan/${data.id}`);
      })
      .catch((err) => console.error(err));
  };

  // todo redirect to data for the planner!!!
  const onCancelFormHandler = () => {
    navigate(`/plan`);
  };

  return (
    <FormPlanner
      formName={formName}
      description={""}
      date={""}
      budget={""}
      location={""}
      bride={""}
      groom={""}
      serverError={serverError}
      onSubmitHandler={submitHandler}
      onCancelFormHandler={onCancelFormHandler}
    />
  );
};

export default CreatePlanner;
