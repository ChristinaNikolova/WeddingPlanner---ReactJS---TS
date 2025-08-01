import { displayStyles, tagNames } from "../../../utils/constants/global";

import styles from "./SingleCost.module.css";

// todo const ....
// todo interfaces

interface SingleCostProps {
  index: number;
  costId: string;
  id: string;
  title: string;
  price: number;
  onEditHandler: (id: string, index: number) => void;
  onDeleteHandler: (id: string) => void;
}
const SingleCost = ({
  index,
  costId,
  id,
  title,
  price,
  onEditHandler,
  onDeleteHandler,
}: SingleCostProps) => {
  const onMouseEnterHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    if (target.nodeName !== tagNames.P) {
      return;
    }

    const firstChild = target.children[0] as HTMLElement;
    firstChild.style.display = displayStyles.INLINE_BLOCK;
  };

  const onMouseLeaveHandler = (): void => {
    Array.from(
      document.getElementsByClassName(
        "budget-main-current-category-current-cost-icons"
      )
    ).forEach((el) => {
      (el as HTMLElement).style.display = displayStyles.NONE;
    });
  };

  return (
    <div
      className={styles["budget-main-current-category-current-cost-wrapper"]}
    >
      <p
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        className={styles["budget-main-current-category-current-cost-title"]}
      >
        {title}
        <span
          className="budget-main-current-category-current-cost-icons"
          style={{ display: displayStyles.NONE }}
        >
          {!costId && (
            <i
              onClick={() => onEditHandler(id, index)}
              className="fa-solid fa-pen"
            ></i>
          )}
          <i
            onClick={() => onDeleteHandler(id)}
            className="fa-solid fa-trash"
          ></i>
        </span>
      </p>
      <p className={styles["budget-main-current-category-current-cost-price"]}>
        <span
          className={
            styles["budget-main-current-category-current-cost-price-unit"]
          }
        >
          $
        </span>
        {price}
      </p>
    </div>
  );
};

export default SingleCost;
