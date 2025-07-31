import { useEffect, useState } from "react";
import * as categoriesService from "../../../services/categories";
import { classNames } from "../../../utils/constants/global";
import { category } from "../../../utils/constants/model";
import { toggle } from "../../../utils/helpers/dropdown";
import styles from "./ArticlesAllCategoryDropDown.module.css";
import type { ArticlesAllCategoryDropDownProps } from "../../../interfaces/props/articles/ArticlesAllCategoryDropDown";
import type { CategoryProps } from "../../../interfaces/props/categories/CategoryProps";

const ArticlesAllCategoryDropDown = ({
  selectedCategoryName,
  onCategoryHandler,
  onRemoveCategotyHandler,
}: ArticlesAllCategoryDropDownProps) => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    categoriesService
      .all()
      .then((res) => {
        res = res.filter(
          (el) => el.id !== category.DEFAULT_CATEGORY_SELECTED_ID
        );
        setCategories(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const onToggleHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    const dropdownElement = target.nextElementSibling as HTMLElement;

    if (dropdownElement) {
      if (dropdownElement.classList.contains(classNames.SHOW)) {
        toggle(dropdownElement, classNames.SHOW, classNames.HIDE);
      } else {
        toggle(dropdownElement, classNames.HIDE, classNames.SHOW);
      }
    }
  };

  const onClickCategoryHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    toggle(target.parentElement!, classNames.SHOW, classNames.HIDE);
    onCategoryHandler(e);
  };

  return (
    <div className={styles["article-all-category-drop-down-wrapper"]}>
      <span className={styles["articles-all-category-drop-down"]}>
        Category:
      </span>
      <button
        onClick={onToggleHandler}
        className={styles["articles-all-category-drop-down-btn"]}
      >
        {selectedCategoryName}
        {selectedCategoryName !== "all" && (
          <i
            onClick={(e) => onRemoveCategotyHandler(e)}
            className="fa-solid fa-xmark"
          ></i>
        )}
      </button>
      <ul
        className={[styles["articles-all-category-drop-down-ul"], "hide"].join(
          " "
        )}
      >
        {categories.map((c) => (
          <li
            key={c.id}
            id={c.id}
            className={styles["articles-all-category-drop-down-li"]}
            onClick={(e) => onClickCategoryHandler(e)}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesAllCategoryDropDown;
