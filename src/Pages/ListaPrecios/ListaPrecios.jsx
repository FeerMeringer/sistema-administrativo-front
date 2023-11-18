import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListaPrecios.css';

export default function ListaPrecios() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('https://sistema-back-f5xx.onrender.com/productos');
        setProductos(response.data.productos);
      } catch (error) {
        console.error('Error al obtener la lista de precios:', error);
      }
    };

    fetchProductos();
  }, []);
  const handleNavigateToPaginaPrincipal = () => {
    navigate('/PaginaPrincipal');
  };
  return (
    <div className="lista-precios-container">
      <h1>Lista de Precios</h1>
      <table className="precio-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Precio Unitario USD</th>
            <th>Precio WP USD</th>
            <th>Precio en Pesos</th>
            <th>IVA</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto._id} className="precio-row">
              <td>{producto.nombre}</td>
              <td>{producto.codigo}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precioUnitarioUSD}</td>
              <td>{producto.precioWPUSD}</td>
              <td>{producto.precioPesos}</td>
              <td>{producto.iva}</td>
              <td>{producto.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
       {/* Botón para ir a la PaginaPrincipal */}
       <button
  style={{
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    cursor: 'pointer',
  }}
  onClick={handleNavigateToPaginaPrincipal}
>
  PaginaPrincipal
</button>

    </div>
  );
}


