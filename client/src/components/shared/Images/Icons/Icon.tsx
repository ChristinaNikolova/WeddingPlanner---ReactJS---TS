import type { IconProps } from "../../../../interfaces/IconProps";

export const Icon = ({ iconClass, className = "" }: IconProps) => {
  return <i className={`${iconClass} ${className}`}></i>;
};
