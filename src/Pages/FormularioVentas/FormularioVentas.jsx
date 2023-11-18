import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './FormularioVentas.css';

const FormularioVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [producto, setProducto] = useState('');
  const [monto, setMonto] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    // Cargar las ventas desde el backend al montar el componente
    axios.get('https://sistema-back-f5xx.onrender.com/ventas')
      .then(response => setVentas(response.data.ventas))
      .catch(error => console.error('Error al cargar las ventas:', error));
  }, []);

  const handleVentaSubmit = (e) => {
    e.preventDefault();

    // Enviar la nueva venta al backend usando Axios
    axios.post('https://sistema-back-f5xx.onrender.com/ventas', { producto, monto })
      .then(response => {
        // Actualizar el estado con la nueva venta
        setVentas([...ventas, response.data.venta]);
      })
      .catch(error => console.error('Error al registrar la venta:', error));

    // Limpiar el formulario después de enviar
    setProducto('');
    setMonto('');
  };

  const handleEliminarVenta = (id) => {
    axios
      .delete(`https://sistema-back-f5xx.onrender.com/ventas/${id}`)
      .then((response) => {
        setVentas(ventas.filter((venta) => venta._id !== id));
        console.log(`Venta con ID ${id} eliminada correctamente`);
        // Puedes agregar lógica adicional después de eliminar la venta si es necesario
      })
      .catch((error) => {
        console.error('Error al eliminar la venta', error);
      });
  };
  

  const totalPorProducto = ventas.reduce((totalPorProducto, venta) => {
    const { producto, monto } = venta;
    totalPorProducto[producto] = (totalPorProducto[producto] || 0) + monto;
    return totalPorProducto;
  }, {});

  const totalGeneral = Object.values(totalPorProducto).reduce((total, monto) => total + monto, 0);

  const chartData = Object.entries(totalPorProducto).map(([producto, monto]) => ({ producto, monto }));

  return (
    <div className='grafico'>
      <h1>Ventas</h1>
      <div className='listo' style={{ display: 'flex', width: '95%', justifyContent: 'flex-end', marginTop: '5%' }}>
        {ventas.length > 0 && (
          <>
            <div className='gra' style={{ marginRight: '60px' }}>
              <VictoryChart domainPadding={55} width={900} height={500}>
                <VictoryBar
                  data={chartData}
                  x="producto"
                  y="monto"
                  style={{ data: { fill: '#FF0000' } }}
                />
                <VictoryAxis tickFormat={(tick) => `${tick}`} />
                <VictoryAxis dependentAxis />
              </VictoryChart>
            </div>
            <div className='total'>
              <table >
                <thead>
                  <tr >
                    <th>Producto</th>
                    <th>Monto</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(totalPorProducto).map(([producto, monto]) => (
                    <tr key={producto}>
                      <td>{producto}</td>
                      <td>${monto}</td>
                      <td className='boton'>
                        <button  onClick={() => handleEliminarVenta(ventas.find(venta => venta.producto === producto)._id)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>Total general: ${totalGeneral}</p>
            </div>
          </>
        )}
        <form className='formGrafico' onSubmit={handleVentaSubmit}>
          <label>
            Producto:
            <input
            className='mali'
              type="text"
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
            />
          </label>
          <label>
            Monto:
            <input
            className='mali1'
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </label>
          <button className='rin' type="submit">Registrar Venta</button>
        </form>
        <div className='boton-navegar'>
      <button onClick={() => navigate('/PaginaPrincipal')}> PaginaPrincipal</button>
    </div>
  </div>
      </div>
      
  );
};

export default FormularioVentas;

















