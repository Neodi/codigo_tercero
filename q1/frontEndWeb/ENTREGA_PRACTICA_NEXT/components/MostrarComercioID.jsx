import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';

const MostrarComercioID = ({ id, recarga }) => {
  const [comercio, setComercio] = useState(null);

  useEffect(() => {
    const obtenerComercio = async () => {
      try {
        const respuesta = await fetch(`http://localhost:3000/api/id_comercio/`);
        if (!respuesta.ok) {
          throw new Error('No se pudo obtener la información del comercio');
        }
        const datos = await respuesta.json();
        console.log('Datos de comercios:', datos); // Verifica si esto es un objeto con una propiedad id_comercios
  
        const datos_Comercio_ID = datos.id_comercios.find((comercio) => comercio.id === id);
        console.log('Datos del comercio:', datos_Comercio_ID);
        setComercio(datos_Comercio_ID);
      } catch (error) {
        console.error('Error al obtener datos del comercio:', error);
      }
    };
  
    obtenerComercio();
  }, [id, recarga]);
  
  

  if (!comercio) {
    return <div className="text-center py-4">Cargando información del comercio...</div>;
  }

  return (
    <div className="max-w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-5 p-4">
      <h2 className="text-lg font-semibold text-gray-800">Información del Comercio</h2>
      <div className="space-y-2 mt-3 text-black">
        <p><strong>ID:</strong> {comercio.id}</p>
        <p><strong>Actividad:</strong> {comercio.actividad}</p>
        <p><strong>Título:</strong> {comercio.titulo}</p>
        <p><strong>Resumen:</strong> {comercio.resumen}</p>
        <p><strong>Textos:</strong> {comercio.textos}</p>
        {/* Si tienes un campo de imagen, aquí podrías incluir una imagen */}
        {comercio.fotos && <img src={comercio.fotos} alt="Imagen del Comercio" className="w-full h-auto"/>}
        <p className='text-lg font-semibold text-gray-800'>NO MODIFICABLES</p>
        <p><strong>Scoring:</strong> {comercio.scoring}</p>
        <p><strong>Número de puntuaciones:</strong> {comercio.nPuntuaciones}</p>
        <p><strong>Reseñas:</strong> {comercio.reseñas}</p>
      </div>
    </div>
  );
  
};

export default MostrarComercioID;
