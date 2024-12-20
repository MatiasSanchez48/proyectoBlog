/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom";

import "./autor.css";
const Autor = ({ autor }) => {
  const getInitials = (nombre, apellido) => {
    const firstInitial = nombre ? nombre[0] : "";
    const lastInitial = apellido ? apellido[0] : "";
    return `${firstInitial}${lastInitial}`;
  };
  return (
    <div className="autor">
      <div className="avatar">
        {autor.imagen ? (
          <img src={autor.imagen} alt="avatar" className="avatar-img" />
        ) : (
          <span className="initials">
            {getInitials(autor.nombre, autor.apellido)}
          </span>
        )}
      </div>
      <div className="autor-info">
        <p>{autor.nombre}</p>
        <p>{autor.apellido || null}</p>
      </div>
    </div>
  );
};

export default Autor;
