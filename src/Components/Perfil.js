import React from 'react';
//CSS
import '../Css/Perfil.css'

class Perfil extends React.Component{

    render(){
        return(
            <article className='articlePerfil'>
                <div className='divTituloPerfil'>
                    <h2>Bienvenido {this.props.usuario}</h2>
                    <input className='botonSubir' type='button' value='SUBIR VIDEO' onClick={this.props.eventoAbrirVentana}></input>
                </div>

                <div className='contenedorPerfil'>
                </div>
                
            </article>
        )
    }
}

export default Perfil;