import React from 'react'
//CSS
import '../Css/Inicio.css'
//FIREBASE
import firebase from 'firebase'
//COMPONENTES
import DivVideo from './DivVideo'

class Inicio extends React.Component{
    
    _isMountd = false;

    constructor(props){
        super(props)

        this.state = 
            {
                arrayPrincipar:[]

            }
    }

    componentDidMount(){
        this._isMountd = true;

        firebase.database().ref().on('value',(snap) => {
            if(this._isMountd){
                // console.log(snap.val());
                this.setState({arrayPrincipar:snap.val()});
            }            
        })
    }

    componentWillUnmount(){
        this._isMountd = false;
    }

    handleClickDivVideo = (event) => {
        // console.log(event.target.dataset.codigo1);
        // console.log(event.target.dataset.codigo2);
        // console.log(event.target.dataset.video);
        localStorage.setItem('key',event.target.dataset.codigo1)
        localStorage.setItem('key2',event.target.dataset.codigo2);
        localStorage.setItem('rutavideo',event.target.dataset.video);
        const eventoAbrirVentanaComentarios = this.props.eventoAbrirVentanaComentarios;
        eventoAbrirVentanaComentarios();
    }

    render(){

        const arrayVideos = [];

        this.state.arrayPrincipar.map((data,key) => {
            if(data.datos){
                data.datos.map((d,k) => {
                
                    let video = 
                        {
                            primerIndice:key,
                            segundoIndice:k,
                            nombre:data.nombre,
                            mensaje:d.mensaje,
                            rutaVideo:d.video
                        }
                    arrayVideos.push(video);
                })
            }
        })
        // console.log(arrayVideos);
        //{data.rutaVideo}

        return(
            <article className='articleInicio'>
                {
                    this._isMountd && arrayVideos
                    ?
                    arrayVideos.map((data,key) => {
                        return(
                            <DivVideo key={key} className='divContenedorVideos' handleClickDivVideo={this.handleClickDivVideo} primerIndice={data.primerIndice} segundoIndice={data.segundoIndice} rutaVideo={data.rutaVideo} nombre={data.nombre} mensaje={data.mensaje}></DivVideo>
                        )
                    })
                    :
                    <div></div>

                }
            </article>
        )
    }
}

export default Inicio