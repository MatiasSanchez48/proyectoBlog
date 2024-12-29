import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/auth_context";
import { FaSignOutAlt } from "react-icons/fa";

import "./appbar.css";
import Autor from "../../pages/home/autor";

const Appbar = () => {
  const { isLogger, logout, setAccessToken, setRefreshToken } =
    useContext(AuthContext);

  const links = [{ to: "/", text: "Home" }];
  const linksLogin = [{ to: "/productos", text: "Productos" }];
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
  if (isLogger) {
    links.push({ to: "/crear-blog", text: "Crear Blog" });
    links.push({ to: "/mis-blogs", text: "Mis Blogs" });
  }
  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <div className="appbar">
        <div className="left">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className="link">
              <button className="link">{link.text}</button>
            </Link>
          ))}
        </div>
        <div className="right">
          {isLogger ? (
            <>
              {linksLogin.map((link) => (
                <Link key={link.to} to={link.to} className="link">
                  <button className="link">{link.text}</button>
                </Link>
              ))}
              <button className="link" onClick={handleLogout}>
                <FaSignOutAlt /> LOGOUT
              </button>
              <Link className="link" to={"/perfil"}>
                {" "}
                <Autor conNombre={false} />
              </Link>
            </>
          ) : (
            linksLogout.map((link) => (
              <Link key={link.to} to={link.to} className="link">
                <button className="link">{link.text}</button>
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Appbar;
