'use client'

import UserRegister from "@/components/UserRegister";
import UserLogin from "@/components/UserLogin";
import { useState, useEffect } from 'react';
import ListaComerciosUserUNlogged from "@/components/ListaComerciosUserUNlogged";
import ListaComerciosUserLogged from "@/components/ListCommerciosUserLogged";

async function get_Id_Comercios() {
    const res = await fetch("http://localhost:3000/api/id_comercio");
    const data = await res.json();
    console.log(data.id_comercios);
    return data.id_comercios;
}

async function get_Admin_Comercios() {
    const res = await fetch("http://localhost:3000/api/merchant");
    const data = await res.json();
    console.log(data.merchants);
    return data.merchants;
}


export default function User() {
    const [showComponent, setShowComponent] = useState('buttons'); // 'login', 'register', o 'buttons'
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Solo verifica una vez al montar el componente.
        const registered = localStorage.getItem('isRegisteredUser') === 'true';
        setIsAuthenticated(registered);
    }, []); // Dependencias vacías para que solo se ejecute una vez.

    const handleRegisterSuccess = () => {
        localStorage.setItem('isRegisteredUser', 'true');
        setIsAuthenticated(true); // Actualiza el estado aquí.
        setShowComponent('none'); // Puedes establecer esto a 'none' o manejarlo como prefieras.
        console.log('Register success');
    };

    const handleLoginSuccess = () => {
        localStorage.setItem('isRegisteredUser', 'true');
        setIsAuthenticated(true); // Actualiza el estado aquí.
        setShowComponent('none'); // Puedes establecer esto a 'none' o manejarlo como prefieras.
        console.log('Login success');
    };

    const handleLogout = () => {
        localStorage.removeItem('isRegisteredUser'); // Borrar la bandera de autenticación
        localStorage.removeItem('email_usuario'); // Opcional: Borrar el correo electrónico del usuario
        setIsAuthenticated(false); // Actualizar el estado de autenticación
        console.log('Logout successful');
    };

    const displayButtons = () => {
        return (
            <div className="w-3/5">
                <div className="absolute top-0 right-0 mt-4 mr-4 space-x-2">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => setShowComponent('register')}>
                        Registrarse
                    </button>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => setShowComponent('login')}>
                        Iniciar Sesión
                    </button>
                </div>
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Controla el ancho máximo aquí */}
                    <ListaComerciosUserUNlogged />
                </div>
                
            </div>
        );
    };

    const displayRegister = () => {
        return <UserRegister onRegisterSuccess={handleRegisterSuccess} />;
    };

    const displayLogin = () => {
        return <UserLogin onLoginSuccess={handleLoginSuccess} />;
    };

    if (!isAuthenticated) {
        let componentToShow;
        switch(showComponent) {
            case 'buttons': 
                componentToShow = displayButtons();
                break;
            case 'register':
                componentToShow = displayRegister();
                break;
            case 'login':
                componentToShow = displayLogin();
                break;
            default:
                componentToShow = null; // O cualquier otra lógica que quieras implementar cuando no se muestre ningún componente.
        }

        return (
            <div className="relative min-h-screen bg-gray-800 flex items-center justify-center w-full">
                {componentToShow}
            </div>
        );
    } else {
        // Contenido mostrado si el usuario está autenticado.
        return (
            <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white w-full">
                <h1>Login exitoso</h1>
                
                <button 
                    onClick={handleLogout} 
                    className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cerrar Sesión
                </button>
                <ListaComerciosUserLogged/>
            </div>
        );
    }

}
