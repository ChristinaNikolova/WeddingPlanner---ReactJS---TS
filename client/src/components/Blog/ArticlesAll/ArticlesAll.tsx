import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Jumbotron from "../../shared/Jumbotron/Jumbotron";
import Pagination from "../../shared/Pagination/Pagination";
import ArticlesAllCategoryDropDown from "../ArticlesAllCategoryDropDown/ArticlesAllCategoryDropDown";
import ArticlesAllSearch from "../ArticlesAllSearch/ArticlesAllSearch";
import ArticlesList from "../ArticlesList/ArticlesList";
import type { ArticleDetailsProps } from "../../../interfaces/props/articles/ArticleDetailsProps";
import type { CategoryProps } from "../../../interfaces/props/categories/CategoryProps";
import * as articlesService from "../../../services/articles";
import { directions } from "../../../utils/constants/global";
import { scrollToTop } from "../../../utils/helpers/form";
import styles from "./ArticlesAll.module.css";

const ArticlesAll = ({ pathToImage }: { pathToImage: string }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams?.get("page") ? searchParams.get("page") : "1";

  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate();

  const [articles, setArticles] = useState<ArticleDetailsProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>({
    id: state?.category.id ? state.category.id : "default",
    name: state?.category.name ? state.category.name : "all",
    image: "",
  });
  const [currentPage, setCurrentPage] = useState<string>(page!);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [hasToScroll, setHasToScroll] = useState<boolean>(false);
  const [hasToNavigate, setHasToNavigate] = useState<boolean>(false);
  const [isSearchIconClicked, setIsSearchIconClicked] =
    useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);

  useEffect(() => {
    articlesService
      .all(currentPage, selectedCategory.id, query)
      .then((data) => {
        setArticles(data.articles!);
        setCurrentPage(data.currentPage!);
        setPagesCount(data.pagesCount!);
        setIsSearched(false);

        if (hasToScroll) {
          scrollToTop();
          setHasToScroll(false);
        }

        if (hasToNavigate) {
          startPageHelper();
          setHasToNavigate(false);
        }
      })
      .catch((err) => console.error(err));
  }, [currentPage, selectedCategory, isSearched, isSearchIconClicked]);

  const onPaginationHandler = (direction: string): void => {
    const value = direction === directions.PREV ? -1 : 1;
    setCurrentPage((Number(currentPage) + value).toString());
    setHasToScroll(true);
  };

  const onShowSearchForm = (): void => {
    setIsSearchIconClicked(!isSearchIconClicked);
    setIsSearched(false);
    setQuery("");
  };

  const onSearch = (): void => {
    setIsSearched(true);
    startPageHelper();
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const onCategoryHandler = (e: React.MouseEvent<HTMLElement>): void => {
    const target = e.currentTarget as HTMLElement;
    setSelectedCategory({
      id: target.id,
      name: target.innerText,
      image: "",
    });
    setHasToNavigate(true);
  };

  const onRemoveCategotyHandler = (e: React.MouseEvent<HTMLElement>): void => {
    e.stopPropagation();
    setSelectedCategory({
      id: "default",
      name: "all",
      image: "",
    });
    setHasToNavigate(true);
  };

  const startPageHelper = (): void => {
    navigate(`/blog?page=1&category=${selectedCategory.name}`);
    setCurrentPage("1");
  };

  return (
    <section className={styles["articles-all"]}>
      <Jumbotron pathToImage={pathToImage} isHomePage={false} />
      <div className={styles["articles-all-title-wrapper"]}>
        <h4 className={styles["articles-all-title"]}>Wedding Blog</h4>
        <p className={styles["article-all-content-text"]}>
          You don't marry the person you can live with, you marry the person you
          can't live without.
        </p>
      </div>
      <div className={styles["articles-all-forms-wrapper"]}>
        <ArticlesAllSearch
          isSearchIconClicked={isSearchIconClicked}
          query={query}
          onShowSearchForm={onShowSearchForm}
          onSearch={onSearch}
          onChangeHandler={onChangeHandler}
        />

        <ArticlesAllCategoryDropDown
          selectedCategoryName={selectedCategory.name}
          onCategoryHandler={onCategoryHandler}
          onRemoveCategotyHandler={onRemoveCategotyHandler}
        />
      </div>
      <ArticlesList
        articles={articles}
        currentPage={currentPage}
        selectedCategory={selectedCategory.name}
      />
      <Pagination
        currentPage={Number(currentPage)}
        pagesCount={pagesCount}
        selectedCategory={selectedCategory}
        onClickHandler={onPaginationHandler}
      />
    </section>
  );
};

export default ArticlesAll;
