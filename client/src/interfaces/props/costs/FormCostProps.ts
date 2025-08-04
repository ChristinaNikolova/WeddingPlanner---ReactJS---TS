import type { ReactNode } from "react";
import type { CostModel } from "../../models/CostModel";
import type { BaseForm } from "./BaseForm";

export interface FormCostProps extends BaseForm, CostModel {
  children: ReactNode;
  formCanceled?: boolean;
  onSubmitHandler: (
    e: React.FormEvent<HTMLFormElement>,
    cost: CostModel
  ) => void;
  checkIsDisabled: (isDisabled: boolean) => void;
}
