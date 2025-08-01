import { toggleWithTargetContent } from "../../../utils/helpers/dropdown";
import styles from "./CategoryWrapper.module.css";

interface CategoryWrapperProps {
  name: string;
  image: string;
  categoryCosts: number;
}

const CategoryWrapper = ({
  name,
  image,
  categoryCosts,
}: CategoryWrapperProps) => {
  const onShowContent = (e: React.MouseEvent<HTMLElement>): void => {
    const targetIcon = e.target as HTMLElement;
    const targetElement = targetIcon.parentElement?.parentElement?.parentElement
      ?.nextSibling as HTMLElement;

    if (targetElement) {
      toggleWithTargetContent(targetElement, targetIcon);
    }
  };

  return (
    <div className={styles["budget-main-current-category-info-wrapper"]}>
      <div className={styles["budget-main-current-category-info-left"]}>
        <div className={styles["budget-main-current-category-info"]}>
          <i onClick={onShowContent} className="fa-solid fa-chevron-down"></i>
          <img
            className={`${styles["budget-main-current-category-info-image"]} img`}
            src={image}
            alt={name}
          />
          <span className={styles["budget-main-current-category-info-name"]}>
            {name}
          </span>
        </div>
      </div>
      <div className={styles["budget-main-current-category-info-right"]}>
        <span
          className={styles["budget-main-current-category-info-right-title"]}
        >
          Actual category:
        </span>
        <span
          className={styles["budget-main-current-category-info-right-unit"]}
        >
          $
        </span>
        {categoryCosts}
      </div>
    </div>
  );
};

export default CategoryWrapper;
