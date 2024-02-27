import React, { useState, useEffect } from 'react';

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

const ListaComerciosUserUNlogged = () => {
  const [comerciosCombinados, setComerciosCombinados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [puntuacion, setPuntuacion] = useState(0);
  const [numeroPuntuaciones, setNumeroPuntuaciones] = useState(0);

  async function getPuntuacionesPromedio(id) {
      try {
          const res = await fetch("http://localhost:3000/api/comentarios");
          const data = await res.json();
          const comentarios = data.comentarios;
          const comentariosDelComercio = comentarios.filter(comentario => comentario.comercioId === id);

          let sumaPuntuaciones = 0;
          comentariosDelComercio.forEach(comentario => {
              // Convierte la puntuacion a un número antes de sumar
              sumaPuntuaciones += parseInt(comentario.puntuacion, 10);
          });
          setNumeroPuntuaciones(comentariosDelComercio.length);
          const promedio = comentariosDelComercio.length > 0 ? sumaPuntuaciones / comentariosDelComercio.length : 0;
          console.log("Puntuación promedio para el comercioId", id, ":", promedio);

          return promedio;
      } catch (error) {
          console.error('Error al obtener puntuaciones:', error);
          return 0;
      }
  }

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

  return (
    <div className='text-black'>
      <ul className="space-y-5">
        {comerciosCombinados.map((comercio) => (
          <li key={comercio.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-orange-600">{comercio.nombre}</h3>
              <p><strong>CIF:</strong> {comercio.cif}</p>
              <p><strong>Dirección:</strong> {comercio.direccion}</p>
              <div className="flex justify-between items-center">
                <p><strong>Email:</strong> {comercio.email}</p>
                <p><strong>Teléfono:</strong> {comercio.telefono}</p>
              </div>
              <p><strong>Ciudad:</strong> {comercio.ciudad}</p>
              <p><strong>Actividad:</strong> {comercio.actividad}</p>
              <p><strong>Título:</strong> {comercio.titulo}</p>
              <p><strong>Resumen:</strong> {comercio.resumen}</p>
              <p><strong>Textos:</strong> {comercio.textos}</p>
              {comercio.fotos && (
                <img src={comercio.fotos} alt="Imagen del Comercio" className="w-full h-auto rounded"/>
              )}
              <div className="flex justify-between items-center">
                <p><strong>Scoring:</strong> {comercio.scoring}</p>
                <p><strong>Nº Puntuaciones:</strong> {comercio.nPuntuaciones}</p>
              </div>
              <p className="text-blue-500 font-semibold">Reseñas: Tienes que estar Registrado</p>
            </div>
          </li>
        ))}
      </ul>
    </div>

  );
  
};

export default ListaComerciosUserUNlogged;
