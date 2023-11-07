import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append('name', username);
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      });

      const data = await response.json();
      console.log(data);
      if (data.code !== 1) {
        setErrorMessage('El correo o la contraseña son incorrectos');
      } else {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', data.data.name);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  useEffect(() => {
    localStorage.clear();
}, []);

  return (
    <>
    <div className="home-container">
      <div className='login-container'>
        <h1>Iniciar Sesion</h1>
        <div className="error-message">
        {errorMessage && <p style={{ color: 'red',fontSize:"24px" }}>{errorMessage}</p>}
      </div>
        <div className="login-inputs">
          <div>
            <FontAwesomeIcon icon={faUser} style={{fontSize:"24",marginRight:"12px",color:"gray"}}/><input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Nombre de Usuario'
        />
          </div>
          <div>
          <FontAwesomeIcon icon={faKey} style={{fontSize:"24",marginRight:"12px",color:"gray"}}/><input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Contraseña'
        />
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
          <button onClick={handleLogin}>Iniciar Sesion</button>
            <Link to={'/register'}><a>No tengo cuenta</a></Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
