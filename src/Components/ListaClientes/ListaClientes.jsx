import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import './ListaClientes.css';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/clientes');
        setClientes(response.data.clientes);
      } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
      }
    };

    fetchData();
  }, []);

  const handleNavigateToClientes = () => {
    navigate('/Clientes');
  };

  const handleNavigateToModificarCliente = () => {
    navigate('/ModificarCliente');
  };

  return (
    <div className='ListaClientes'>
      <h1>Lista Clientes</h1>
      <table className="excel-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Tipo</th>
            {/* Quitar la columna de botones */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(clientes) ? (
            clientes.map((cliente) => (
              <tr key={cliente._id.$oid}>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.tipo.join(', ')}</td>
                {/* Quitar la columna de botones */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se pudo cargar la lista de clientes.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Agrega los botones para navegar a otras páginas */}
      <div style={{ position: 'fixed', bottom: '10px', left: '10px', textAlign: 'left' }}>
        <button onClick={handleNavigateToClientes}>Clientes</button>
        <button onClick={handleNavigateToModificarCliente}>Eliminar Clientes</button>
      </div>
    </div>
  );
};

export default ListaClientes;






