import type { ImageBottomProps } from "../../../../interfaces/ImageBottomProps";
import styles from "./Bottom.module.css";

const Bottom = ({ first, second, third }: ImageBottomProps) => {
  return (
    <div className={styles["bottom-img-wrapper"]}>
      <img
        className={`${styles["bottom-img"]} img img-shadow`}
        src={`./../../../img/${first}`}
        alt="wedding_flowers"
      />
      <img
        className={`${styles["bottom-img"]} img img-shadow`}
        src={`./../../../img/${second}`}
        alt="wedding_table"
      />
      <img
        className={`${styles["bottom-img"]} img img-shadow`}
        src={`./../../../img/${third}`}
        alt="wedding_invitations"
      />
    </div>
  );
};

export default Bottom;
