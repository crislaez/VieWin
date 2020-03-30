import React from 'react'
//CSS
import '../Css/SubirVideo.css'
//FONT AWESOME
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
//FIREBASE
import firebase from 'firebase';

class SubirVideo extends React.Component{

    _isMounted = false;
    
    constructor(props){
        super(props)
        this.state =
            {   
                video:'',
                mensaje:'',
                indiceDos:''
            }
    }

    componentDidMount(){
        this._isMounted = true;

        firebase.database().ref(`${localStorage.getItem('primarykey')}/datos`).on('value',(snap) => {
            if(this._isMounted){
                if(snap.val()){
                    this.setState({indiceDos:snap.val().length})
                }else{
                    this.setState({indiceDos:0})
                }
            } 
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        if(!localStorage.getItem('primarykey')){
            alert('Tienes que estar registrado para subir videos');
        }else{            
            if(!this.state.video){
                alert('IInserte un video')
            }else if(!this.state.mensaje){
                alert('Inserte un mensaje')
            }else{
                let primarykey = localStorage.getItem('primarykey')
                const bSubmit = document.querySelector('#bSubmit');
                bSubmit.disabled = true;

                const storage = firebase.storage().ref(`/imagenes/${this.state.video.name}`);
                storage.put(this.state.video)
                .then((res) => {
                    storage.getDownloadURL().then(ruta => {

                        const datos = 
                        {
                            video:ruta,
                            mensaje:this.state.mensaje
                        }

                        firebase.database().ref(`${primarykey}/datos/${this.state.indiceDos}/`).set(datos);

                        bSubmit.disabled = false;
                        
                        this.setState({video:'',mensaje:''});                        
                    })
                })      

                alert('Video subido');
                const cerraVentana = this.props.eventoCerrarVentana;
                cerraVentana();         
            }
        }   
    }

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
                    
                    <form className='formulario' onSubmit={this.handleSubmit}>
                        
                        <input style={{marginTop:'4em'}} className='inputFormSubirFoto' type='file' onChange={(param) => {this.setState({video:param.target.files[0]})}}></input>
                        <br></br>
                        <input className='inputFormSubirFoto' type='text' onChange={(param) => {this.setState({mensaje:param.target.value})}} value={this.state.mensaje} placeholder='mensaje...'></input>
                        <br></br>
                        <br></br>
                        <input id='bSubmit' type='submit' value='Subir'></input>
                    </form>

                </div>

            </div>
        )
    }
}

export default SubirVideo