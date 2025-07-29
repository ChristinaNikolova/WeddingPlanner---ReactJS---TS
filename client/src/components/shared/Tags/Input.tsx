interface InputProps {
  name: string;
  type: string;
  label: string;
  value: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
  checked: boolean;
}

//todo check this checked={checked || false} => checked={checked ? checked : ""}
function Input({
  name,
  type,
  label,
  value,
  onChangeHandler,
  onBlurHandler,
  checked,
}: InputProps) {
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
}

export default Input;
