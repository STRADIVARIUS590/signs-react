import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import Spinner from 'react-bootstrap/Spinner';

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function Game() {
    const randomColor1 = getRandomColor();
    const randomColor2 = getRandomColor();
    const randomColor3 = getRandomColor();
    const randomColor4 = getRandomColor();

    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        // Simula un tiempo de carga de 1 segundo
        setTimeout(() => {
            setShowLoader(false);
        }, 1500);
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

    return (
        <>
            {showLoader ? (
                <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <Spinner animation="border" variant="success" />
                </div>
            ) : (
                <div className="game-body-container">
                    <FontAwesomeIcon icon={faBackward} className='go-back-button' onClick={handleGoBackClick} />
                    <div className="game-body">
                        <img src="http://localhost:8000/storage/a.png" alt="" />
                        <h1>¿Que significa esta seña?</h1>
                        <div className="game-options">
                            <button style={{ backgroundColor: randomColor1 }}>Opcion 1</button>
                            <button style={{ backgroundColor: randomColor2 }}>Opcion 2</button>
                            <button style={{ backgroundColor: randomColor3 }}>Opcion 3</button>
                            <button style={{ backgroundColor: randomColor4 }}>Opcion 4</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Game;
