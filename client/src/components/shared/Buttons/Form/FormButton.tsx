import type { FormButtonProps } from "../../../../interfaces/FormButtonProps";

function FormButton({
  formName,
  isDisabled,
  onCancelFormHandler,
}: FormButtonProps) {
  return (
    <div className="form-btns-wrapper">
      <button disabled={isDisabled} className="btn btn-center">
        {formName}
      </button>
      <button
        onClick={onCancelFormHandler}
        className="btn btn-center"
        type="button"
      >
        Cancel
      </button>
    </div>
  );
}

export default FormButton;
