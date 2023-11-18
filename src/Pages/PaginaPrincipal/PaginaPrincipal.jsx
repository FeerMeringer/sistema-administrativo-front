import React from 'react';
import { Link } from 'react-router-dom';
import './PaginaPrincipal.css'
import { useNavigate } from 'react-router-dom';

export default function PaginaPrincipal() {
  const navigate = useNavigate();
  const redirectToClientes = () => {
    navigate('/Clientes');
  };
  const redirectToListaPrecios = () => {
    navigate('/ListaPrecios');
  };
  const redirectToEntradaProductos = () => {
    navigate('/EntradaProductos');
  };
  const redirectToEliminarProducto = () => {
    navigate('/EliminarProducto');
  };
  const redirectToFormularioVentas = () => {
    navigate('/FormularioVentas');
  };
  const redirectToInstalacionFormulario = () => {
    navigate('/InstalacionFormulario');
  };
  const redirectToInicio= () => {
    navigate('/');
  };
  return (
    <div className='paginaPrincipal'>
      <h1>Pampa Alta</h1>
      <div className="card-container">
        <div  className="card" onClick={redirectToClientes} style={{ cursor: 'pointer' }}>
         <img className='fotoCliente' src="https://i.postimg.cc/BZkSY4d4/cliente.png" alt="" />
         <div className="card-title">Clientes
         </div>
        </div>
        <div className="card" onClick={redirectToEntradaProductos} style={{ cursor: 'pointer' }}>
          <img className='fotoCliente' src="https://i.postimg.cc/brCNhVHn/energia.png" alt="" />
          <div className="card-title">Entrada De Productos</div>
        </div>
        
        <div className="card" onClick={redirectToListaPrecios} style={{ cursor: 'pointer' }}>
          <img className='fotoCliente' src="https://i.postimg.cc/RZXrbJd3/lista-de-precios.png" alt="" />
          <div className="card-title">Lista Precios</div>
        </div>
        <div className="card" onClick={redirectToEliminarProducto} style={{ cursor: 'pointer' }}>
          <img className='fotoCliente' src="https://i.postimg.cc/wjt5nSch/agotado.png" alt="" />
          <div className="card-title">Eliminar Productos</div>
        </div>
        <Link to="/facturaElectronica" className="card">
          <img className='fotoCliente' src="https://i.postimg.cc/MTZnJB2h/facturacion.png" alt="" />
          <div className="card-title">Factura Electronica</div>
        </Link>
        <Link to="/RemitoForm" className="card">
         <img className='fotoCliente' src="https://i.postimg.cc/y8VxZ9WW/referir.png" alt="" />
          <div className="card-title">Remitos</div>
        </Link>
        
        <Link to="/PresupuestoForm" className="card">
          <img className='fotoCliente' src="https://i.postimg.cc/d0f2svws/presupuesto.png" alt="" />
          <div className="card-title">Presupuestos</div>
        </Link>
        <div className="card" onClick={redirectToInstalacionFormulario} style={{ cursor: 'pointer' }}>
          <img className='fotoCliente' src="https://i.postimg.cc/d0C1CKGt/apoyo.png" alt="" />
          <div className="card-title">Instalacion</div>
        </div>
        <div className="card" onClick={redirectToFormularioVentas} style={{ cursor: 'pointer' }}>
          <img className='fotoCliente' src="https://i.postimg.cc/TPndwJXK/aumentar.png" alt="" />
          <div className="card-title">Ventas</div>
        </div>
        <div className="card" onClick={redirectToInicio} style={{ cursor: 'pointer' }}>
          <img className='fotoCliente' src="https://i.postimg.cc/90btj9fS/cerrar-sesion.png" alt="" />
          <div className="card-title">Salir</div>
        </div>
        
      </div>
    </div>
  );
}

