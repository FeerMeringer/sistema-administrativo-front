import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EliminarProducto.css'

export default function EliminarProducto() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sistema-back-f5xx.onrender.com/productos');
        setProductos(response.data.productos);
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    };

    fetchData();
  }, []);

  const handleEliminar = (id) => {
    axios
      .delete(`https://sistema-back-f5xx.onrender.com/productos/${id}`)
      .then((response) => {
        setProductos(productos.filter((producto) => producto._id !== id));
        console.log(`Producto con ID ${id} eliminado correctamente`);
        // Puedes redirigir a la página de Lista de Precios u otra página según tus necesidades
        navigate('/ListaPrecios');
      })
      .catch((error) => {
        console.error('Error al eliminar el producto', error);
      });
  };
  

  const handleNavigateToListaPrecios = () => {
    navigate('/ListaPrecios');
  };

  return (
    <div className='correr'>
      <h1>Lista de Productos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Descripción</th>
            <th>Precio Unitario USD</th>
            <th>Precio WP USD</th>
            <th>Precio en Pesos</th>
            <th>IVA</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos && productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto._id}>
                <td>{producto._id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.codigo}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.precioUnitarioUSD}</td>
                <td>{producto.precioWPUSD}</td>
                <td>{producto.precioPesos}</td>
                <td>{producto.iva}</td>
                <td>{producto.categoria}</td>
                <td>
                  <button onClick={() => handleEliminar(producto._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No hay productos</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Agrega el botón para ir a la página de Lista de Precios */}
      <button 
      className='lion'
  onClick={handleNavigateToListaPrecios}
>
Lista Precios
 
</button>

    </div>
  );
}

