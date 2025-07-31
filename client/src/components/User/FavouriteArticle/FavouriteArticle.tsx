import { useEffect, useState } from "react";
import ArticlesList from "../../Blog/ArticlesList/ArticlesList";
import Jumbotron from "../../shared/Jumbotron/Jumbotron";
import type { ArticleDetailsProps } from "../../../interfaces/props/articles/ArticleDetailsProps";
import * as usersService from "../../../services/users";
import styles from "./FavouriteArticle.module.css";

const FavouriteArticle = ({ pathToImage }: { pathToImage: string }) => {
  const [favArticles, setFavArticles] = useState<ArticleDetailsProps[]>([]);

  useEffect(() => {
    usersService
      .getFav()
      .then((res) => setFavArticles(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={styles["fav-articles"]}>
      <Jumbotron pathToImage={pathToImage} isHomePage={false} />
      <h4 className={styles["fav-articles-title"]}>Favourite Articles</h4>
      <ArticlesList articles={favArticles} />
    </section>
  );
};

export default FavouriteArticle;
