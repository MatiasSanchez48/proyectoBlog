/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth_context";
import "./detalle_blog.css";
import CircularProgress from "@mui/material/CircularProgress";
import { FaEdit } from "react-icons/fa";

import Autor from "./autor";

const DetalleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useContext(AuthContext);

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

  const isAuthor = blog.autor.id === userId;

  return (
    <div className="blog-detail">
      <h1 className="blog-title">{blog.titulo}</h1>
      <img
        src={blog.imagen || "/default-image.jpg"}
        alt={blog.titulo}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://static.vecteezy.com/system/resources/previews/004/141/669/large_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
        }}
        className="blog-image"
      />
      <hr className="divider" />
      <p className="blog-description">Descripcion: {blog.descripcion}</p>
      <p className="blog-content">Contenido: {blog.contenido}</p>
      <div className="blog-meta">
        {<Autor autor={blog.autor} /> || "Autor desconocido"}

        <p>
          <strong>Fecha de publicación:</strong>{" "}
          {new Date(blog.fechaPublicacion).toLocaleDateString()}
        </p>
      </div>
      <div className="actions">
        <Link className="back-link" to={`/`}>
          Volver al Home
        </Link>
        {isAuthor ? (
          <Link className="back-link" to={`/editar-blog`} state={{ blog }}>
            Editar <FaEdit />
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default DetalleBlog;
