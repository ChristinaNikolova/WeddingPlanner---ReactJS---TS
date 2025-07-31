import type { ImageBottomProps } from "../../../../interfaces/props/shared/Images/ImageBottomProps";
import styles from "./Bottom.module.css";

const Bottom = ({ first, second, third }: ImageBottomProps) => {
  return (
    <div className={styles["bottom-img-wrapper"]}>
      <img
        className={`${styles["bottom-img"]} img img-shadow`}
        src={`./../../../img/${first}`}
        alt="wedding_flowers"
        loading="lazy"
      />
      <img
        className={`${styles["bottom-img"]} img img-shadow`}
        src={`./../../../img/${second}`}
        alt="wedding_table"
        loading="lazy"
      />
      <img
        className={`${styles["bottom-img"]} img img-shadow`}
        src={`./../../../img/${third}`}
        alt="wedding_invitations"
        loading="lazy"
      />
    </div>
  );
};

export default Bottom;
