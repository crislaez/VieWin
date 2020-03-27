import React from 'react'
//CSS
import '../Css/Registro.css'
//FONT AWESOME
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
//FIREBASE
import firebase from 'firebase';


class Registro extends React.Component{

    _isMount = true;

    constructor(props){
        super(props);
        this.state = 
        {
            nombre:'',
            apellido:'',
            sexo:'',
            correo:'',
            edad:'',
            clave:'',
            reclave:'',
            indice:''

        }
    }

    componentDidMount(){
        this._isMount = true;
        firebase.database().ref().on('value',(snap) => {
            if(this._isMount){
                console.log(snap.val());
                this.setState({indice:snap.val().length});
            }           
        })
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log(this.state.indice)

        if(!this.state.nombre || !/[A-Za-z]+$/.test(this.state.nombre)){
            alert('Rellene el nombre correctamente');
        }else if(!this.state.apellido || !/[A-Za-z]+$/.test(this.state.apellido)){
            alert('Rellene el apelido correctamente');
        }else if(!this.state.sexo || this.state.sexo == '0'){
            alert('Escoja el Sexo');
        }else if(!this.state.edad){
            alert('Rellene la edad correctamente');
        }else if(!this.state.correo){
            alert('Rellene el correo correctamente');
        }else if(!this.state.clave){
            alert('Rellene la clave correctamente');
        }else if(!this.state.reclave || this.state.reclave != this.state.clave){
            alert('Las claves no coinciden correctamente');
        }else{
            
            const usuario = 
                {
                    nombre:this.state.nombre,
                    apellido:this.state.apellido,
                    sexo:this.state.sexo,
                    edad:this.state.edad,
                    correo:this.state.correo,
                    clave:this.state.clave
                }

            try{
                firebase.database().ref(`${this.state.indice}`).set(usuario);
            }
            catch(error){
                console.log(error.message)
            }            
                
            alert('Registrado correctamente');
            this.setState({nombre:'',apellido:'',sexo:'',edad:'',correo:'',clave:''});

            const cerrarVentana = this.props.eventopCerrarVentana;
            cerrarVentana();
        }

        
    }

    render(){
        return(
            <div className='divContenedorRegistro'>
                <div className='divRegistro'>
                    <div className='divTituloRegistro'>
                        <h3>{this.props.titulo}</h3>
                    </div>
                    <div className='divIconRegistro'>
                        <button onClick={this.props.eventopCerrarVentana}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button>
                    </div>
                    <form className='formRegistro' onSubmit={this.handleSubmit}>
                        <input className='tFormulario' type='text' value={this.state.nombre} onChange={(param) => {this.setState({nombre:param.target.value})}} placeholder='nombre...'></input>
                        <br></br>
                        <input className='tFormulario' type='text' value={this.state.apellido} onChange={(param) => {this.setState({apellido:param.target.value})}} placeholder='apellido...'></input>
                        <br></br>
                        <select className='tFormulario' onChange={(param) => {this.setState({sexo:param.target.value})}}>
                            <option value='0'>--sexo--</option>
                            <option value='hombre'>Hombre</option>
                            <option value='mujer'>Mujer</option>
                        </select>
                        <br></br>
                        <input className='tFormulario' type='date' value={this.state.edad} onChange={(param) => {this.setState({edad:param.target.value})}} placeholder='edad...'></input>
                        <br></br>
                        <input className='tFormulario' type='email' value={this.state.correo} onChange={(param) => {this.setState({correo:param.target.value})}} placeholder='correo...'></input>
                        <br></br>                        
                        <input className='tFormulario' type='password' value={this.state.clave} onChange={(param) => {this.setState({clave:param.target.value})}} placeholder='clave...'></input>
                        <br></br>
                        <input className='tFormulario' type='password' value={this.state.reclave} onChange={(param) => {this.setState({reclave:param.target.value})}} placeholder='repetir clave...'></input>
                        <br></br>
                        <br></br>
                        <input type='submit' value='Registrar'></input>
                    </form>
                    
                </div>
            </div>
        )
    }
}

export default Registro;