import React from 'react';

const ComercioCardAdmin = ({ comercio, onDelete }) => {
    return (
        <div className="border border-slate-900 p-4 bg-white shadow rounded-lg">
            <ul className="text-black">
                <li className="text-2xl"><strong>Nombre:</strong> {comercio.nombre}</li>
                <li><strong>CIF:</strong> {comercio.cif}</li>
                <li><strong>Dirección:</strong> {comercio.direccion}</li>
                <li><strong>Email:</strong> {comercio.email}</li>
                <li><strong>Teléfono:</strong> {comercio.telefono}</li>
                <li><strong>Ciudad:</strong> {comercio.ciudad}</li>
                <li><strong>ID:</strong> {comercio.id}</li>
            </ul>
            <button 
                onClick={() => onDelete(comercio.id)}
                className="mt-4 bg-red-500 text-white p-2 rounded-md"
            >
                Eliminar
            </button>
        </div>
    );
};

export default ComercioCardAdmin;
