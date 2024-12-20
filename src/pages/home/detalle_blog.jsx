// import { useParams, Link } from "react-router-dom";
// import { useState, useEffect } from "react";

const DetalleBlog = () => {
  // const { name } = useParams(); // Obtiene el parámetro name de la URL
  // const [blog, setBlog] = useState();

  // useEffect(() => {
  //   // Función asincrónica interna para hacer la llamada de la API
  //   const fetchBlog = async () => {
  //     const response = await fetch(
  //       "https://newsapi.org/v2/everything?q=tesla&from=2024-09-24&sortBy=publishedAt&apiKey=84a09e563c9c44998149f8e57bcbeb93"
  //     );
  //     const data = await response.json();

  //     // Busca el blog que coincida con el parámetro 'name' (en este caso, el 'source.name')
  //     const foundBlog = data.articles.find((b) => b.source.name === name);
  //     setBlog(foundBlog);
  //   };

  //   fetchBlog(); // Llama a la función interna
  // }, [name]); // 'name' como dependencia para ejecutar el efecto cada vez que cambie

  // if (!blog) {
  //   return <div>Blog no encontrado</div>;
  // }

  return (
    <div>
      {/* <h1>{blog.title}</h1>
      <img src={blog.urlToImage} alt={blog.title} />
      <p>{blog.author}</p>
      <p>{blog.publishedAt}</p>
      <p>{blog.content}</p>

      <Link to={`/`}>Volver</Link> */}
    </div>
  );
};

export default DetalleBlog;
