function Rules() {
    return (
        <>
            <div className="home-container">
                <div style={{ width: "80%", height: "80%", backgroundColor: "white", borderRadius: "15px", display: "flex", alignItems: "center", flexWrap: "wrap", flexDirection: "column", border: "solid 5px black" }}>
                    <div>
                        <h1>Reglas del juego</h1>
                    </div>
                    <div style={{margin:"2rem"}}>
                        <div style={{display:"flex"}}> 
                            <h1>1.-</h1>
                            <p>Si tienes cuenta Inicia Sesión en caso contrario crear una cuenta.</p>
                        </div>
                        <div style={{display:"flex"}}>
                            <h1> 2.-</h1>
                            <p>Elige si deseas aprender o jugar una categoría.</p>
                        </div>
                        <div style={{display:"flex"}}>
                            <h1> 3.-</h1>
                            <p>En “Aprender”, te mostrára la imagen de la seña junto con una breve descripción de como hacerla correctamente.</p>
                        </div>
                        <div style={{display:"flex"}}>
                            <h1> 4.-</h1>
                            <p> En la sección de “Jugar” tienes que contestar de manera correcta el significado de la imagen, te mostraremos 4 opciones y elige la correcta, al terminar el quizz, te mostraremos la puntuación.</p>
                            
                        </div>
                        <div style={{display:"flex"}}>
                            <h1> 5.-</h1>
                            <p> Te recomendamos siempre entrar en la sección de “Aprender” antes de jugar, ya que si no has tenido experiencia, esta sección te ayudara a memorizar y a aprender nuevas señas</p>
                            
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Rules;