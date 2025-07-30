import { useEffect, useState } from "react";
import Jumbotron from "../../shared/Jumbotron/Jumbotron";
import type { ArticleProps } from "../../../interfaces/ArticleProps";
import * as usersService from "../../../services/users";
import styles from "./FavouriteArticle.module.css";
import ArticlesList from "../../Blog/ArticlesList/ArticlesList";

const FavouriteArticle = ({ pathToImage }: { pathToImage: string }) => {
  const [favArticles, setFavArticles] = useState<ArticleProps[]>([]);

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
