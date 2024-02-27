'use client'
import { useEffect, useState } from 'react';

import FormComercio from '@/components/FormComercioPUT';
import MostrarComercioID from '@/components/MostrarComercioID';
import ListaComerciosUserLOGGED from '@/components/ListCommerciosUserLogged';

async function getUsers() {
    const res = await fetch("http://localhost:3000/api/user")
    const data = await res.json()
    console.log(data.users)
    return data.users
}

async function getAdmins() {
    const res = await fetch("http://localhost:3000/api/admin")
    const data = await res.json()
    console.log(data.admins)
    return data.admins
}


async function getComercios() {
    const res = await fetch("http://localhost:3000/api/id_comercio")
    const data = await res.json()
    console.log(data.id_comercios)
    return data.id
}


  
async function getUserData( email) {
  
  const res = await fetch("http://localhost:3000/api/user")
  const data = await res.json()
  const user = data.users.find(user => user.email === email)
  console.log(user)
  return user;
}



// Dentro de tu componente Home o donde necesites usar esta función

async function testPut(id) {
    try {
      const data = { id, palabra: "hola" };
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
  }

  /*
    const id = "82c03130-dee2-4e16-951e-fddb75c95997";

            <FormComercio id={id} />
            <button className='bg-green-800' onClick={recargarComercio}>Recargar Información del Comercio</button>
            <MostrarComercioID id={id} recarga={recarga} />
            */
export default function Trucos() {


    
    useEffect(() => {
        // const users = getUsers();
        // const admins = getAdmins();
        // const comercios = getComercios();
        // const userData = getUserData(localStorage.getItem("email_usuario"));
    }, []);

    const [recarga, setRecarga] = useState(0); // Este es el trigger de recarga

    const recargarComercio = () => {
        setRecarga(prev => prev + 1); // Cada vez que quieras recargar, incrementa este estado
    };

    return(
        // un boton que borre los datos de localstorage
        <div>
            <h1>Trucos</h1>
            <button className="bg-pink-500" onClick={() => localStorage.clear()}>Borrar localStorage</button>
            <button className="bg-green-500" onClick={() => handleSubmit}>Test Función</button>
            <button className="bg-blue-500" onClick={() => testPut("82c03130-dee2-4e16-951e-fddb75c95997")}>Test PUT Función</button>

            <div>
                F12 para usuarios


            </div>
            {/*<ListaComerciosUserLOGGED /> */} 
        </div>
    )


}