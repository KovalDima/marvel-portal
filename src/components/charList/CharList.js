// import { Component } from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";

/* class CharList extends Component {
  state = {
    allCharacters: [],
    loading: true,
    error: false,
    newCharsLoading: false,
    offset: 210,
    charsEnded: false,
  };

  marvelService = new MarvelService();

  // componentDidMount() {
  //   this.updateCharacters();
  // }

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onNewCharsLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharactersLoaded)
      .catch(this.onError);
  };

  onNewCharsLoading = () => {
    this.setState({
      newCharsLoading: true,
    });
  };

  // updateCharacters = () => {
  //   this.marvelService
  //     .getAllCharacters()
  //     .then(this.onCharactersLoaded)
  //     .catch(this.onError);
  // };

  // 1.
  // onCharactersLoaded = (characters) => {
  //   this.setState({
  //     allCharacters: characters,
  //     loading: false,
  //     newCharsLoading: false,
  //   });
  // };

  // 2.
  // onCharactersLoaded = (characters) => {
  //   this.setState(({ allCharacters, offset }) => ({
  //     allCharacters: [...allCharacters, ...characters],
  //     loading: false,
  //     newCharsLoading: false,
  //     offset: offset + 9,
  //   }));
  // };

  onCharactersLoaded = (characters) => {
    let ended = characters.length < 9 ? true : false;

    this.setState(({ allCharacters, offset }) => ({
      allCharacters: [...allCharacters, ...characters],
      loading: false,
      newCharsLoading: false,
      offset: offset + 9,
      charsEnded: ended,
    }));
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  createItems = (arr) => {
    return arr.map(({ name, thumbnail, id }) => {
      let imgStyle = { objectFit: "cover" };
      if (
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }
      return (
        <li
          onClick={() => this.props.onCharSelected(id)}
          className="char__item"
          key={id}
        >
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
  };

  render() {
    const {
      allCharacters,
      loading,
      error,
      newCharsLoading,
      offset,
      charsEnded,
    } = this.state;
    const items = this.createItems(allCharacters);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        <ul className="char__grid">{errorMessage || spinner || content}</ul>
        <button
          disabled={newCharsLoading}
          style={{ display: charsEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
          className={`button button__main button__long ${
            newCharsLoading ? "button--disabled" : ""
          }`}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
} */

/* Переделываем на функциональный */

function CharList(props) {
  const [allCharacters, setAllCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newCharsLoading, setNewCharsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charsEnded, setCharsEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    onNewCharsLoading();
    marvelService
      .getAllCharacters(offset)
      .then(onCharactersLoaded)
      .catch(onError);
  };

  const onNewCharsLoading = () => {
    setNewCharsLoading(true);
  };

  const onCharactersLoaded = (characters) => {
    let ended = characters.length < 9 ? true : false;
    setAllCharacters((allCharacters) => [...allCharacters, ...characters]);
    setLoading(false);
    setNewCharsLoading(false);
    setOffset((offset) => offset + 9);
    setCharsEnded(ended);
  };

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const createItems = (arr) => {
    return arr.map(({ name, thumbnail, id }) => {
      let imgStyle = { objectFit: "cover" };
      if (
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }
      return (
        <li
          onClick={() => props.onCharSelected(id)}
          className="char__item"
          key={id}
        >
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      );
    });
  };

  const items = createItems(allCharacters);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;
  console.log("render");

  return (
    <div className="char__list">
      <ul className="char__grid">{errorMessage || spinner || content}</ul>
      <button
        disabled={newCharsLoading}
        style={{ display: charsEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
        className={`button button__main button__long ${
          newCharsLoading ? "button--disabled" : ""
        }`}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
