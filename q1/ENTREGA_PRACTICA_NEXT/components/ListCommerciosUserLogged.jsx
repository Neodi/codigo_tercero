import React, { useState, useEffect } from 'react';

import ComercioLOGGED from './ComercioLOGGED';

async function getIdComercios() {
  const res = await fetch("http://localhost:3000/api/id_comercio");
  const data = await res.json();
  return data.id_comercios;
}

async function getAdminComercios() {
  const res = await fetch("http://localhost:3000/api/merchant");
  const data = await res.json();
  return data.merchants;
}

const ListaComerciosUserLOGGED = () => {
  const [comerciosCombinados, setComerciosCombinados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [puntuacion, setPuntuacion] = useState(0);
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Obtener los datos de ambas APIs.
        const idComercios = await getIdComercios();
        const adminComercios = await getAdminComercios();

        // Combinar los comercios que tienen un ID común en ambas listas.
        const comerciosConInfoAdmin = idComercios.reduce((acc, comercio) => {
          const adminComercio = adminComercios.find(admin => admin.id === comercio.id);
          if (adminComercio) {
            // Si encontramos un admin con el mismo ID, combinamos la información.
            acc.push({ ...comercio, ...adminComercio });
          }
          return acc;
        }, []);

        setComerciosCombinados(comerciosConInfoAdmin);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  if (comerciosCombinados.length === 0) {
    return <div>No hay comercios comunes.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí deberías implementar la lógica para enviar el comentario y la puntuación a tu API
    // Por ejemplo, podrías hacer un POST a tu endpoint de API con los datos
    console.log(`Comentario: ${comentario}, Puntuación: ${puntuacion}`);
    // Restablecer los estados
    setComentario('');
    setPuntuacion(0);
  };

  return (
    <div className='w-full'>
      <ul>
        {comerciosCombinados.map(comercio => (
          <ComercioLOGGED key={comercio.id} comercio={comercio} />
        ))}
      </ul>
    </div>
  );
  
};

export default ListaComerciosUserLOGGED;
