'use client'
import { useState, useEffect } from 'react';
import AdminRegister from '@/components/AdminRegister';
import AdminLogin from '@/components/AdminLogin';
import FormAdmin from '@/components/FormAdmin';

import ListaComerciosAdmin from '@/components/ListaComerciosAdmin';

async function getComercios() {
    const res = await fetch("http://localhost:3000/api/merchant");
    const data = await res.json();
    return data.merchants;
}

function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        alert('Login success');
    };

    const handleRegisterSubmit = () => {
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        alert('Register success');
    };

    const handleRegisterClick = () => {
        setShowRegister(true);
        setShowLogin(false);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegister(false);
    };

    const handleBackClick = () => {
        setShowRegister(false);
        setShowLogin(false);
    };

    // Esto ayuda a gestionar la lista de comercios

    const [needsRefresh, setNeedsRefresh] = useState(false);

    const handleNewCommerceAdded = () => {
        setNeedsRefresh(true);
    };

    useEffect(() => {
        if (needsRefresh) {
            // Recargo la lista de comercios
            setNeedsRefresh(false);
        }
    }, [needsRefresh]);

    const handleDelete = async (comercioId) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este comercio?")) {
            try {
                const response = await fetch('/api/merchant', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: comercioId }),
                });
    
                if (!response.ok) {
                    throw new Error('No se pudo eliminar el comercio.');
                }
    
                mostrarMensaje('Comercio eliminado con éxito.', 'exito');
                // Aquí debes también actualizar el estado para reflejar que el comercio ha sido eliminado
            } catch (error) {
                console.error(error);
                mostrarMensaje(error.message, 'error');
            }
        }
    };
    
    if (isAuthenticated === false) {
        return (
            <div className="container mx-auto my-8 p-6 max-w-sm border rounded shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Admin Page Un-Logged</h1>
                {!showRegister && !showLogin && (
                    <div className="flex justify-around">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRegisterClick}>
                            Registrarte
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleLoginClick}>
                            Iniciar Sesión
                        </button>
                    </div>
                )}
                {showRegister && <AdminRegister onRegisterSuccess={handleRegisterSubmit} onBack={handleBackClick} />}
                {showLogin && <AdminLogin onLoginSuccess={handleLoginSuccess} onBack={handleBackClick} />}
            </div>
        );
    } else {
        return (
            <div>
                <div className="container mx-auto my-8 p-6 max-w-lg border rounded shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Admin Page Logged</h1>
                    <FormAdmin onNewCommerceAdded={() => setNeedsRefresh(true)} />
                    
                </div>
                <div className='container mx-auto'>
                    <ListaComerciosAdmin needsRefresh={needsRefresh} />
                </div>

            </div>
        );
    }
}

export default AdminPage;
