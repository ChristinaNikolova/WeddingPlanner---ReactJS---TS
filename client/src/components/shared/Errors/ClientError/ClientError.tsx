import type { ErrorProps } from "../../../../interfaces/props/shared/Errors/ErrorProps";
import styles from "./ClientError.module.css";

const ClientError = ({ message }: ErrorProps) => {
  return <p className={styles["client-error"]}>{message}</p>;
};

export default ClientError;
