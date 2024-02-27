import { useState } from 'react';

const FormComercioPUT = ({ id }) => {


  console.log("ID de comercio:", id );
  
  const [comercioData, setComercioData] = useState({
    actividad: '',
    titulo: '',
    resumen: '',
    textos: '',
    fotos: '' // Puedes manejar un array si necesitas subir varias fotos
  });

  const handleChange = (e) => {
    setComercioData({ ...comercioData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Comercio sibudo con éxito. Recarga la información para ver los cambios.");
  };
  async function testPut() {
    try {
      const data = { id , ...comercioData};
      console.log("Data de PUT:", data);
      const response = await fetch("http://localhost:3000/api/id_comercio", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Resultado de PUT:", result);
    } catch (error) {
      console.error("Error en testPut:", error);
    }
  };
  
  const testGET = async (e) => {
    e.preventDefault();
    try {
      // Realiza una solicitud GET en lugar de PUT
      const response = await fetch('/api/id_comercios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log('Todos los comercios:', result);
      // Procesar los resultados como sea necesario
    } catch (error) {
      console.error('Error al obtener los comercios:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <div>
        <label htmlFor="actividad" className="block text-sm font-medium text-gray-700">Actividad</label>
        <input
          type="text"
          name="actividad"
          id="actividad"
          required
          onChange={handleChange}
          value={comercioData.actividad}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          name="titulo"
          id="titulo"
          required
          onChange={handleChange}
          value={comercioData.titulo}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="resumen" className="block text-sm font-medium text-gray-700">Resumen</label>
        <textarea
          name="resumen"
          id="resumen"
          required
          onChange={handleChange}
          value={comercioData.resumen}
          rows={4}
          className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="textos" className="block text-sm font-medium text-gray-700">Textos</label>
        <textarea
          name="textos"
          id="textos"
          required
          onChange={handleChange}
          value={comercioData.textos}
          rows={4}
          className="mt-1 block w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className='text-white'>
        <label htmlFor="fotos" className="block text-sm font-medium text-gray-700">Fotos</label>
        <input
          type="file"
          name="fotos"
          id="fotos"
          onChange={handleChange}
          className="mt-1 block w-full"
        />
      </div>
      
      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => testPut()}>Subir Información</button>
    </form>
  );
};

export default FormComercioPUT;
