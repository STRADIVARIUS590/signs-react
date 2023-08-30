import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad,faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
function NavBar(){
    return(
        <>
        <header className="navbar-container">
            <Link to='/'><img src="https://img.freepik.com/vector-premium/logo-mano-simple_8586-99.jpg?w=826" alt="" /></Link>

            <div className="how-to-play">
                <a><FontAwesomeIcon icon={faGamepad} /><i> Como Jugar</i></a>
            </div>
            {localStorage.getItem('token') ? (<div className="how-to-play">
                <a><FontAwesomeIcon icon={faUser} /><i></i></a>
            </div>) : (<div className="how-to-play">
                <Link to={'/login'} style={{color:'white'}}><a><i><FontAwesomeIcon icon={faUser} /> Iniciar Sesion</i></a></Link>
            </div>)}
        </header>
        </>
    )
}

export default NavBar;