import React from 'react'
//CSS
import '../Css/Login.css'
//FONT AWESOME
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
//FIREBASE
import firebase from 'firebase';

class Login extends React.Component{

    _isMounted = false;

    constructor(props){
        super(props);

        this.state = 
        {
            usuario:'',
            clave:'',
            arrayUsuarios:[]
        }
    }

    componentDidMount(){
        this._isMounted = true;
        firebase.database().ref().on('value',(snap) => {
            if(this._isMounted){
                this.setState({arrayUsuarios:snap.val()});
            }           
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let error = true;

        if(!this.state.usuario){
            alert('Rellene el usuario correctamente')
        }else if(!this.state.clave){
            alert('Rellene la clave correctamente')
        }else{

            for(let valor in this.state.arrayUsuarios){
               
                if(this.state.usuario == this.state.arrayUsuarios[valor].nombre && this.state.clave == this.state.arrayUsuarios[valor].clave){
                    error = false;
                    localStorage.setItem('usuario',this.state.arrayUsuarios[valor].nombre);
                    localStorage.setItem('primarykey',valor);                    
                }
            }

            if(!error){
                alert('Correcto');                
                const cerrarVentana = this.props.eventoCerrarVentana;
                cerrarVentana();
                //aqui
            }else{
                alert('Usuario incorrecto'); 
            }
            
            this.setState({usuario:'',clave:''});            
        }    
    }

    render(){
        return(
            <div className='contenedorLogin'>
                <div className='divLogin'>
                    <div className='divTituloLogin'>
                        <h3>{this.props.titulo}</h3>
                    </div>
                    <div className='divIcono'>
                        <button onClick={this.props.eventoCerrarVentana}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button>
                    </div>
                    <form className='formLogin' onSubmit={this.handleSubmit}>
                        <input className='bTexto' style={{marginTop:'5em'}} type='text' value={this.state.usuario} onChange={(param) => {this.setState({usuario:param.target.value})}} placeholder='usuario...'></input>
                        <br></br>
                        <input className='bTexto' type='password' value={this.state.clave} onChange={(param) => {this.setState({clave:param.target.value})}} placeholder='Clave...'></input>
                        <br></br>
                        <br></br>
                        <input type='submit' value='Logear'></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login