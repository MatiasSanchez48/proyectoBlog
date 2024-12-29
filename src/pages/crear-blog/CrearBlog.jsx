/* eslint-disable no-unused-vars */
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
  const { accessToken, handleRefreshToken, userId } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!titulo || !descripcion || !imagen || !contenido) {
        toast.error("Todos los campos son requeridos");
        return;
      }
      if (userId === null) {
        toast.error("Usuario no logeado");
        navigate("/login");
        return;
      }

      const blog = {
        titulo,
        imagen,
        contenido,
        descripcion,
        autor: userId,
      };

      let response = await fetchBack(blog);

      if (response === -1) {
        await fetchBack(blog);
      }

      if (response) {
        toast.success("Blog creado exitosamente");
        setContenido("");
        setDescripcion("");
        setImagen("");
        setTitulo("");
      }
    } catch (error) {
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
    } catch (e) {
      toast.error("Error al crear el blog");
    }
  };

  return (
    <div className="contenedor">
      <h1>Crear Blog</h1>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="Titulo" className="label">
          Titulo{" "}
        </label>
        <div className="input">
          <input
            type="text"
            id="Titulo"
            placeholder="Titulo del blog"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <label htmlFor="Descripcion" className="label">
          Descripcion{" "}
        </label>
        <div className="input">
          <input
            type="text"
            id="Descripcion"
            placeholder="Descripcion del blog"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <label htmlFor="Contenido" className="label">
          Contenido{" "}
        </label>
        <div className="input">
          <input
            type="text"
            id="Contenido"
            placeholder="Contenido del blog"
            cols={"50"}
            rows={"10"}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            required
          />
        </div>
        <label htmlFor="URL de la Imagen" className="label">
          URL de la Imagen{" "}
        </label>
        <div className="input">
          <input
            type="text"
            id="URL de la Imagen"
            placeholder="Imagen del blog"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">
          Crear Blog
        </button>
      </form>
    </div>
  );
};

export default CrearBlog;
