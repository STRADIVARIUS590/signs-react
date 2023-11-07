import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';



function Game() {
    const [data, setData] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(0); // Estado para rastrear imágenes cargadas
    const [showLoader, setShowLoader] = useState(true);
    const [token, setToken] = useState("");
    const [count, setCount] = useState(1);
    const [aciertos, setAciertos] = useState(0);
    const [errores, setErrores] = useState(0);
    const url = window.location.pathname;
    const segments = url.split("/");
    const ultimoValor = segments[segments.length - 1];

    useEffect(() => {
        // Simula un tiempo de carga de 1 segundo
        setTimeout(() => {
            setShowLoader(false);
        }, 1000);
    }, []);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`http://localhost:8000/api/game/${ultimoValor}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);
                setData(result.data);
                setAnswers(result.data.options);
                setToken(result.data.meta.token)
                console.log(result);
            })
            .catch(error => console.log('error', error));
    }, []);

    const handleGoBackClick = () => {
        Swal.fire({
            title: '¿Estás seguro que quieres regresar?',
            text: 'Tu progreso se perderá',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, regresar',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'red-button',
                cancelButton: 'gray-button',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                window.history.back(); // Ejemplo de redirección hacia atrás
            }
        });
    };

    // Función para manejar la solicitud POST
    const handlePost = (answerId) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

        var raw = JSON.stringify({
            "token": token,
            "answer_id": answerId,
            "finnished": (count === (localStorage.getItem("numPreguntas") - 1))
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch("http://localhost:8000/api/game", requestOptions)
            .then(response => response.json())
            .then(result => {
                (result.data.meta.correct > aciertos ? (Swal.fire({
                    icon: 'success',
                    title: 'Respuesta correcta',
                    showConfirmButton: false,
                    timer: 1500
                })) : (Swal.fire({
                    icon: 'error',
                    title: 'Respuesta incorrecta',
                    showConfirmButton: false,
                    timer: 1500
                })))
                setData(result.data);
                setAnswers(result.data.options);
                setToken(result.data.meta.token)
                setAciertos(result.data.meta.correct)
                setErrores(result.data.meta.incorrect)
                setCount(count + 1)
                count >= localStorage.getItem('numPreguntas') ? (
                    Swal.fire({
                        title: 'Juego finalizado',
                        text: "Haz obtenido una puntuacion de " + result.data.meta.correct + ' aciertos',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Continuar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/categories"
                        }
                    })) : ('')
            })
            .catch(error => console.log('error', error));
    };

    // Función para manejar la carga de imágenes
    const handleImageLoad = () => {
        setImagesLoaded(imagesLoaded + 1);

        // Verifica si todas las imágenes se han cargado
        if (imagesLoaded === answers.length - 1) {
            setShowLoader(false);
        }
    };

    return (
        <>
            {showLoader ? (
                <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <Spinner animation="border" variant="success" />
                </div>
            ) : (
                <div className="game-body-container">
                    <FontAwesomeIcon icon={faBackward} className='go-back-button' onClick={handleGoBackClick} />
                    <div className="score">
                        <h1>Pregunta actual : {count}</h1>
                        <h2>Aciertos: {aciertos}</h2>
                        <h2>Errores: {errores}</h2>
                    </div>
                    <div className="game-body">
                        <h1>{data.question.text + '?'}</h1>
                        <div className="game-options">
                            {answers.map((option) => (
                                <img
                                    key={option.id}
                                    src={option.images[0].url}
                                    alt=""
                                    onClick={() => handlePost(option.id)}
                                    onLoad={handleImageLoad}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}


export default Game;