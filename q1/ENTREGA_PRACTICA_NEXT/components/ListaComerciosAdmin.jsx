import React, { useState, useEffect } from 'react';

import ComercioCardAdmin from './ComercioCardAdmin';

const ListaComerciosAdmin = ({ needsRefresh }) => {
    const [comercios, setComercios] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroCiudad, setFiltroCiudad] = useState('');

    useEffect(() => {
        const fetchComercios = async () => {
            const response = await fetch('/api/merchant');
            const data = await response.json();
            if (data.merchants && Array.isArray(data.merchants)) {
                setComercios(data.merchants);
            } else {
                // Manejar el caso de una respuesta vacía
                setComercios([]);
            }
        };

        fetchComercios();
    }, [needsRefresh]);

    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState(''); // 'error' o 'exito'
    const mostrarMensaje = (mensaje, tipo) => {
        setMensaje(mensaje);
        setTipoMensaje(tipo);
        setTimeout(() => setMensaje(''), 5000); // Limpia el mensaje después de 3 segundos
      };

      const handleDelete = async (comercioId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este comercio?")) {
            try {
                // Eliminar comercio de merchant.txt
                const deleteResponse = await fetch('/api/merchant', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: comercioId }),
                });
    
                if (!deleteResponse.ok) {
                    throw new Error('No se pudo eliminar el comercio.');
                }
    
                // Eliminar ID de id_comercios.txt
                const idDeleteResponse = await fetch('/api/id_comercio', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: comercioId }),
                });
    
                if (!idDeleteResponse.ok) {
                    throw new Error('No se pudo eliminar el ID del comercio.');
                }
    
                mostrarMensaje('Comercio eliminado con éxito.', 'exito');
                setComercios(comercios.filter(comercio => comercio.id !== comercioId));
            } catch (error) {
                console.error(error);
                mostrarMensaje(error.message, 'error');
            }
        }
    };
    
    const getComerciosFiltrados = () => {
        return comercios.filter(comercio => 
            comercio.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
            comercio.ciudad.toLowerCase().includes(filtroCiudad.toLowerCase())
        );
    };

    return (
        <div>
            <div className="flex justify-center my-4 text-black">
                <input
                    type="text"
                    placeholder="Filtrar por nombre"
                    value={filtroNombre}
                    onChange={(e) => setFiltroNombre(e.target.value)}
                    className="p-2 m-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Filtrar por ciudad"
                    value={filtroCiudad}
                    onChange={(e) => setFiltroCiudad(e.target.value)}
                    className="p-2 m-2 border rounded"
                />
            </div>
            {getComerciosFiltrados().map(comercio => (
                <ComercioCardAdmin key={comercio.id} comercio={comercio} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default ListaComerciosAdmin;
