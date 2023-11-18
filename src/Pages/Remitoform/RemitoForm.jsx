import React, { useState } from 'react';

import './RemitoForm.css'; // Asegúrate de tener un archivo de estilos Remito.css con los estilos necesarios

const RemitoForm = () => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [cuit, setCuit] = useState('');
  const [productos, setProductos] = useState([]);
  const [firma, setFirma] = useState('');

  const numeroRemito = Math.floor(Math.random() * 1000) + 1;
  const fechaActual = new Date().toLocaleDateString();
 
  const handleGuardarRemito = () => {
    console.log('Remito guardado:', {
      numeroRemito,
      fecha: fechaActual,
      nombreCliente,
      domicilio,
      localidad,
      cuit,
      productos,
      firma,
    });

    // Puedes agregar lógica adicional aquí, como limpiar los campos después de guardar
    // y mostrar un mensaje de éxito al usuario.
  };
  const handleImprimirRemito = () => {
    window.print();
  };
 

  const handleDescargarRemito = () => {
    const remitoData = {
      numeroRemito,
      fecha: fechaActual,
      nombreCliente,
      domicilio,
      localidad,
      cuit,
      productos,
      firma,
    };

    const jsonData = JSON.stringify(remitoData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `remito_${numeroRemito}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const agregarProducto = () => {
    const nuevoProducto = { descripcion: '', cantidad: 0, precio: 0 }; // Añadí el campo precio
    setProductos([...productos, nuevoProducto]);
  };

  const actualizarProducto = (index, campo, valor) => {
    const nuevosProductos = [...productos];
    nuevosProductos[index][campo] = valor;
    setProductos(nuevosProductos);
  };
 

  return (
    <div className="remito-container">
      <div className="remito-header">
        <div className="x-mark-container">
          <div className="x-mark">X</div>
          <p className="invalid-invoice">No válido como factura</p>
        </div>
        <h2 className='remito'>Remito</h2>
        <img src="https://i.imgur.com/RgqM0CU.png" alt="Logo de la empresa" className="logo" />
      </div>
      <div className="remito-content">
        <p>Número de Remito: </p>
        <p>Fecha: {fechaActual}</p>
        <label className='remi'>
          Nombre del Cliente:
          <input
            type="text"
            className='remitoInput'
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
          />
        </label>
        <br />
        <label className='remi'>
          Domicilio:
          <input
            className='remitoInput'
            type="text"
            value={domicilio}
            onChange={(e) => setDomicilio(e.target.value)}
          />
        </label>
        <br />
        <label className='remi'>
          Localidad:
          <input
            className='remitoInput'
            type="text"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
          />
        </label>
        <br />
        <label className='remi'>
          CUIT:
          <input
            type="text"
            className='remitoInput'
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
          />
        </label>
        <br />
        <h3>Productos:</h3>
        <table className="productos-table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td className='agrande'>
                  <input
                    type="text"
                    value={producto.descripcion}
                    onChange={(e) => actualizarProducto(index, 'descripcion', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={producto.precio}
                    onChange={(e) => actualizarProducto(index, 'precio', parseFloat(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => actualizarProducto(index, 'cantidad', parseInt(e.target.value, 10))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <th className='total1'>Total:</th>

        <label className='firma'>
          Firma:
          <input
            type="text"
            className='remitoInput'
            value={firma}
            onChange={(e) => setFirma(e.target.value)}
          />
        </label>
        <br />
        <button className='invisible' type="button" onClick={handleImprimirRemito}>
          Imprimir Remito
        </button>
        <br />
      </div>
    </div>
  );
};

export default RemitoForm;



