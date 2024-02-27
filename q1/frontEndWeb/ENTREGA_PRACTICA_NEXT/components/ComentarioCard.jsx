import React, { useState, useEffect } from 'react';

const ComentarioCard = ({ comercioId }) => {
  const [comentarios, setComentarios] = useState([]);


  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await fetch('/api/comentarios');
        const data = await response.json();

        // Filtrar comentarios por comercioId
        const comentariosFiltrados = data.comentarios.filter(comentario => comentario.comercioId === comercioId);
        setComentarios(comentariosFiltrados);
         console.log('Comentarios obtenidos:', comentariosFiltrados);
      } catch (error) {
        console.error('Error al obtener comentarios:', error);
      }

       
    };
    
    fetchComentarios();
  }, [comercioId]);

  if (comentarios.length === 0) {
    return <div>No hay Comentarios para este comercio.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comentarios.map((comentario, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md text-black">
            <p><strong>Comentario:</strong> {comentario.comentario}</p>
            <p><strong>Usuario:</strong> {comentario.usuario}</p>
            <p><strong>Email:</strong> {comentario.email}</p>
            <p><strong>Ciudad:</strong> {comentario.city}</p>
            <p><strong>Puntuacion:</strong> {comentario.puntuacion}</p>
            {comentario.gender && <p><strong>Género:</strong> {comentario.gender}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComentarioCard;