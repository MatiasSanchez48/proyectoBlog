/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./detalle_blog.css";
import CircularProgress from "@mui/material/CircularProgress";

import Autor from "./autor";

const DetalleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlog = async () => {
    setIsLoading(true);
    const backURL = import.meta.env.VITE_URL;
    const response = await fetch(backURL + "blog/" + id);

    const resonseJson = await response.json();
    const blogData = resonseJson.data.blog;

    setBlog(blogData);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  if (isLoading) {
    return (
      <div className="blog-detail loading">
        <div className="spinner-container">
          <CircularProgress style={{ color: "#ffbb0067" }} />
        </div>
      </div>
    );
  }
  if (!blog) {
    return <div>Blog no encontrado</div>;
  }
  const isAuthor = blog.autor.id === 1;

  return (
    <div className="blog-detail">
      <h1 className="blog-title">{blog.titulo}</h1>
      <img
        src={blog.imagen || "/default-image.jpg"}
        alt={blog.titulo}
        className="blog-image"
      />
      <hr className="divider" />
      <p className="blog-description">Descripcion: {blog.descripcion}</p>
      <p className="blog-content">Contenido: {blog.contenido}</p>
      <div className="blog-meta">
        {<Autor autor={blog.autor} /> || "Autor desconocido"}
        {isAuthor && (
          <p className="highlight">¡Eres el autor de este blog! 🎉</p>
        )}
        <p>
          <strong>Fecha de publicación:</strong>{" "}
          {new Date(blog.fechaPublicacion).toLocaleDateString()}
        </p>
      </div>
      <Link className="back-link" to={`/`}>
        Volver
      </Link>
    </div>
  );
};

export default DetalleBlog;
