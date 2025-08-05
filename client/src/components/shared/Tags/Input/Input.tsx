import type { InputProps } from "../../../../interfaces/props/shared/Tags/InputProps";

const Input = ({
  name,
  type,
  label,
  value,
  onChangeHandler,
  onBlurHandler,
  checked,
}: InputProps) => {
  return (
    <>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input"
        id={name}
        name={name}
        type={type}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        value={value}
        checked={checked || false}
      />
    </>
  );
};

export default Input;
