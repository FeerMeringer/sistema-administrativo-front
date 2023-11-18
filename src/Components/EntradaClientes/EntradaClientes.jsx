import React, { useState } from 'react';
import axios from 'axios';
import './EntradaClientes.css';
import { useNavigate } from 'react-router-dom';

const EntradaClientes = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        direccion: '',
        tipo: [],
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevFormData) => {
            if (type === 'checkbox') {
                // Manejar el cambio en las opciones del tipo
                const updatedTipo = checked
                    ? [...prevFormData.tipo, value]
                    : prevFormData.tipo.filter((option) => option !== value);

                return {
                    ...prevFormData,
                    tipo: updatedTipo,
                };
            } else {
                // Manejar el cambio en otros campos
                return {
                    ...prevFormData,
                    [name]: value,
                };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Datos del formulario:', formData);
            const response = await axios.post('https://sistema-back-f5xx.onrender.com/clientes', formData);

            if (response.data.success) {
                console.log('Datos enviados con éxito');
                navigate('/ListaClientes');
                // Puedes redirigir al usuario a otra página o realizar otras acciones después del envío exitoso.
            } else {
                console.error('Error al enviar datos:', response.data.error);
                // Puedes manejar errores aquí, como mostrar un mensaje al usuario.
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className='mi'>
            <h1 className='Entrada'>Entrada de Clientes</h1>
            <form className='formEntrada' onSubmit={handleSubmit}>
                <div className='tipo1' >
                    <label >Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Correo:</label>
                    <input
                        type="text"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Tipo:</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="tipo"
                                value="instalacion"
                                checked={formData.tipo.includes('instalacion')}
                                onChange={handleChange}
                            />
                            Instalación
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="tipo"
                                value="venta"
                                checked={formData.tipo.includes('venta')}
                                onChange={handleChange}
                            />
                            Venta
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                name="tipo"
                                value="presupuesto"
                                checked={formData.tipo.includes('presupuesto')}
                                onChange={handleChange}
                            />
                            Presupuesto
                        </label>
                    </div>
                </div>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default EntradaClientes;


