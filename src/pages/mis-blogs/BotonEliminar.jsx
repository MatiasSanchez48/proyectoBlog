/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth_context";

const BotonEliminar = ({ id, onDelete }) => {
  const navigate = useNavigate();
  const { accessToken, handleRefreshToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleEliminar = async () => {
    try {
      setIsLoading(true);
      const backURL = import.meta.env.VITE_URL + "blog/" + id;
      const response = await fetch(backURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      if (response.status === 401) {
        const respuesta = await handleRefreshToken();

        if (respuesta === -1 || respuesta == null) {
          toast.error("Usuario no logeado");
          navigate("/login");
        }
        return -1;
      }
      toast.success("Blog eliminado correctamente");
      setIsLoading(false);
      onDelete();
    } catch (e) {
      setIsLoading(false);
      toast.error("el blog no se pudo eliminar");
    }
  };
  if (isLoading) {
    return <Link className="back-link">Eliminando...</Link>;
  }
  return (
    <Link className="back-link" onClick={handleEliminar}>
      Eliminar Blog
    </Link>
  );
};

export default BotonEliminar;
