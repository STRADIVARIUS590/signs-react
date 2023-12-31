import React, { useState, useEffect } from 'react';
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
function Home() {

    const [url, setUrl] = useState('');

    useEffect(() => {
        const apiUrl = 'https://diloconsenas.uabcs.net/api/';


        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data.data.image.url);
                setUrl(data.image.url)
            })
            .catch((error) => {
            });
    }, []);

    return (
        <>
            <NavBar />
            <div className="home-container">
                <div className="home-options">
                    <Link to={'/categories'}>
                        <div className="home-options-card-learn">
                            <a><FontAwesomeIcon icon={faBrain} style={{ fontSize: '5rem' }} /></a>
                            <h1>Aprender</h1>

                        </div>
                    </Link>
                    <Link to={'/rules'}>
                        <div className="home-options-card-rules">
                            <a><FontAwesomeIcon icon={faQuestionCircle} style={{ fontSize: '5rem' }} /></a>
                            <h1>Reglas</h1>
                        </div>
                    </Link>
                    
                </div>
                {localStorage.getItem('toke') ? (<div className="home-buttons">
                    <Link to={`/login`}><a className="signin-button">Iniciar Sesion</a></Link>
                    <Link to={'/register'}><a className="register-button">Registrarme</a></Link>
                </div>) : ('')}
            </div>
        </>
    )
}
export default Home;