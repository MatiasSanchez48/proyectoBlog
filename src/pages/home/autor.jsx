/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// import { Link } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import "./autor.css";

const Autor = ({ autor = null, conNombre = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [autorData, setAutorData] = useState(autor);
  const { userId, accessToken, handleRefreshToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const fetchAutor = async () => {
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
      if (respuesta === -1) {
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
    if (!autor) {
      fetchAutor();
    } else {
      setAutorData(autor);
      setIsLoading(false);
    }
  }, [autor, userId]);

  const getInitials = (nombre, apellido) => {
    const firstInitial = nombre ? nombre[0] : "";
    const lastInitial = apellido ? apellido[0] : "";
    return `${firstInitial}${lastInitial}`;
  };

  if (isLoading) {
    <div className="autor">
      <p>...</p>
    </div>;
  }

  return (
    <div className="autor">
      {autorData && (
        <>
          <div className="avatar">
            {autorData.imagen ? (
              <img src={autorData.imagen} alt="avatar" className="avatar-img" />
            ) : (
              <span className="initials">
                {getInitials(autorData.nombre, autorData.apellido)}
              </span>
            )}
          </div>
          {conNombre && (
            <div className="autor-info">
              <p>{autorData.nombre}</p>
              <p>{autorData.apellido || null}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Autor;
