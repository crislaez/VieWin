import React from 'react';
//CSS
import '../Css/Perfil.css'
//fireabse
import firebase from 'firebase'
//COMPONENTES
import DivVideo from './DivVideo'

class Perfil extends React.Component{

    _isMounted = false;

    constructor(props){
        super(props)

        this.state = 
            {
                array:[]
            }
    }
    
    componentDidMount(){
        this._isMounted = true;
        firebase.database().ref(`${localStorage.getItem('primarykey')}/datos`).on('value',(snap) => {
            if(this._isMounted){
                console.log(snap.val());
                this.setState({array:snap.val()});
            }            
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleClick = (event) => {        
        
        let confirmacion = window.confirm('¿Seguiro que quiere borrar la foto?');
        if(confirmacion){
            firebase.database().ref(`${localStorage.getItem('primarykey')}/datos/${event.target.dataset.key2}`).remove();

            alert('Foto borrada')
        }
    }

    render(){
        //data.video
        return(
            <article className='articlePerfil'>
                <div className='divTituloPerfil'>
                    <h2>Bienvenido {this.props.usuario}</h2>
                    <input className='botonSubir' type='button' value='SUBIR VIDEO' onClick={this.props.eventoAbrirVentana}></input>
                </div>

                <div className='contenedorPerfil'>
                    {
                        this._isMounted && this.state.array
                        ?
                        this.state.array.map((data, key) => {
                            return(
                                <div key={key} className='divVideoPefil'>
                                    <video src={data.video} controls></video>
                                    <p>{data.mensaje}</p>
                                    <input type='button' value='Borrar' data-key2={key} onClick={this.handleClick}></input>
                                </div>
                            )
                        })
                        :
                        <div>No tiene fotos</div>
                    }
                </div>
                
            </article>
        )
    }
}

export default Perfil;