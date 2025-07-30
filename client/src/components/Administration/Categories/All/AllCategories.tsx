import { useState, useEffect } from "react";
import SingleCategory from "../Single/SingleCategory";
import ServerError from "../../../shared/Errors/ServerError/ServerError";
import type { CategoryProps } from "../../../../interfaces/CategoryProps";
import type { ErrorProps } from "../../../../interfaces/ErrorProps";
import * as categoriesService from "../../../../services/categories";
import styles from "./AllCategories.module.css";

const AllCategories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [serverError, setServerError] = useState<ErrorProps[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const onDeleteHandler = (id: string): void => {
    categoriesService
      .deleteById(id)
      .then((data) => {
        if (data?.message) {
          setServerError(data.message);
          return;
        }
        loadCategories();
      })
      .catch((err) => console.error(err));
  };

  const loadCategories = (): void => {
    categoriesService
      .all()
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  };

  // todo optional, not optional
  return (
    <section className="section-background">
      {serverError && <ServerError errors={serverError} />}
      <div className="section-title-wrapper">
        <h2 className="section-title">All Category</h2>
      </div>
      <div>
        <ul className={styles["all-categories-ul"]}>
          {categories.map((c) => (
            <SingleCategory
              key={c.id}
              id={c.id!}
              name={c.name}
              image={c.image}
              onDeleteHandler={onDeleteHandler}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AllCategories;
