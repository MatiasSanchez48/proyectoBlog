/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

import "./blog.css";
import Autor from "./autor";
const Blog = ({ blog }) => {
  return (
    <div className="contenedor">
      <div className="datos">
        <h1 className="titulo">{blog.titulo}</h1>
        <hr className="divider" />
        <p className="titulo-descripcion">Descripcion:</p>
        <p className="descripcion">{blog.descripcion}</p>
        <p className="titulo-descripcion">Contenido:</p>
        <p className="descripcion"> {blog.contenido}</p>
        <div className="fecha">
          <p className="titulo-descripcion">Fecha de publicacion:</p>
          <p className="fechaPublicacion">
            {new Date(blog.fechaPublicacion).toLocaleDateString("es-ES")}
          </p>
        </div>
        <div className="autor-vermas">
          <div>
            <p className="titulo-descripcion">Creador:</p>{" "}
            <p className="autor">{<Autor autor={blog.autor}/> || "Autor desconocido"}</p>
          </div>
          <Link to={`/blog/${blog.id}`}>Ver más</Link>
        </div>
      </div>
      <img src={blog.imagen} alt={blog.titulo} className="imagen" />
    </div>
  );
};

export default Blog;
