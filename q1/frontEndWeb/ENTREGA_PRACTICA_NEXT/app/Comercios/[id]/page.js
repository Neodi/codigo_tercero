"use client"
import {useParams} from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import FormComercio from '@/components/FormComercioPUT';
import MostrarComercioID from '@/components/MostrarComercioID';
const Comercio = () => {

    const [comentarios, setComentarios] = useState([]);
    const router = useRouter();
    const params = useParams()
    //console.log("params"+params)
    const  id  = params.id;
    //console.log("od"+id)
    const [recarga, setRecarga] = useState(0); // Este es el trigger de recarga

    const recargarComercio = () => {
        setRecarga(prev => prev + 1); // Cada vez que quieras recargar, incrementa este estado
    };//

    useEffect(() => {
        const fetchComentarios = async () => {
          try {
            const response = await fetch('/api/comentarios');
            const data = await response.json();
    
            // Filtrar comentarios por comercioId
            const comentariosFiltrados = data.comentarios.filter(comentario => comentario.comercioId === id);
            setComentarios(comentariosFiltrados);
            // console.log('Comentarios obtenidos:', comentariosFiltrados);
          } catch (error) {
            console.error('Error al obtener comentarios:', error);
          }
    
           
        };
        
        fetchComentarios();
      }, [id]);

      const handleDeleteComercio = async () => {
        const id_DELETE = id;
        console.log(id_DELETE)
        
        if (window.confirm("¿Estás seguro de que quieres eliminar este comercio?")) {
            try {
                // Eliminar comercio de merchant.txt
                const deleteResponse = await fetch('/api/id_comercio', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: id_DELETE }),
                });
    
                if (!deleteResponse.ok) {
                    throw new Error('No se pudo eliminar el comercio.');
                }
    
                // Mostrar un mensaje de éxito con alert
                alert('Comercio eliminado con éxito de todos los ficheros.');
                router.push('/Comercios'); 
            } catch (error) {
                console.error(error);
                // Mostrar un mensaje de error con alert
                alert(`Error al eliminar el comercio: ${error.message}`);
            }
        }
        
    };
    

    return (
        <div >
            <div className="flex flex-col items-center justify-center min-h-screen  p-6">
            <h1 className="text-3xl font-bold mb-4">ID de tu comercio: {id}</h1>
            <button 
                className='w-1/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-3' 
                onClick={handleDeleteComercio}
            >
                Borrar Comercio
            </button>
            <FormComercio id={id} />
            <button className='w-1/4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3' onClick={recargarComercio}>Recargar Información del Comercio</button>
            
            </div>
            <MostrarComercioID  id={id} recarga={recarga} />
            <div className='mt-3'>
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
        </div>
    );
};

export default Comercio;
