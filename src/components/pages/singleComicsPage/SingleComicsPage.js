import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MarvelService from "../../../services/MarvelService";
import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import "./singleComicsPage.scss";

const SingleComicsPage = () => {
  const [comics, setComics] = useState({});
  const { title, description, pageCount, thumbnail, language, price } = comics;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { comicsId } = useParams();

  const marvelService = new MarvelService();

  useEffect(() => {
    updateComics();
  }, [comicsId]);

  const updateComics = () => {
    setLoading();
    marvelService.getComics(comicsId).then(onComicsLoaded).catch(onError);
  };

  const onComicsLoaded = (comics) => {
    setComics(comics);
    setLoading(false);
    setError(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );

  return spinner || errorMessage || content;
};

export default SingleComicsPage;
