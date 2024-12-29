/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Perfil.css";

const Perfil = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [autorData, setAutorData] = useState(null);
  const { userId, accessToken, handleRefreshToken, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const fetchPerfil = async () => {
    try {
      setIsLoading(true);
      const backURL = import.meta.env.VITE_URL + "autores/" + userId;
      const response = await fetch(backURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      if (response.status === 401) {
        await refreshToken();
      }

      const resultadoJson = await response.json();
      setAutorData(resultadoJson.data.autor);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setIsLoading(false);
    }
  };
  const refreshToken = async () => {
    try {
      const respuesta = await handleRefreshToken();
      if (respuesta === -1 || respuesta == null) {
        logout();
        navigate("/login");
      }
      console.log(respuesta);

      return -1;
    } catch (error) {
      console.error(error);

      return -1;
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const backURL = import.meta.env.VITE_URL + "autores/" + userId;
      const response = await fetch(backURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(autorData),
      });

      if (response.ok) {
        const updatedAutor = await response.json();
        setAutorData(updatedAutor.data.autor);
        toast.success("Perfil actualizado con éxito.");
      } else {
        toast.error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAutorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  if (isLoading) {
    return <div className="perfil">Cargando...</div>;
  }

  return (
    <>
      <div className="perfil-container">
        <form className="perfil-form" onSubmit={handleSubmit}>
          <h2>Editar Perfil</h2>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={autorData.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              value={autorData.apellido}
              onChange={handleChange}
            />
          </label>
          <label>
            Nacionalidad:
            <input
              type="text"
              name="nacionalidad"
              value={autorData.nacionalidad}
              onChange={handleChange}
            />
          </label>
          <label>
            Fecha de Nacimiento:
            <input
              type="date"
              name="fechaNacimiento"
              value={autorData.fechaNacimiento.split("T")[0]}
              onChange={handleChange}
            />
          </label>
          <label>
            Bibliografía:
            <textarea
              name="bibliografia"
              value={autorData.bibliografia}
              onChange={handleChange}
            />
          </label>
          <label>
            Imagen URL:
            <input
              type="text"
              name="imagen"
              value={autorData.imagen}
              onChange={handleChange}
            />
          </label>
          <label>
            Red Social:
            <input
              type="text"
              name="redSocial"
              value={autorData.redSocial}
              onChange={handleChange}
            />
          </label>
          <button className="button" type="submit">
            Guardar
          </button>
        </form>
        <div className="perfil-info">
          <h2>Datos del Autor</h2>
          <p>
            <strong>Nombre:</strong> {autorData.nombre}
          </p>
          <p>
            <strong>Apellido:</strong> {autorData.apellido || "N/A"}
          </p>
          <p>
            <strong>Nacionalidad:</strong> {autorData.nacionalidad || "N/A"}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {autorData.fechaNacimiento.split("T")[0]}
          </p>
          <p>
            <strong>Bibliografía:</strong> {autorData.bibliografia || "N/A"}
          </p>
          {autorData.imagen && (
            <div>
              <strong>Imagen:</strong>
              <img
                src={autorData.imagen}
                alt="Imagen del Autor"
                className="perfil-img"
              />
            </div>
          )}
          <p>
            <strong>Red Social:</strong> {autorData.redSocial || "N/A"}
          </p>
        </div>
      </div>
    </>
  );
};
export default Perfil;
