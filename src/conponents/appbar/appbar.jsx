import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/auth_context";

import "./appbar.css";

const Appbar = () => {
  const { isLogged, logout, setAccessToken, setRefreshToken } =
    useContext(AuthContext);

  const links = [{ to: "/", text: "HOME" }];
  const linksLogin = [
    { to: "/blog-productos", text: "Productos" },
    { to: "/contact", text: "Contact" },
  ];
  const linksLogout = [
    { to: "/login", text: "Login" },
    { to: "/register", text: "Register" },
  ];
  const handleLogout = () => {
    logout();
    setAccessToken(null);
    setRefreshToken(null);
    toast.success("Deslogueo exitoso");
  };

  return (
    <div className="appbar">
      <div className="left">
        {links.map((link) => (
          <Link key={link.to} className="link">
            {link.text}
          </Link>
        ))}
      </div>
      <div className="right">
        {isLogged ? (
          <>
            {linksLogin.map((link) => (
              <Link key={link.to} className="link">
                {link.text}
              </Link>
            ))}
            <button className="link" onClick={handleLogout}>
              LOGOUT
            </button>
          </>
        ) : (
          linksLogout.map((link) => (
            <Link key={link.to} className="link">
              {link.text}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Appbar;
