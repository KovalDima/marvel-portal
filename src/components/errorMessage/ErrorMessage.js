import "./errorMessage.scss";
import errorGif from "./error.gif";

function ErrorMessage() {
  return <img className="error-img" src={errorGif} alt="error" />;
}

export default ErrorMessage;
