import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faKey } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      // if (data.success) {
      //   alert('Inicio de sesión exitoso');
      // } else {
      //   alert('Credenciales incorrectas');
      // }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <>
    {/* <NavBar/> */}
    <div className="home-container">
      <div className='login-container'>
        <h1>Iniciar Sesion</h1>
        <div className="login-inputs">
          <div>
            <FontAwesomeIcon icon={faUser} style={{fontSize:"24",marginRight:"12px"}}/><input type="text" placeholder='Correo Electronico' />
          </div>
          <div>
          <FontAwesomeIcon icon={faKey} style={{fontSize:"24",marginRight:"12px",color:"gray"}}/><input type="password" placeholder='Contraseña'/>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
          <button>Iniciar Sesion</button>
            <a >No tengo cuenta</a>
        </div>
      </div>
    </div>
    </>
    // <div>
    //   <h2>Iniciar sesión</h2>
    //   <div>
    //     <label>Usuario:</label>
    //     <input
    //       type="text"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <label>Contraseña:</label>
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div>
    //   <button onClick={handleLogin}>Iniciar sesión</button>
    // </div>
  );
};

export default Login;
