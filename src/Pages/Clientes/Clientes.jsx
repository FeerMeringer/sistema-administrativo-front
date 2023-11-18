import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Clientes.css';

export default function Clientes() {
  const navigate = useNavigate();

  const handleNavigateToEntradaClientes = () => {
    navigate('/EntradaClientes');
  };

  const handleNavigateToModificarCliente = () => {
    navigate('/ModificarCliente');
  };

  const handleNavigateToPaginaPrincipal = () => {
    navigate('/PaginaPrincipal');
  };

  return (
    <div className='clientesClientes'>
      <h1>Clientes</h1>
      <div className="card-container">
        {/* Card para Entrada de Clientes */}
        <Link to="/ListaClientes" className="card">
          <div className="card-title">Lista De Clientes</div>
        </Link>

        {/* Card para Lista de Clientes */}
        <div className="card" onClick={handleNavigateToEntradaClientes} style={{ cursor: 'pointer' }}>
          <div className="card-title">Entrada De Clientes</div>
        </div>

        {/* Card para Modificar/Borrar Clientes */}
        <Link to="/ModificarCliente" className="card">
          <div className="card-title" onClick={handleNavigateToModificarCliente} style={{ cursor: 'pointer' }}>Borrar Clientes</div>
        </Link>
      </div>

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


