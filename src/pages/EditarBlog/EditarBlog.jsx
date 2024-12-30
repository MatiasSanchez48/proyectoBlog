/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth_context";
import { FaEdit } from "react-icons/fa";

const EditarBlog = () => {
  const { state } = useLocation();
  const { blog } = state || {};
  const navigate = useNavigate();
  const backURL = import.meta.env.VITE_URL;
  const [titulo, setTitulo] = useState(blog?.titulo || "");
  const [descripcion, setDescripcion] = useState(blog?.descripcion || "");
  const [imagen, setImagen] = useState(blog?.imagen || "");
  const [contenido, setContenido] = useState(blog?.contenido || "");
  const { accessToken, handleRefreshToken, userId, logout } =
    useContext(AuthContext);

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

      const blogModificado = {
        titulo,
        imagen,
        contenido,
        descripcion,
        autor: userId,
      };

      let response = await fetchBack(blogModificado);

      if (response === -1) {
        await fetchBack(blogModificado);
      }

      if (response !== null && response !== -1) {
        toast.success("Blog Modificado exitosamente :D");
        setContenido("");
        setDescripcion("");
        setImagen("");
        setTitulo("");
        navigate("/");
      }
    } catch (e) {
      toast.error("Error al Edidar el blog");
    }
  };
  const fetchBack = async (data) => {
    try {
      const response = await fetch(backURL + "blog/" + blog.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(data),
      });
      if (response.status === 500) {
        toast.error("No se pudo editar el blog");
        return null;
      }

      if (response.status === 401) {
        const respuesta = await handleRefreshToken();
    

        if (respuesta == -1 || respuesta == null) {
          toast.success("No se pudo Modificar el blog");
          logout();
          navigate("/login");
          return -1;
        }
        return -1;
      }
      if (response.ok) {
        return response.ok;
      }
      return null;
    } catch (e) {
      toast.error("Error al Editar el blog");
    }
  };

  return (
    <div className="contenedor">
      <h1>Modificar Blog</h1>
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
          Modificar Blog <FaEdit />
        </button>
      </form>
    </div>
  );
};

export default EditarBlog;
