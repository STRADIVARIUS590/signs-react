import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavBar from '../components/NavBar';
import Carousel from 'react-bootstrap/Carousel';


function Example() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [OffcanvasData, setOffcanvasData] = useState({});
    const [urlImg, setUrlImg] = useState('');
    const handleClose = () => {
        setShow(false)
        setIndex(0)
    };
    const handleShow = (id) => {
        setActiveCategoryId(id);
        setShow(true);
    };

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
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
                    setOffcanvasData(data.data);
                    console.log(OffcanvasData);
                    setShow(true); // Abre el Offcanvas después de cargar los datos de la categoría
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [activeCategoryId]);

    return (
        <>
            <NavBar />
            <div className='categorie-body-container'>
                {data.map((categorie) => (
                    <div className='categorie-card' key={categorie.id} onClick={() => handleShow(categorie.id)} style={{ backgroundColor: `${categorie.color}` }}>
                        {console.log(categorie)}
                        {categorie.image ? (<>
                            <img src={categorie.image.url} alt="No carga la imagen" />
                        </>) : (<img src='https://images.vexels.com/media/users/3/230796/isolated/preview/28fd4675876fbf3f580ab5b0a9785449-dibujos-animados-de-rebanada-de-pizza-feliz.png' alt="No carga la imagen" />)}
                        <h1>{categorie.name}</h1>
                    </div>
                ))}
            </div>
            {activeCategoryId !== null && (
                <Offcanvas show={show} onHide={handleClose} placement='end'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{OffcanvasData.name}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {OffcanvasData.data && OffcanvasData.data.length > 0 ? (
                            <>
                                <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
                                    {OffcanvasData.data.map((card) => (
                                        <Carousel.Item key={card.id}>
                                            <Card>
                                                <Card.Img variant="top" src={card.images[0].url} />
                                                <Card.Body style={{ textAlign: "center", marginTop: '1rem' }}>
                                                    <Card.Title>{card.meaning}</Card.Title>
                                                    <Card.Text>{card.description}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2rem' }}>
                                    {index === 0 ? ('') : (<Button onClick={() => setIndex(index - 1)} variant={'danger'}>Anterior</Button>)}
                                    <Button onClick={() => setIndex(index + 1)}>Siguiente</Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <img style={{ width: '100%' }} src='data:image/png;base64,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' alt="No carga la imagen" />
                                <p style={{textAlign:'center'}}>No hay informacion disponible en este momento</p>
                            </>
                        )}
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </>
    );
}

export default Example;