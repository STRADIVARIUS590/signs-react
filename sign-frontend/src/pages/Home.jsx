import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain,faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

function Home(){
    return(
        <>
        <NavBar/>
        <div className="home-container">
            <div className="home-options">
                <div className="home-options-card-learn">
                    <a><FontAwesomeIcon icon={faBrain} style={{fontSize:'5rem'}}/></a>
                    <h1>Aprender</h1>
                    
                </div>
                <div className="home-options-card-rules">
                    <a><FontAwesomeIcon icon={faQuestionCircle} style={{fontSize:'5rem'}}/></a>
                    <h1>Reglas</h1>

                </div>
            </div>
            <div className="home-buttons">
            <a className="signin-button">Iniciar Sesion</a>
            <a className="register-button">Registrarme</a>
            </div>
        </div>
        </>
    )
}
export default Home;