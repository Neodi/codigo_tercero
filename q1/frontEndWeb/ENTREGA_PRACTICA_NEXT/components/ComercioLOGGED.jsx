'use client'
import React, { useState, useEffect } from 'react';
import ComentarioCard from './ComentarioCard';


// Comercio individual con su propio formulario de comentarios y puntuación
const ComercioLOGGED = ({ comercio }) => {
    const [comentario, setComentario] = useState('');
    const [puntuacion, setPuntuacion] = useState(0);
    const [userData, setUserData] = useState({});
    const [numeroPuntuaciones, setNumeroPuntuaciones] = useState(0);

    async function getUserData(mail) {
        const email_usuario = "a@a.a";
        const res = await fetch("http://localhost:3000/api/user")
        const data = await res.json()
        const usuarios = data.users;
        const user = usuarios.find(user => user.email === mail)
        // console.log("HOLA DESDE GET USER DATA",user)
        // setUserData(user);
        return user;
    }

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
        setPuntuacion(getPuntuacionesPromedio(comercio.id)); 
        (async () => {
          try {
            const user = await getUserData(localStorage.getItem("email_usuario"));
            // console.log("HOLA DESDE USE EFFECT", user);
            setUserData(user); // Aquí es donde realmente estableces el estado con el valor resuelto
          } catch (error) {
            console.error("Error al cargar los datos del usuario", error);
          }
        })();
      }, []);
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!userData || Object.keys(userData).length === 0) {
            console.error('No se han cargado los datos del usuario');
            return; // Salir de la función si userData no está definido o está vacío
        }
        
        console.log("hola desde handle submit", userData);
        
        const comentarioData = {
            comercioId: comercio.id,
            comentario: comentario,
            puntuacion: puntuacion,
            usuario: userData.username,
            email: userData.email,
            gender: userData.gender,
            city: userData.city,
        };
        
        console.log("Comentario data:", comentarioData);
        
        try {
            const response = await fetch('http://localhost:3000/api/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comentarioData),
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const result = await response.json();
            console.log("Resultado de enviar comentario:", result);
        
            // Restablecer el estado del formulario
            setComentario('');
            setPuntuacion(0);
        
            // Aquí podrías también actualizar el estado para mostrar el nuevo comentario en la lista
            // Por ejemplo: setComments([...comments, result.newComment]);
        } catch (error) {
            console.error('Error al enviar el comentario:', error);
        }
    };
      

  return (
    <li key={comercio.id} className='bg-orange-600 m-5 p-4 rounded-lg shadow-md'>
        <h3 className="text-2xl font-bold text-black mb-3">{comercio.nombre}</h3>
        
        <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
            <div>
                <p className="font-medium text-gray-700">CIF: <span className="font-normal text-gray-600">{comercio.cif}</span></p>
                <p className="font-medium text-gray-700">Dirección: <span className="font-normal text-gray-600">{comercio.direccion}</span></p>
                
                    <p className="font-medium text-gray-700">Email: <span className="font-normal text-gray-600">{comercio.email}</span></p>
                    <p className="font-medium text-gray-700">Teléfono: <span className="font-normal text-gray-600">{comercio.telefono}</span></p>
                
                <p className="font-medium text-gray-700">Ciudad: <span className="font-normal text-gray-600">{comercio.ciudad}</span></p>
            </div>
            <div>
                <p className="font-medium text-gray-700">Actividad: <span className="font-normal text-gray-600">{comercio.actividad}</span></p>
                <p className="font-medium text-gray-700">Título: <span className="font-normal text-gray-600">{comercio.titulo}</span></p>
                <p className="font-medium text-gray-700">Resumen: <span className="font-normal text-gray-600">{comercio.resumen}</span></p>
                <p className="font-medium text-gray-700">Textos: <span className="font-normal text-gray-600">{comercio.textos}</span></p>
                {comercio.fotos && <img src={comercio.fotos} alt="Imagen del Comercio" className="w-full h-auto mt-2 rounded-lg" />}
            </div>
        </div>

        <div className="flex justify-between items-center mt-4">
            <p className="font-bold text-black">Scoring: <span className="font-normal text-black-600">{puntuacion}</span></p>
            <p className="font-bold text-black">Nº puntuaciones: <span className="font-normal text-black-600">{numeroPuntuaciones}</span></p>
        </div>

        <div className="mt-4">
            <p className="font-bold text-black">RESEÑAS:</p>
            <ComentarioCard comercioId={comercio.id} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-md mt-3 text-black">
            <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Añade tu comentario aquí"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="4"
            />
            <div className="flex items-center justify-between ">
                <select
                    value={puntuacion}
                    onChange={(e) => setPuntuacion(e.target.value)}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {[...Array(6).keys()].map(score => (
                        <option key={score} value={score}>{score}</option>
                    ))}
                </select>
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Enviar comentario
                </button>
            </div>
        </form>
    </li>
  );
};

export default ComercioLOGGED;