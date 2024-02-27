'use client'
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useState } from 'react';

const ComercioPage = () => {
  const router = useRouter();
  const [id, setId] = useState('');

  // Función para redirigir al comercio con el ID ingresado
  const redirectToComercio = () => {
    if (id) {
      router.push(`/Comercios/${id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-xs">
        <h1 className="text-2xl font-bold mb-4">Redirección a Comercio</h1>
        <p className="mb-4">Ingrese el ID del comercio al que desea redirigirse:</p>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID del comercio"
          className="block w-full px-4 py-2 mb-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
        />
        <button
          onClick={redirectToComercio}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Redirigir
        </button>
      </div>
    </div>
  );
};

export default ComercioPage;
