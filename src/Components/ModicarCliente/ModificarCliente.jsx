import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ModificarCliente.css'


export default function ModificarCliente() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sistema-back-f5xx.onrender.com/clientes');
        setClientes(response.data.clientes);
      } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
      }
    };

    fetchData();
  }, []);

  const handleEliminar = (id) => {
    axios
      .delete(`https://sistema-back-f5xx.onrender.com/clientes/${id}`)
      .then((response) => {
        setClientes(clientes.filter((cliente) => cliente._id !== id));
        console.log(`Cliente con ID ${id} eliminado correctamente`);
        navigate('/ListaClientes');
      })
      .catch((error) => {
        console.error('Error al eliminar el cliente', error);
      });
  };

  const handleNavigateToClientes = () => {
    navigate('/Clientes');
  };

  return (
    <div>
      <h1 className='eliminar'>Eliminar Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes && clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente._id}>
                <td>{cliente._id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.tipo.join(', ')}</td>
                <td>
                  <button onClick={() => handleEliminar(cliente._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay clientes</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Agrega el botón para ir a la página de Clientes */}
      <button
  style={{
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    cursor: 'pointer',
  }}
  onClick={handleNavigateToClientes}
>
  Clientes
</button>

    </div>
  );
}

