/* 1. ------------- */
/* import "./comicsList.scss";
import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";

const ComicsList = () => {
  return (
    <div className="comics__list">
      <ul className="comics__grid">
        <li className="comics__item">
          <a href="#">
            <img src={uw} alt="ultimate war" className="comics__item-img" />
            <div className="comics__item-name">
              ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
            </div>
            <div className="comics__item-price">9.99$</div>
          </a>
        </li>
        <li className="comics__item">
          <a href="#">
            <img src={xMen} alt="x-men" className="comics__item-img" />
            <div className="comics__item-name">X-Men: Days of Future Past</div>
            <div className="comics__item-price">NOT AVAILABLE</div>
          </a>
        </li>
        <li className="comics__item">
          <a href="#">
            <img src={uw} alt="ultimate war" className="comics__item-img" />
            <div className="comics__item-name">
              ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
            </div>
            <div className="comics__item-price">9.99$</div>
          </a>
        </li>
        <li className="comics__item">
          <a href="#">
            <img src={xMen} alt="x-men" className="comics__item-img" />
            <div className="comics__item-name">X-Men: Days of Future Past</div>
            <div className="comics__item-price">NOT AVAILABLE</div>
          </a>
        </li>
        <li className="comics__item">
          <a href="#">
            <img src={uw} alt="ultimate war" className="comics__item-img" />
            <div className="comics__item-name">
              ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
            </div>
            <div className="comics__item-price">9.99$</div>
          </a>
        </li>
        <li className="comics__item">
          <a href="#">
            <img src={xMen} alt="x-men" className="comics__item-img" />
            <div className="comics__item-name">X-Men: Days of Future Past</div>
            <div className="comics__item-price">NOT AVAILABLE</div>
          </a>
        </li>
        <li className="comics__item">
          <a href="#">
            <img src={uw} alt="ultimate war" className="comics__item-img" />
            <div className="comics__item-name">
              ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
            </div>
            <div className="comics__item-price">9.99$</div>
          </a>
        </li>
        <li className="comics__item">
          <a href="#">
            <img src={xMen} alt="x-men" className="comics__item-img" />
            <div className="comics__item-name">X-Men: Days of Future Past</div>
            <div className="comics__item-price">NOT AVAILABLE</div>
          </a>
        </li>
      </ul>
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList; */

/* 2. ------------- */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setnewItemLoading(false) : setnewItemLoading(true);
    marvelService.getAllComics(offset).then(onComicsListLoaded).catch(onError);
  };

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList([...comicsList, ...newComicsList]);
    setLoading(false);
    setnewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        disabled={newItemLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
