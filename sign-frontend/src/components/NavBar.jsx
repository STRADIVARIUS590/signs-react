import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

function NavBar(){
    return(
        <>
        <header className="navbar-container">
            <img src="https://img.freepik.com/vector-premium/logo-mano-simple_8586-99.jpg?w=826" alt="" />
            <div className="navbar-options">
                <ul>
                    <li>Jugar</li>
                    <li>Aprender</li>
                </ul>
            </div>
            <div className="how-to-play">
                <a><FontAwesomeIcon icon={faGamepad} /><i>Como Jugar</i></a>
            </div>
        </header>
        </>
    )
}

export default NavBar;