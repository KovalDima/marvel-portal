import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
/* тест запроса */
/* import MarvelService from "./services/MarvelService"; */
import "./style/style.scss";

/* тест запроса
const marvelService = new MarvelService();
без catch ошибка попадает на страницу
marvelService
  .getAllCharacters()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

marvelService
  .getCharacter(1010338)
  .then((data) => console.log(data))
  .catch((error) => console.log(error)); */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
