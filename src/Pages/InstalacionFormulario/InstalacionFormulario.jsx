import React, { useState } from 'react';
import axios from 'axios';
import './InstalacionFormulario.css';
import { useNavigate } from 'react-router-dom';

const InstalacionFormulario = () => {
    const [clienteInfo, setClienteInfo] = useState({
        nombreCompleto: '',
        direccion: '',
    });
    const navigate = useNavigate();

    const [instalacionInfo, setInstalacionInfo] = useState({
        fechaInicio: '',
        tipoInstalacion: '',
        presupuestoEstimado: '',
        detallesDeCostos: '',
    });

    const [datosCalculo, setDatosCalculo] = useState([]);

    const handleClienteChange = (e) => {
        setClienteInfo({
            ...clienteInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleInstalacionChange = (e) => {
        setInstalacionInfo({
            ...instalacionInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/instalacion', {
                nombreCompleto: clienteInfo.nombreCompleto,
                direccion: clienteInfo.direccion,
                fechaInicio: instalacionInfo.fechaInicio,
                tipoInstalacion: instalacionInfo.tipoInstalacion,
                presupuestoEstimado: instalacionInfo.presupuestoEstimado,
                detallesDeCostos: instalacionInfo.detallesDeCostos,
            });


            // Si la respuesta es exitosa, actualiza el estado datosCalculo
            if (response.status === 201) {
                const fechaFormateada = new Date(response.data.instalacion.fechaInicio).toISOString().split('T')[0];
                setDatosCalculo([...datosCalculo, { ...response.data.instalacion, fechaInicio: fechaFormateada }]);
            } else {
                console.error('Error al enviar formulario:', response.data.message);
            }
            setClienteInfo({
                nombreCompleto: '',
                direccion: '',
            });

            setInstalacionInfo({
                fechaInicio: '',
                tipoInstalacion: '',
                especificacionesElectricas: '',
                detallesTecnicosOtros: '',
                presupuestoEstimado: '',
                detallesDeCostos: '',
            });
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        }
    };
    const handleEliminarInstalacion = async (id) => {
        try {
            // Envía una solicitud DELETE al servidor para eliminar la instalación
            const response = await axios.delete(`http://localhost:8000/instalacion/${id}`);

            // Verifica si la eliminación fue exitosa (status 200)
            if (response.status === 200) {
                // Filtra las instalaciones para excluir la instalación eliminada
                const nuevasInstalaciones = datosCalculo.filter(instalacion => instalacion._id !== id);

                // Actualiza el estado con las nuevas instalaciones
                setDatosCalculo(nuevasInstalaciones);
            } else {
                console.error('Error al eliminar la instalación:', response.data.message);
            }
        } catch (error) {
            console.error('Error al eliminar la instalación:', error);
        }
    };


    return (
        <div className='divForm'>
            <form className='formInstalacion' onSubmit={handleSubmit}>
                <h1>Instalacion</h1>
                <label>
                    Nombre Completo:
                    <input
                        type="text"
                        name="nombreCompleto"
                        value={clienteInfo.nombreCompleto}
                        onChange={handleClienteChange}
                        required
                    />
                </label>
                <label>
                    Dirección de Instalación:
                    <input
                        type="text"
                        name="direccion"
                        value={clienteInfo.direccion}
                        onChange={handleClienteChange}
                        required
                    />
                </label>
                <label>
                    Fecha de Inicio de Instalación:
                    <input
                        type="date"
                        name="fechaInicio"
                        value={instalacionInfo.fechaInicio}
                        onChange={handleInstalacionChange}
                        required
                    />
                </label>
                <label>
                    Tipo de Instalación:
                    <select
                        name="tipoInstalacion"
                        value={instalacionInfo.tipoInstalacion}
                        onChange={handleInstalacionChange}
                        required
                    >
                        <option value="">Seleccione el tipo de instalación</option>
                        <option value="Paneles Solares">Paneles Solares</option>
                        <option value="Inversores">Inversores</option>
                        <option value="Baterías de Litio">Baterías de Litio</option>
                        <option value="Termotanques">Termotanques</option>
                        <option value="Climatizadores">Climatizadores</option>
                        <option value="Bombas">Bombas</option>
                    </select>
                </label>
                {/* Presupuesto Estimado y Detalles de Costos */}
                <label className='mover'>
                    Presupuesto Estimado:
                    <input
                        type="number"  // Cambiado a type "number" para coincidir con el tipo en el backend
                        name="presupuestoEstimado"
                        value={instalacionInfo.presupuestoEstimado}
                        onChange={handleInstalacionChange}
                    />
                </label>
                <label className='mover'>
                    Detalles de Costos (materiales, mano de obra, etc.):
                    <textarea
                        className='agrandar'
                        name="detallesDeCostos"
                        value={instalacionInfo.detallesDeCostos}
                        onChange={handleInstalacionChange}
                    />
                </label>
                <button className='chico' type="submit">Enviar Formulario</button>
            </form>
            <div className='izquierda'>
                <div className='tablaInst' style={{ marginLeft: '20px' }}>
                    <h1>Datos del Formulario</h1>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Nombre Completo</th>
                                <th>Dirección</th>
                                <th>Fecha de Inicio</th>
                                <th>Tipo de Instalación</th>
                                <th>Presupuesto Estimado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosCalculo.map((instalacion, index) => (
                                <tr key={index}>
                                    <td>{instalacion.nombreCompleto}</td>
                                    <td>{instalacion.direccion}</td>
                                    <td>{instalacion.fechaInicio}</td>
                                    <td>{instalacion.tipoInstalacion}</td>
                                    <td>{instalacion.presupuestoEstimado}</td>
                                    <td className='boton'>
                                        <button onClick={() => handleEliminarInstalacion(instalacion._id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='boton-navegar'>
                    <button onClick={() => navigate('/PaginaPrincipal')}>Ir a PaginaPrincipal</button>
                </div>
            </div>
        </div>
    );
};

export default InstalacionFormulario;


