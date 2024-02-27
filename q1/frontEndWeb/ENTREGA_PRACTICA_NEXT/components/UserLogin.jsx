import { useState, useEffect } from 'react';

async function getPassword(emailToFind) {
    const res = await fetch("http://localhost:3000/api/user");
    const data = await res.json();

    // Buscar el usuario con el correo electrónico específico
    const user = data.users.find(user => user.email === emailToFind);

    if (user) {
        console.log(`Contraseña para ${emailToFind}: ${user.password}`);
        return user.password;
    } else {
        console.log(`Correo electrónico "${emailToFind}" no encontrado.`);
        return null; // Devolver null si el correo electrónico no se encuentra
    }
}

async function login(email, password) {
    const passReal = await getPassword(email)

    if (passReal === password) {
        return true
        localStorage.setItem('email', email); 
    }
    else {
        throw new Error('Contraseña incorrecta')
    }
    
}


function UserLogin({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            // Intenta iniciar sesión
            await login(email, password);
            // Si el inicio de sesión tiene éxito, llama a la función onLoginSuccess
            console.log(email, password)
            console.log('Login success');  
            localStorage.setItem('email_usuario', email);

            onLoginSuccess();
        } catch (err) {
            console.log('Login error');
            setError(err.message);
        }
    };

    return (
        <div className=" bg-gray-100 flex items-center justify-center text-black">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
            {error && <div className="text-red-600">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Iniciar sesión</button>
            </form>
          </div>
        </div>
      );
    }
export default UserLogin;
