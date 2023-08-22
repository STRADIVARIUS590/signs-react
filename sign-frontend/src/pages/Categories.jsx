import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavBar from '../components/NavBar';

function Example() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [OffcanvasData, setOffcanvasData] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setActiveCategoryId(id);
    };

    useEffect(() => {
        const apiUrl = 'http://localhost:8000/api/categories';
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json();
            })
            .then((data) => {
                setData(data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (activeCategoryId !== null) {
            const apiUrl = `http://localhost:8000/api/categories/${activeCategoryId}`;
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('La solicitud no fue exitosa');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data.data);
                    setOffcanvasData(data.data);
                    setShow(true); // Abre el Offcanvas después de cargar los datos de la categoría
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [activeCategoryId]);

    return (
        <>
        <NavBar/>
        <div className='categorie-body-container'>
            
            {data.map((categorie) => (
                <div className='categorie-card' key={categorie.id} onClick={() => handleShow(categorie.id)}>
                    <h1>{categorie.name}</h1>
                </div>
            ))}
        </div>
        {activeCategoryId !== null && (
            <Offcanvas show={show} onHide={handleClose} placement='end' >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{OffcanvasData.name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* <img src={OffcanvasData[0]} alt="" /> */}
                </Offcanvas.Body>
            </Offcanvas>
        )}
        </>
    );
}

export default Example;
