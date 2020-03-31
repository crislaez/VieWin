import React from 'react'
//CSS
import'../Css/DivVideo.css'

class DivVideo extends React.Component{

    //this.props.rutaVideo
    render(){
        return(
            <div className='divContenedorVideos' onClick={this.props.handleClickDivVideo} data-codigo1={this.props.primerIndice} data-codigo2={this.props.segundoIndice} data-video={this.props.rutaVideo}>
                <video src={this.props.rutaVideo} controls data-codigo1={this.props.primerIndice} data-codigo2={this.props.segundoIndice} data-video={this.props.rutaVideo}></video>
                <p data-codigo1={this.props.primerIndice} data-codigo2={this.props.segundoIndice} data-video={this.props.rutaVideo}>{this.props.nombre}</p>
                <p data-codigo1={this.props.primerIndice} data-codigo2={this.props.segundoIndice} data-video={this.props.rutaVideo}>{this.props.mensaje}</p>
            </div>
        )
    }
}

export default DivVideo