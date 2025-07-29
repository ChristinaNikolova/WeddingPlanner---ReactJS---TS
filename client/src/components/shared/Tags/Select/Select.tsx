import type { SelectProps } from "../../../../interfaces/SelectProps";

function Select({
  name,
  label,
  value,
  onChangeHandler,
  onBlurHandler,
  categories,
}: SelectProps) {
  return (
    <>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        className="input"
        name={name}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      >
        {categories.map((c) => {
          const isObject = typeof c === "object";
          const key = isObject ? c.id : c;
          const value = isObject ? c.id : c;
          const display = isObject ? c.name : c;

          return (
            <option key={key} value={value}>
              {display}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Select;
