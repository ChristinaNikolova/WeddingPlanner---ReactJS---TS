import type { ServerErrorProps } from "../../../../interfaces/ServerErrorProps";
import styles from "./ServerError.module.css";

function ServerError({ errors }: ServerErrorProps) {
  return (
    <div
      className={[styles["server-error-wrapper"], "error-message"].join(" ")}
    >
      {errors.map((e, i) => (
        <div key={i} className={styles["server-error"]}>
          {e.message}
        </div>
      ))}
    </div>
  );
}

export default ServerError;
