import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./randomChar.scss";
import thor from "../../resources/img/thor.jpeg";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  constructor(props) {
    super(props);
    // this.updateChar();
    // setInterval(this.updateChar, 3000);
  }

  /* state = {
    name: null,
    descr: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
  }; */

  /* так как в будущем в state будут еще какие-то свойства, то свойство с персонажем выделим в отдельный объект */
  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  /* updateChar = () => {
    const id = Math.floor(Math.random() * 400 + 1011000);
    this.marvelService.getCharacter(id).then((data) =>
      this.setState({
        name: data.data.results[0].name,
        descr: data.data.results[0].description,
        thumbnail:
          data.data.results[0].thumbnail.path +
          "." +
          data.data.results[0].thumbnail.extension,
        homepage: data.data.results[0].urls[0].url,
        wiki: data.data.results[0].urls[1].url,
      })
    );
  }; */

  /* одно из последних: оптимизация обновления state после подгрузки персонажа  */
  // onCharLoaded = (char) => this.setState({ char });
  /* onCharLoaded = (char) => {
    this.setState({ char, loading: false });
    console.log(char);
  }; */
  onCharLoaded = (char) => {
    this.setState({ char, loading: false, error: false });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  /* обработка ошибки */
  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  /* updateChar = () => {
    const id = Math.floor(Math.random() * 400 + 1011000);
    this.marvelService.getCharacter(id).then((data) => this.setState(data));
    // Просто проверка всех трансформированных персонажей
    // this.marvelService.getAllCharacters().then((data) => console.log(data));
  }; */

  updateChar = () => {
    const id = Math.floor(Math.random() * 400 + 1011000);
    this.onCharLoading();
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  componentDidMount() {
    this.updateChar();
    // this.intervalId = setInterval(this.updateChar, 3000);
  }

  /* componentWillUnmount() {
    clearInterval(this.intervalId);
  } */

  render() {
    /* const { name, descr, thumbnail, homepage, wiki } = this.state; */
    /* Так как state был немного переделан */
    /* const {
      char: { name, descr, thumbnail, homepage, wiki },
      loading,
    } = this.state; */
    const { char, loading, error } = this.state;

    /* if (loading) {
      return <Spinner/>
    } */

    /* работаем уже с ошибками */
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? <RandomCharTemp char={char} /> : null;

    /* return (
      <div className="randomchar">
        <div className="randomchar__block">
          <img
            src={thumbnail}
            alt="Random character"
            className="randomchar__img"
          />
          <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">{descr}</p>
            <div className="randomchar__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    ); */
    return (
      <div className="randomchar">
        <div className="randomchar__block">
          {/* {loading ? <Spinner /> : <RandomCharTemp char={char} />} */}
          {errorMessage || spinner || content}
        </div>
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button onClick={this.updateChar} className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

function RandomCharTemp({ char }) {
  const { name, descr, thumbnail, homepage, wiki } = char;
  let imgStyle = {
    objectFit: "cover",
  };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = {
      objectFit: "contain",
    };
  }
  return (
    <>
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{descr}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </>
  );
}

export default RandomChar;
