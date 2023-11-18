import React, { useState } from 'react';
import './PresupuestoForm.css'

const PresupuestoForm = () => {
  const [datosPresupuesto, setDatosPresupuesto] = useState({
    logo: 'https://i.imgur.com/RgqM0CU.png',
    fecha: '',
    numeroFactura: '',
    fechaVencimiento: '',
    para: '',
    direccion: '',
    ciudad: '',
    telefono: '',
    lineasPresupuesto: [
      { cantidad: '', descripcion: '', precioUnitario: '', descuento: '', precioLinea: '' },
    ],
    subtotal: '',
    total: '',
  });
  const handleImprimirPresupuesto = () => {
    window.print();
  };

  const actualizarCampo = (seccion, campo, valor) => {
    setDatosPresupuesto((prevDatos) => ({
      ...prevDatos,
      [seccion]: {
        ...prevDatos[seccion],
        [campo]: valor,
      },
    }));
  };

  const actualizarLineaPresupuesto = (index, campo, valor) => {
    const nuevasLineasPresupuesto = [...datosPresupuesto.lineasPresupuesto];
    nuevasLineasPresupuesto[index][campo] = valor;
    setDatosPresupuesto((prevDatos) => ({
      ...prevDatos,
      lineasPresupuesto: nuevasLineasPresupuesto,
    }));
  };

  // Función para calcular el subtotal y el total
  const calcularTotal = () => {
    // Lógica para calcular subtotal y total según tus necesidades
    // En este ejemplo, se asume que los precios están en formato numérico
    const subtotal = datosPresupuesto.lineasPresupuesto.reduce(
      (total, linea) => total + parseFloat(linea.precioLinea || 0),
      0
    );

    const total = subtotal; // Puedes agregar impuestos u otros ajustes aquí

    setDatosPresupuesto((prevDatos) => ({
      ...prevDatos,
      subtotal: subtotal.toFixed(2),
      total: total.toFixed(2),
    }));
  };

  return (
    <div>
      <label className='presupuesto'>
        <img src={datosPresupuesto.logo} alt="Logo" style={{ maxWidth: '100px' }} />
        <h2> Presupuesto</h2>
      </label>
      <div className='contenedor-presupuesto'>
      <label>
        Numero de Factura:
        <input
        className='sin-linea'
          type="text"
          value={datosPresupuesto.numeroFactura}
          onChange={(e) => actualizarCampo('numeroFactura', e.target.value)}
        />
      </label>
      <label>
        Fecha:
        <input
        className='sin-linea'
          type="text"
          value={datosPresupuesto.fecha}
          onChange={(e) => actualizarCampo('fecha', e.target.value)}
        />
      </label>
      <label>
        Fecha de Vencimiento:
        <input
        className='sin-linea'
          type="text"
          value={datosPresupuesto.fechaVencimiento}
          onChange={(e) => actualizarCampo('fechaVencimiento', e.target.value)}
        />
      </label>
      <label>
        Para:
        <input
        className='sin-linea'
          type="text"
          value={datosPresupuesto.para}
          onChange={(e) => actualizarCampo('para', e.target.value)}
        />
      </label>
      <label>
        Dirección:
        <input
        className='sin-linea'
          type="text"
          value={datosPresupuesto.direccion}
          onChange={(e) => actualizarCampo('direccion', e.target.value)}
        />
      </label>
      <label>
        Ciudad:
        <input
        className='sin-linea'
          type="text"
          value={datosPresupuesto.ciudad}
          onChange={(e) => actualizarCampo('ciudad', e.target.value)}
        />
      </label>
      <label>
        Teléfono:
        <input
        className='sin-linea'
          type="text"
          value={datosPresupuesto.telefono}
          onChange={(e) => actualizarCampo('telefono', e.target.value)}
        />
      </label>
      </div>

      <table className='tabla-presupuesto'>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Descripción</th>
            <th>Precio Unitario</th>
            <th>Descuento</th>
            <th>Precio de Línea</th>
          </tr>
        </thead>
        <tbody>
          {datosPresupuesto.lineasPresupuesto.map((linea, index) => (
            <tr key={index}>
              <td>
                <input
                className='input-tabla'
                  type="text"
                  value={linea.cantidad}
                  onChange={(e) => actualizarLineaPresupuesto(index, 'cantidad', e.target.value)}
                />
                <input 
                className='input-tabla' type="text" />
                 <input 
                className='input-tabla' type="text" />
              </td>
              <td>
                <input
                className='input-tabla'
                  type="text"
                  value={linea.descripcion}
                  onChange={(e) => actualizarLineaPresupuesto(index, 'descripcion', e.target.value)}
                />
                 <input 
                className='input-tabla' type="text" />
                 <input 
                className='input-tabla' type="text" />
              </td>
              <td>
                <input
                  type="text"
                  className='input-tabla'
                  value={linea.precioUnitario}
                  onChange={(e) =>
                    actualizarLineaPresupuesto(index, 'precioUnitario', e.target.value)
                  }
                />
                 <input 
                className='input-tabla' type="text" />
                 <input 
                className='input-tabla' type="text" />
              </td>
              <td>
                <input
                className='input-tabla'
                  type="text"
                  value={linea.descuento}
                  onChange={(e) => actualizarLineaPresupuesto(index, 'descuento', e.target.value)}
                />
                 <input 
                className='input-tabla' type="text" />
                 <input 
                className='input-tabla' type="text" />
              </td>
              <td>
                <input
                  type="text"
                  className='input-tabla'
                  value={linea.precioLinea}
                  onChange={(e) => actualizarLineaPresupuesto(index, 'precioLinea', e.target.value)}
                />
                 <input 
                className='input-tabla' type="text" />
                 <input 
                className='input-tabla' type="text" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='total-presupuesto'>
      <label>
        Subtotal:
        <input type="text" value={datosPresupuesto.subtotal} readOnly />
      </label>
      <label>
        Total:
        <input type="text" value={datosPresupuesto.total} readOnly />
      </label>
      </div>
      <button className='invisible' type="button" onClick={handleImprimirPresupuesto}>
        Imprimir Presupuesto
      </button>

    </div>
  );
};

export default PresupuestoForm;
