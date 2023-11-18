import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EntradaProductos.css';

export default function EntradaProductos() {
  const navigate = useNavigate();

  const [productoData, setProductoData] = useState({
    nombre: '',
    codigo: '',
    descripcion: '',
    precioUnitarioUSD: 0,
    precioWPUSD: 0,
    iva: 0,
    categoria: '',
  });

  const [valorDolar, setValorDolar] = useState(0);
  const [precioPesos, setPrecioPesos] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoData({
      ...productoData,
      [name]: value,
    });
  };

  const handleValorDolarChange = (e) => {
    setValorDolar(e.target.value);
  };
  const handleNavigateToPaginaPrincipal = () => {
    navigate('/PaginaPrincipal');
  };

  const calcularPrecioPesos = () => {
    const { precioUnitarioUSD } = productoData;
  
    if (!isNaN(precioUnitarioUSD) && !isNaN(valorDolar)) {
      const precioEnPesos = parseFloat(precioUnitarioUSD) * parseFloat(valorDolar);
      // Redondear a dos decimales
      const precioEnPesosRedondeado = parseFloat(precioEnPesos.toFixed(3));
      setPrecioPesos(precioEnPesosRedondeado);
    } else {
      console.error('El valor de precioUnitarioUSD o valorDolar no es numérico. No se puede calcular el precio en pesos.');
      setPrecioPesos(0);
    }
  };

  const limpiarCampos = () => {
    setProductoData({
      nombre: '',
      codigo: '',
      descripcion: '',
      precioUnitarioUSD: '',
      precioWPUSD: '',
      iva: '',
      categoria: '',
    });
    setValorDolar(0);
    setPrecioPesos(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Datos del formulario:', productoData);

      const response = await axios.post('http://localhost:8000/productos', {
        ...productoData,
        valorDolar: parseFloat(valorDolar),
        precioPesos,
      });

      if (response.data.success) {
        console.log('Datos de productos enviados con éxito');
        limpiarCampos();
        navigate('/ListaPrecios');
      } else {
        console.error('Error al enviar datos de productos:', response.data.error);
      }
    } catch (error) {
      console.error('Error de red al enviar datos de productos:', error);
    }
  };

  return (
    <div className="entrada-productos-container">
      <h1>Entrada de Productos</h1>
      <form className="formulario-producto" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={productoData.nombre}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="codigo">Código:</label>
        <input type="text" id="codigo" name="codigo" value={productoData.codigo} onChange={handleInputChange} required />

        <label htmlFor="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" value={productoData.descripcion} onChange={handleInputChange} required />

        <label htmlFor="precioUnitarioUSD">Precio Unitario USD:</label>
        <input type="number" id="precioUnitarioUSD" name="precioUnitarioUSD" value={productoData.precioUnitarioUSD} onChange={handleInputChange} required />

        <label htmlFor="precioWPUSD">Precio WP USD:</label>
        <input type="number" id="precioWPUSD" name="precioWPUSD" value={productoData.precioWPUSD} onChange={handleInputChange} required />

        <label htmlFor="iva">IVA:</label>
        <input type="number" id="iva" name="iva" value={productoData.iva} onChange={handleInputChange} required />

        <label htmlFor="categoria">Categoría:</label>
        <input type="text" id="categoria" name="categoria" value={productoData.categoria} onChange={handleInputChange} required />

        <label htmlFor="valorDolar">Valor del Dólar del Día:</label>
        <input type="number" id="valorDolar" name="valorDolar" value={valorDolar} onChange={handleValorDolarChange} required />

        <button type="button" onClick={calcularPrecioPesos}>
          Calcular Precio en Pesos
        </button>

        <label htmlFor="precioPesos">Precio en Pesos:</label>
        <input type="number" id="precioPesos" name="precioPesos" value={precioPesos} readOnly />

        <button type="submit">Guardar Producto</button>
      </form>
      <button
  style={{
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    cursor: 'pointer',
  }}
  onClick={handleNavigateToPaginaPrincipal}
>
  Ir a PaginaPrincipal
</button>

    </div>
  );
}

