import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../../context/auth_context";

const CrearBlog = () => {
  const navigate = useNavigate();
  const backURL = import.meta.env.VITE_URL;
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [contenido, setContenido] = useState("");
  const { accessToken, handleRefreshToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blog = {
        titulo,
        imagen,
        contenido,
        descripcion,
        author: "675a86728a072bd8cdd3a382",
      };
      let response = await fetchBack(blog);
      if (response === -1) {
        response = await fetchBack(blog);
      }

      if (response) {
        toast.success("Blog creado exitosamente");
        navigate("/blog");
      }
    } catch (error) {
      console.error("Error al crear el blog:", error.message);
      toast.error("Error al crear el blog");
    }
  };
  const fetchBack = async (data) => {
    try {
      const response = await fetch(backURL + "blog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(data),
      });
      if (response.status === 401) {
        const respuesta = await handleRefreshToken();
        if (respuesta === -1) {
          navigate("/login");
        }
        return -1;
      }
      const responseJson = await response.json();
      if (response.ok) {
        return responseJson.data;
      }
      return null;
    } catch (error) {
      console.error("Error al obtener los blogs:", error);
    }
  };
  return (
    <div className="contenedor">
      <form onSubmit={handleSubmit} className="form">
        <h1>Crear Blog</h1>
        <div className="input">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="descripcion">Descripcion:</label>
          <input
            type="text"
            id="descripcion"
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="contenido">Contenido:</label>
          <input
            type="text"
            id="Contenido"
            cols={"50"}
            rows={"10"}
            onChange={(e) => setContenido(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="text"
            id="imagen"
            onChange={(e) => setImagen(e.target.value)}
          />
        </div>

        <button type="submit" className="boton">
          Crear Blog
        </button>
      </form>
    </div>
  );
};

export default CrearBlog;
