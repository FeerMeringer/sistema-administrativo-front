import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FacturaElectronica.css'
export default function FacturaElectronica() {
  const afipUrl = 'https://www.afip.gob.ar/landing/default.asp';
  const navigate = useNavigate(); // Agrega esta línea

  const handleNavigateToAfip = () => {
    // Abre la página de AFIP en una nueva pestaña o ventana
    window.open(afipUrl, '_blank');
  };

  const handleNavigateToPaginaPrincipal = () => {
    navigate('/PaginaPrincipal'); 
  };

  return (
    <div className='factura'>
      <h1>Factura Electrónica</h1>
      {/* Contenido de tu componente FacturaElectronica */}
      <button onClick={handleNavigateToAfip}>Ir a la página de AFIP</button>
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


