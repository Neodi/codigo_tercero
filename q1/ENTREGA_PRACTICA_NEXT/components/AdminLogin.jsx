'use client';

import { useState } from 'react';

async function getPassword(emailToFind) {
    const res = await fetch("http://localhost:3000/api/admin");
    const data = await res.json();

    // Buscar el usuario con el correo electrónico específico
    const admin = data.admins.find(admin => admin.email === emailToFind);

    if (admin) {
        console.log(`Contraseña para ${emailToFind}: ${admin.password}`);
        return admin.password;
    } else {
        console.log(`Correo electrónico "${emailToFind}" no encontrado.`);
        return null; // Devolver null si el correo electrónico no se encuentra
    }
}

async function adminLogin(email, password) {
    const passReal = await getPassword(email)

    if (passReal === password) {
        return true
    }
    else {
        throw new Error('Contraseña incorrecta')
    }
    
}

function AdminLogin({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            // Intenta iniciar sesión
            await adminLogin(email, password);
            // Si el inicio de sesión tiene éxito, llama a la función onLoginSuccess
            onLoginSuccess();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-20em">
            <h1 className="text-3xl font-semibold text-gray-700 mb-6">Iniciar sesión</h1>
            {error && <div className='text-red-500 border border-red-400 p-2 mb-4'>{error}</div>}
            <form onSubmit={handleSubmit} className='w-full max-w-sm text-black'>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 p-3 w-full border rounded-md border-black"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-3 w-full border rounded-md border-black placeholder-to-black"
                    required
                />
                <button type="submit" className='w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors'>
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
