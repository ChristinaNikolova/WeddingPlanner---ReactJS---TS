import type { ErrorProps } from "../../../../interfaces/ErrorProps";
import styles from "./ClientError.module.css";

const ClientError = ({ message }: ErrorProps) => {
  return <p className={styles["client-error"]}>{message}</p>;
};

export default ClientError;
