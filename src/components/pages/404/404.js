import ErrorMessage from "../../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import "./404.scss";

const Page404 = () => {
  return (
    <div className="block-404">
      <ErrorMessage />
      <p className="block-404__text">Page Not Found :-(</p>
      <Link className="block-404__link" to="/">
        Back to Main Page
      </Link>
    </div>
  );
};

export default Page404;
