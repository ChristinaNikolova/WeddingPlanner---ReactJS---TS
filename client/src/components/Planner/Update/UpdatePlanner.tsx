import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormPlanner from "../Form/FormPlanner";
import type { PlannerProps } from "../../../interfaces/props/planners/PlannerProps";
import type { ErrorProps } from "../../../interfaces/props/shared/Errors/ErrorProps";
import type { PlannerModel } from "../../../interfaces/models/PlannerModel";
import * as plannersService from "../../../services/planners";
import { formNames } from "../../../utils/constants/global";

const UpdatePlanner = () => {
  const formName = formNames.UPDATE;
  const navigate = useNavigate();
  const { id } = useParams();

  const [planner, setPlanner] = useState<PlannerProps | undefined>(undefined);
  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {
    plannersService
      .getById(id!)
      .then((data) => setPlanner(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {}, [serverError]);

  const submitHandler = (plannerInput: PlannerModel): void => {
    plannersService
      .update(id!, plannerInput, planner!.brideId, planner!.groomId)
      .then((data) => {
        if (data.message) {
          setServerError(data.message);
          return;
        }
        onCancelFormHandler();
      })
      .catch((err) => console.error(err));
  };

  const onCancelFormHandler = (): void => {
    navigate(`/plan/${id}`);
  };

  if (
    !planner ||
    !planner.description ||
    !planner.date ||
    !planner.budget ||
    !planner.location ||
    !planner.bride ||
    !planner.groom
  ) {
    return null;
  }

  return (
    <FormPlanner
      formName={formName}
      description={planner.description}
      date={planner.date}
      budget={planner.budget}
      location={planner.location}
      bride={planner.bride}
      groom={planner.groom}
      serverError={serverError}
      onSubmitHandler={submitHandler}
      onCancelFormHandler={onCancelFormHandler}
    />
  );
};

export default UpdatePlanner;
