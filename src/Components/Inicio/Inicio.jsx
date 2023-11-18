import React, { useState } from 'react';
import axios from 'axios';
import './Inicio.css';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  

  const navigate = useNavigate(); // Obtenemos la función de navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://sistema-back-f5xx.onrender.com/auth/signin', formData);
  
      if (response.status === 200) {
        navigate('/PaginaPrincipal'); // Redirigimos al usuario a la página principal
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      console.error('Error de respuesta:', error.response.data);
    }
  };
  

  return (
    <div className="inicio">
      <img className='foto' src="https://i.imgur.com/RgqM0CU.png" alt="Descripción de la imagen" />

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}



