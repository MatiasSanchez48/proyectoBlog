import { Link } from "react-router-dom";
import "./appbar.css";

const Appbar = () => {
  return (
    <div className="appbar">
      <div className="left">
        <Link to={`/`} className="link">
          HOME
        </Link>{" "}
        <Link to={`/contact`} className="link">
          CONTACT
        </Link>
      </div>
      <div className="right">
        <Link to={`/login`} className="link">
          LOGIN
        </Link>
        <Link to={`/register`} className="link">
          REGISTER
        </Link>
      </div>
    </div>
  );
};

export default Appbar;
