import { useState, useEffect } from 'react';

async function getAdmins() {
    const res = await fetch("http://localhost:3000/api/admin"); 
    const data = await res.json();
    return data.admins;
}

function AdminRegister({ onRegisterSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdmins = async () => {
            const adminsFetched = await getAdmins();
            setAdmins(adminsFetched || []);
        };
        fetchAdmins();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (admins.some(admin => admin.email === email)) {
            setError('El email ya está en uso.');
            return;
        }

        const response = await fetch('/api/admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            onRegisterSuccess();
        } else {
            console.log(data);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-20em">
            <h1 className="text-3xl font-semibold text-gray-700 mb-6">Registro de Administrador</h1>
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
                    className="mb-4 p-3 w-full border rounded-md border-black placeholder:to-black"
                    required
                />
                <button type="submit" className='w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors'>
                    Registrar como Administrador
                </button>
            </form>
        </div>
    );
    
}

export default AdminRegister;
