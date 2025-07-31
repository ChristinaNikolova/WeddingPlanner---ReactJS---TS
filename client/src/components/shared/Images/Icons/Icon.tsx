import type { IconProps } from "../../../../interfaces/props/shared/IconProps";

const Icon = ({ iconClass, className = "" }: IconProps) => {
  return <i className={`${iconClass} ${className}`}></i>;
};

export default Icon;
