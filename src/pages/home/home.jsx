/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Blog from "./blog.jsx";
import "./Home.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 2;

  const [paginas, setPaginas] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const backURL =
        import.meta.env.VITE_URL + "blog?page=" + page + "&limit=" + limit;
      console.log(backURL);

      const response = await fetch(backURL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();

      setBlogs(responseJson.data.respuesta.blogs);
      setPaginas(responseJson.data.respuesta.cantidadActual);

      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error: ", error);
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, limit });
    navigate(`?page=${newPage}&limit=${limit}`);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, limit]);

  return (
    <>
      <h1>Home</h1>
      {isLoading && <CircularProgress style={{ color: "#ffbb0067" }} />}
      {blogs.length === 0 && !isLoading && <h3>No hay blogs...</h3>}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <div className="paginacion">
        <button
          className="button"
          onClick={() => handlePageChange(Number(page) - 1)}
          disabled={page == 1}
        >
          Anterior
        </button>
        <h1 className="paginacion-titulo">Página {page}</h1>
        <button
          className="button"
          onClick={() => handlePageChange(Number(page) + 1)}
          disabled={page == paginas}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default Home;
