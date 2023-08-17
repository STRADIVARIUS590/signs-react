import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('name', username);
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <>
        </>
        // <div>
        //     <h2>Registro de usuario</h2>
        //     <div>
        //         <label>Usuario:</label>
        //         <input
        //             type="text"
        //             value={username}
        //             onChange={(e) => setUsername(e.target.value)}
        //         />
        //     </div>
        //     <div>
        //         <label>Contraseña:</label>
        //         <input
        //             type="password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //     </div>
        //     <div>
        //         <label>Email:</label>
        //         <input
        //             type="email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //         />
        //     </div>
        //     <button onClick={handleRegister}>Registrarse</button>
        // </div>
    );
};

export default Register;
