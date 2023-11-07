import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NavBar from '../components/NavBar';
import Carousel from 'react-bootstrap/Carousel';
import Swal from 'sweetalert2';

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

    const handlePlay = (id, count) => {
        if (localStorage.getItem('token')) {
            // Redirigir a la página 'game' si hay un token en el localStorage
            count > 0 ? (
                localStorage.setItem('numPreguntas',count),
                window.location.href = `/game/${id}`

            ) : (
                Swal.fire({
                    icon: 'error',
                    title: 'Lo sentimos',
                    text: 'Por el momento no hay preguntas para esa categoria, intenta con otra!',
                })
            )
        } else {
            // Redirigir a la página 'login' si no hay un token en el localStorage
            window.location.href = '/login';
        }
    };

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };


    useEffect(() => {
        const apiUrl = 'https://diloconsenas.uabcs.net/api/categories';
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
            const apiUrl = `https://diloconsenas.uabcs.net/api/categories/${activeCategoryId}`;
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
                    <div className='categorie-card' key={categorie.id} style={{ backgroundColor: `${categorie.color}` }}>
                        {console.log(categorie)}
                        {categorie.image ? (<>
                            <img src={categorie.image.url} alt="No carga la imagen" />
                        </>) : (<img src='https://images.vexels.com/media/users/3/230796/isolated/preview/28fd4675876fbf3f580ab5b0a9785449-dibujos-animados-de-rebanada-de-pizza-feliz.png' alt="No carga la imagen" />)}
                        <h1>{categorie.name}</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {console.log(categorie)}
                            <Button style={{ borderRadius: '5px', border: 'solid 1px black' }} variant={'success'} onClick={() => handlePlay(categorie.id, categorie.question_count)}>Jugar</Button>
                            <Button style={{ borderRadius: '5px', border: 'solid 1px black' }} variant={'primary'} onClick={() => handleShow(categorie.id)}>Aprender</Button>
                            <p style={{ fontSize: "8px" }}>Preguntas disponible {categorie.question_count}</p>
                        </div>
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
                            ''
                        )}
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </>
    );
}

export default Example;