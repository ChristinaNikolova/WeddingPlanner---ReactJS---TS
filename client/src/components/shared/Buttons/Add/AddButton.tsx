import type { AddButtonProps } from "../../../../interfaces/props/shared/Forms/AddButtonProps";

const AddButton = ({
  classNames,
  text,
  isEmptyString,
  onShowFormHandler,
}: AddButtonProps) => {
  const getStyles = (): string => {
    return [...classNames, "form-icon-wrapper"].join(" ");
  };

  return (
    <div className={getStyles()}>
      <i
        onClick={
          isEmptyString ? () => onShowFormHandler("") : onShowFormHandler
        }
        className="fa-solid fa-plus"
      ></i>
      Add {text}
    </div>
  );
};

export default AddButton;
