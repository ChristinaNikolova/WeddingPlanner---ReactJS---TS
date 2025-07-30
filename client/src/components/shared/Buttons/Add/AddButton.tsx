import type { AddButtonProps } from "../../../../interfaces/AddButtonProps";

const AddButton = ({
  classNames,
  text,
  isEmptyString,
  onShowFormHandler,
}: AddButtonProps) => {
  const getStyles = () => {
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
