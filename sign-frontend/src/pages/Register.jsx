import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        try {
            const formData = new URLSearchParams();
            formData.append('name', username);
            formData.append('password', password);
            formData.append('email', email);

            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData
            });

            const data = await response.json();
            console.log(data);
            if (data.code !== 1) {
                setErrorMessage('Error al registrarte, intentalo nuevamente');
            } else {
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <>
            {/* <NavBar/> */}
            <div className="home-container">
                <div className='login-container'>
                    <h1>Crea una Cuenta</h1>
                    {errorMessage && <p style={{ color: 'red',fontSize:"24px" }}>{errorMessage}</p>}
                    <div className="login-inputs">
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "24", marginRight: "12px", color: "gray" }} /><input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Correo Electronico'
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faUser} style={{ fontSize: "24", marginRight: "12px", color: "gray" }} /><input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Nombre de Usuario'
                            />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faKey} style={{ fontSize: "24", marginRight: "12px", color: "gray" }} /><input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Contraseña'
                            />
                        </div>

                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <button onClick={handleRegister}>Crear Cuenta</button>
                        <Link to={'/login'}><a>Ya tengo una cuenta</a></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
