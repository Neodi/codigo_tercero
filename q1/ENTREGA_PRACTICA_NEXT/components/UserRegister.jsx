import { useState, useEffect } from 'react';

async function getUsers() {
    const res = await fetch("http://localhost:3000/api/user");
    const data = await res.json();
    return data.users;
}

function UserRegister({ onRegisterSuccess }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [wantsInformation, setWantsInformation] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const usersFetched = await getUsers();
            setUsers(usersFetched || []);
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (users.some(user => user.email === email)) {
            setError('El email ya está en uso.');
            return;
        }

        const response = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, age, gender, city, wantsInformation }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('email_usuario', email);
            onRegisterSuccess();
        } else {
            console.log(data);
        }
    };

    return (
        <div className=" bg-gray-100 flex items-center justify-center text-black">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-xl font-bold mb-4">Registro de Usuario</h1>
                {error && <div className="text-red-600">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        placeholder="Edad"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Selecciona tu sexo</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Ciudad"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <div>
                        <input
                            type="checkbox"
                            checked={wantsInformation}
                            onChange={(e) => setWantsInformation(e.target.checked)}
                        />
                        <label>¿Deseas recibir información?</label>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Registrar</button>
                </form>
            </div>
        </div>
    );
}

export default UserRegister;
