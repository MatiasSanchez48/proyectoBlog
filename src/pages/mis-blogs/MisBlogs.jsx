/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth_context";

import CircularProgress from "@mui/material/CircularProgress";
import Blog from "../home/blog.jsx";
import BotonEliminar from "./BotonEliminar.jsx";

const MisBlogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 2;

  const { userId } = useContext(AuthContext);
  const [paginas, setPaginas] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const backURL =
        import.meta.env.VITE_URL +
        "blog/getbyautor/" +
        userId +
        "?page=" +
        page +
        "&limit=" +
        limit;

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
  }, [page, limit, searchParams]);

  return (
    <>
      <h1>Mis Blogs</h1>
      {isLoading && <CircularProgress style={{ color: "#ffbb0067" }} />}
      {blogs.length === 0 && !isLoading && <h3>No hay blogs...</h3>}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          child={<BotonEliminar id={blog.id} onDelete={fetchBlogs} />}
        />
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

export default MisBlogs;
