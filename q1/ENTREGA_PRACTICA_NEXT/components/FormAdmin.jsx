'use client'

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

const FromAdmin = (props) => {
  const [datosComercio, setDatosComercio] = useState({
    nombre: '',
    cif: '',    // usar el CIF como id no?
    direccion: '',
    email: '',
    telefono: '',
    ciudad: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'error' o 'exito'

  const mostrarMensaje = (mensaje, tipo) => {
    setMensaje(mensaje);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(''), 5000); // Limpia el mensaje después de 3 segundos
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatosComercio({
      ...datosComercio,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Datos del comercio:', datosComercio);

    try {
        // Obtén los comercios existentes
        const response = await fetch('/api/merchant');
        if (!response.ok) {
            throw new Error('Error al obtener comercios.');
        }
        const merchantsData = await response.json();
        const merchants = merchantsData.merchants || []; // Asegura que merchants sea un array, incluso si es vacío

        // Verifica si el CIF, email o teléfono ya están en uso
        const isDuplicate = merchants.some((merchant) =>
            merchant.cif === datosComercio.cif ||
            merchant.email === datosComercio.email ||
            merchant.telefono === datosComercio.telefono
        );

        if (isDuplicate) {
            console.error('El CIF, email o teléfono ya están en uso.');
            mostrarMensaje('El CIF, email o teléfono ya están en uso.', 'error');
            return;
        }
        const id_nuevo = uuidv4();
        // Si no están en uso, crea el comercio
        const createResponse = await fetch('/api/merchant', { // Asegúrate que este endpoint sea el correcto
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...datosComercio, id: id_nuevo }),
        });

        if (createResponse.ok) {
            mostrarMensaje('Comercio registrado exitosamente.', 'exito');
            console.log('Comercio registrado exitosamente.');

            
            const idComercio = { id: id_nuevo }; 

            // Hacer la solicitud a api/id_comercio para guardar el ID del comercio
            const idResponse = await fetch('/api/id_comercio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idComercio),
            });

            if (idResponse.ok) {
                console.log('ID del comercio guardado exitosamente.');
                props.onNewCommerceAdded();// actulizar lista de comercios
            } else {
                console.error('Error al guardar el ID del comercio.');
            }
            
            setDatosComercio({
              nombre: '',
              cif: '',
              direccion: '',
              email: '',
              telefono: '',
              ciudad: '',
              });
              
        } else {
            const errorData = await createResponse.json();
            throw new Error(errorData.message || 'Error al registrar el comercio.');
        }
    } catch (error) {
        console.error(error.message);
        mostrarMensaje(error.message, 'error');
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 text-black">
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre del comercio:
        </label>
        <input
          type="text"
          name="nombre"
          value={datosComercio.nombre}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cif" className="block text-sm font-medium text-gray-700">
          CIF:
        </label>
        <input
          type="text"
          name="cif"
          value={datosComercio.cif}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
          Dirección:
        </label>
        <input
          type="text"
          name="direccion"
          value={datosComercio.direccion}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          E-mail:
        </label>
        <input
          type="email"
          name="email"
          value={datosComercio.email}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
          Teléfono de contacto:
        </label>
        <input
          type="tel"
          name="telefono"
          value={datosComercio.telefono}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
          Ciudad:
        </label>
        <input
          type="text"
          name="ciudad"
          value={datosComercio.ciudad}
          onChange={handleChange}
          className="mt-1 p-2 border rounded-md w-full"
          required
        />
      </div>

      {mensaje && (
        <div className={`mb-4 ${tipoMensaje === 'error' ? 'text-red-500' : 'text-blue-500'}`}>
          {mensaje}
        </div>
      )}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Enviar
      </button>
    </form>
  );
};

export default FromAdmin;
