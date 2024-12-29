/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

import "./blog.css";
import Autor from "./autor";
const Blog = ({ blog, child = null }) => {
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
            <div className="autor">
              {<Autor autor={blog.autor} /> || "Autor desconocido"}
            </div>
          </div>
          <div>
            <Link className="back-link" to={`/blog/${blog.id}`}>
              ver más
            </Link>
            {child && child}
          </div>
        </div>
      </div>
      <div className="imagen">
        <img
          src={blog.imagen}
          alt="Imagen del blog"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://static.vecteezy.com/system/resources/previews/004/141/669/large_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
          }}
          className="imagen"
        />
      </div>
    </div>
  );
};

export default Blog;
