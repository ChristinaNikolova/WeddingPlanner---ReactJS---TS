import type { TextAreaProps } from "../../../../interfaces/props/shared/Tags/TextAreaProps";

const TextArea = ({
  name,
  label,
  value,
  rows,
  onChangeHandler,
  onBlurHandler,
}: TextAreaProps) => {
  return (
    <>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="input"
        id={name}
        name={name}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        rows={rows}
        value={value}
      />
    </>
  );
};

export default TextArea;
