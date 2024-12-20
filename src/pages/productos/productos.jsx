import { useState, useEffect } from "react";

const Productos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProductos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://localhost:3000/productos/paginados?page=${page}limit={2}`
      );
      const resultadoJson = await response.json();
      setProductos(resultadoJson.data.productos);
      setTotalPages(resultadoJson.cantiadadPaginas);
      setIsLoading(false);
      console.log(resultadoJson);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <div>
        {productos.map((producto) => (
          <div key={producto.id}>
            <h2>{producto.name}</h2>
            <p>{producto.description}</p>
            <p>{producto.price}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePreviousPage} disabled={page === 1}>
        anterior
      </button>
      <button onClick={handleNextPage} disabled={page === totalPages}>
        Siguiente
      </button>
      <h1>Productos</h1>
    </div>
  );
};

export default Productos;
