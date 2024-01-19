import spinnerGif from "../../resources/img/Rhombus.gif";
import "./spinner.scss";

function Spinner() {
  return <img className="spinner" src={spinnerGif} alt="loading" />;
}

export default Spinner;
