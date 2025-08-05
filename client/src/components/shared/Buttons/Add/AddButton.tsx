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

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (isEmptyString) {
      (onShowFormHandler as (noteId: string) => void)("");
    } else {
      (onShowFormHandler as (event: React.MouseEvent<HTMLElement>) => void)(
        event
      );
    }
  };

  return (
    <div className={getStyles()}>
      <i onClick={handleClick} className="fa-solid fa-plus"></i>
      Add {text}
    </div>
  );
};

export default AddButton;
