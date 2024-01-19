// import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import { MainPage, ComicsPage, Page404, SingleComicsPage } from "../pages";

/* ---------------------------------------------- */

/* const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList />
          <CharInfo />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
}; */

/* ---------------------------------------------- */

/* class App extends Component {
  state = {
    showRandomChar: true,
  };

  toggleRandomChar = () => {
    this.setState(({ showRandomChar }) => ({
      showRandomChar: !showRandomChar,
    }));
  };

  render() {
    return (
      <div className="app">
        <Header />
        <main>
          {this.state.showRandomChar ? <RandomChar /> : null}
          <div>
            <button onClick={this.toggleRandomChar}>Toggle Character</button>
          </div>
          <div className="char__content">
            <CharList />
            <CharInfo />
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
} */

/* ---------------------------------------------- */

/* class App extends Component {
  state = {
    selectedChar: null,
  };

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  render() {
    const { selectedChar } = this.state;
    return (
      <div className="app">
        <Header />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <div className="char__info">
              <ErrorBoundary>
                <CharInfo charId={selectedChar} />
              </ErrorBoundary>
            </div>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
} */

/* App переделываем на хуки */

/* function App() {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={onCharSelected} />
            </ErrorBoundary>
            <div className="char__info">
              <ErrorBoundary>
                <CharInfo charId={selectedChar} />
              </ErrorBoundary>
            </div>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
          <Banner />
          <ComicsList />
        </main>
      </div>
    </Router>
  );
} */

/* Добавляем роутер v5 */

/* function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/comics">
              <ComicsPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
} */

/* Обновляемся на роутер v6 */

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:comicsId" element={<SingleComicsPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
