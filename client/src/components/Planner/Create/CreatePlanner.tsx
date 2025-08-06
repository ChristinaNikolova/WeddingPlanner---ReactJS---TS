import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormPlanner from "../Form/FormPlanner";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { PlannerModel } from "../../../interfaces/models/PlannerModel";
import * as plannersService from "../../../services/planners";
import { formNames } from "../../../utils/constants/global";

const CreatePlanner = () => {
  const formName = formNames.CREATE;
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {}, [serverError]);

  const submitHandler = (inputPlanner: PlannerModel): void => {
    plannersService
      .create(inputPlanner)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        navigate(`/plan/${data.id}`);
      })
      .catch((err) => console.error(err));
  };

  const onCancelFormHandler = (): void => {
    navigate("/plan");
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
