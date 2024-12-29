/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./productos.css";

const Productos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      setIsLoading(true);
      const backURL = import.meta.env.VITE_URL + "productos";
      const response = await fetch(backURL);
      const resultadoJson = await response.json();
      setProductos(resultadoJson.data.productos);

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <h1 className="productos-titulo">
        {isLoading ? "Cargando..." : "Productos"}
      </h1>
      <div className="productos-container">
        {productos.map((producto) => (
          <div key={producto.id}>
            <div className="producto-card" key={producto.id}>
              <h2 className="producto-nombre">{producto.nombre}</h2>
              <p className="producto-precio">${producto.precio.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
