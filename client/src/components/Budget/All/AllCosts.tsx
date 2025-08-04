import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import AddButton from "../../shared/Buttons/Add/AddButton";
import CategoryWrapper from "../CategoryWrapper/CategoryWrapper";
import CreateCost from "../Create/CreateCost";
import InfoWrapper from "../InfoWrapper/InfoWrapper";
import SingleCost from "../Single/SingleCost";
import UpdateCost from "../Update/UpdateCost";
import type { CostProps } from "../../../interfaces/props/CostProps";
import type { CategoryProps } from "../../../interfaces/props/categories/CategoryProps";
import * as categoriesService from "../../../services/categories";
import * as costsService from "../../../services/costs";
import { addButtonTexts, displayStyles } from "../../../utils/constants/global";
import { category } from "../../../utils/constants/model";
import { cancelForm } from "../../../utils/helpers/form";
import styles from "./AllCosts.module.css";

const AllCosts = () => {
  const { id: plannerId } = useParams();
  const costsAllRef = useRef<HTMLSelectElement | null>(null);
  const location = useLocation();
  const { state } = location;

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [costs, setCosts] = useState<CostProps[]>([]);
  const [costId, setCostId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<string>("");

  useEffect(() => {
    categoriesService
      .all()
      .then((res) => {
        res = res.filter(
          (el) => el.id !== category.DEFAULT_CATEGORY_SELECTED_ID
        );
        setCategories(res);
        if (costsAllRef.current) {
          costsAllRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    loadCosts();
  }, []);

  const onCancelFormHandler = (e: React.SyntheticEvent<HTMLElement>): void => {
    cancelForm(e.target as HTMLElement);
    setCostId("");
    setCurrentIndex("");
  };

  const onShowFormHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.target as HTMLElement;
    const targetFormElement = target.parentElement?.parentElement
      ?.children[0] as HTMLElement;

    if (targetFormElement) {
      targetFormElement.style.display = displayStyles.FLEX;
    }
  };

  const loadCosts = (): void => {
    costsService
      .all(plannerId!)
      .then((res) => setCosts(res))
      .catch((err) => console.error(err));
  };

  const onDeleteHandler = (id: string): void => {
    costsService
      .deleteById(id)
      .then(() => loadCosts())
      .catch((err) => console.error(err));
  };

  const onEditHandler = (id: string, index: string): void => {
    setCostId(id);
    setCurrentIndex(index);
  };

  const calculateActualCosts = (): string => {
    return costs.reduce((acc, curr) => Number(curr.price) + acc, 0).toFixed(2);
  };

  const calculateCategeryActualCosts = (categoryId: string): string => {
    return costs
      .filter((c) => c.category === categoryId)
      .reduce((acc, curr) => Number(curr.price) + acc, 0)
      .toFixed(2);
  };

  const finish = (e: React.FormEvent<HTMLFormElement>): void => {
    onCancelFormHandler(e);
    loadCosts();
  };

  return (
    <section
      ref={costsAllRef}
      id={styles["budget"]}
      className="section-planner section-background"
    >
      <div className="section-title-wrapper">
        <h2 className="section-title">Budget</h2>
      </div>
      <InfoWrapper budget={state.budget} actualCosts={calculateActualCosts()} />
      <div className={styles["budget-main-content-wrapper"]}>
        {categories.map((c, index) => (
          <div
            key={c.id}
            className={styles["budget-main-current-category-wrapper"]}
          >
            <CategoryWrapper
              name={c.name}
              image={c.image}
              categoryCosts={calculateCategeryActualCosts(c.id)}
            />
            <div
              className={styles["budget-main-current-category-costs-wrapper"]}
              style={{ display: displayStyles.BLOCK }}
            >
              {costId && index.toString() === currentIndex && (
                <UpdateCost
                  plannerId={plannerId!}
                  costId={costId}
                  onCancelFormHandler={onCancelFormHandler}
                  finish={finish}
                />
              )}
              {!costId && (
                <CreateCost
                  plannerId={plannerId!}
                  category={c.id}
                  onCancelFormHandler={onCancelFormHandler}
                  finish={finish}
                />
              )}
              <div
                className={
                  styles["budget-main-current-category-costs-titles-wrapper"]
                }
              >
                <p
                  className={
                    styles["budget-main-current-category-costs-titles-title"]
                  }
                >
                  Title
                </p>
                <p
                  className={
                    styles["budget-main-current-category-costs-titles-cost"]
                  }
                >
                  Actual cost
                </p>
              </div>
              {costs.filter((cost) => cost.category === c.id).length > 0 ? (
                costs
                  .filter((cost) => cost.category === c.id)
                  .map((cost) => (
                    <SingleCost
                      key={cost.id}
                      index={index.toString()}
                      costId={costId}
                      id={cost.id}
                      title={cost.title}
                      price={cost.price}
                      onEditHandler={onEditHandler}
                      onDeleteHandler={onDeleteHandler}
                    />
                  ))
              ) : (
                <p
                  className={styles["budget-main-current-category-costs-empty"]}
                >
                  No costs yet
                </p>
              )}
              {!costId && (
                <AddButton
                  classNames={[]}
                  text={addButtonTexts.COST}
                  isEmptyString={false}
                  onShowFormHandler={onShowFormHandler}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <InfoWrapper budget={state.budget} actualCosts={calculateActualCosts()} />
    </section>
  );
};

export default AllCosts;
