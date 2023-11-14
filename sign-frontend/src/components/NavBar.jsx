import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faUser,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
function NavBar() {
    return (
        <>
            <header className="navbar-container">
                <Link to='/'><img src='https://uabcs.net/diloconsenas/icon.png' style={{width:"80px"}} alt="No jala" /></Link>
                {localStorage.getItem('token') ? (<div className="how-to-play">
                    <Dropdown>
                        <Dropdown.Toggle style={{backgroundColor:"transparent", border:"solid 1px white"}} id="dropdown-basic">
                            <a><FontAwesomeIcon icon={faUser} /><i></i></a>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Hola, {localStorage.getItem("user")}!</Dropdown.Item>
                            <Dropdown.Item href="/login"> <FontAwesomeIcon icon={faRightFromBracket} /> Cerrar Sesion</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    
                </div>) : (<div className="how-to-play">
                    <Link to={'/login'} style={{ color: 'white' }}><a><i><FontAwesomeIcon icon={faUser} /> Iniciar Sesion</i></a></Link>
                </div>)}
            </header>
        </>
    )
}

export default NavBar;