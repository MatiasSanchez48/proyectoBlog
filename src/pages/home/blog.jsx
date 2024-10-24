/* eslint-disable react/prop-types */

import "./blog.css";
const Blog = ({ blog }) => {
  console.log(blog);

  return (
    <div className="contenedor">
      <img src={blog.urlToImage} alt={blog.title} className="imagen" />
      <div className="datos">
        <h1 className="titulo">{blog.title}</h1>
        <div className="subtitulo">
          <p className="author">{blog.author}</p>
          <p>{blog.publishedAt}</p>
        </div>
        <p className="descripcion">{blog.description}</p>
      </div>
    </div>
  );
};
export default Blog;
