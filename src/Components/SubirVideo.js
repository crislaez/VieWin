import React from 'react'
//CSS
import '../Css/SubirVideo.css'
//FONT AWESOME
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons'

class SubirVideo extends React.Component{

    render(){
        return(
            <div className='divSubirVideo'>

                <div className='divContenedorSubirVideo'>
                    <div className='divTituloSubitVideo'>
                        <h2>SUBE TU VIDEO</h2>
                    </div>
                    <div className='divIconRegistroSubirVideos'>
                        <button onClick={this.props.eventoCerrarVentana}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button>
                    </div>

                </div>

            </div>
        )
    }
}

export default SubirVideo