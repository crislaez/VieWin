import React from 'react'
//CSS
import '../Css/Section.css'
//COMPONENTES
import Nav from './Nav'
import Aside from './Aside'
import Login from './Login'
import Registro from './Registro'
import Perfil from './Perfil'
import Inicio from './Inicio'
import SubirVideo from './SubirVideo'
import Comentarios from './Comentarios'

class Section extends React.Component{

    _isMounted = false;
    _boolMenu = true;
    
    constructor(props){
        super(props)
        this.state = 
            {
                mostrarLogin:false,
                mostrarRegistro:false,
                cambioVentana:'inicio',
                ventanaSubirFoto:false,
            }
    }

    componentDidMount(){
        this._isMounted = true;

        //aqui llamamos a la uncion para que borre las variables
        //que guardamos en el localstorage cuando se cierra el navegador
        const removeLocalStorage = this.removeLocalStorage;
        removeLocalStorage();
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }

    cerrarVentanaLogin = () => {
        this.setState({mostrarLogin:false})
       
    }

    cerrarVentanaRegistro = () => {
        this.setState({mostrarRegistro:false})
      
    }

    cerrarVentanaSubirFoto = () => {
        this.setState({ventanaSubirFoto:false})
    }
    
    abrirVentanaSubirFoto = () => {
        this.setState({ventanaSubirFoto:true})
    }

    abrirVentanaComentarios = () => {
        this.setState({cambioVentana:'comentarios'})
    }

    cerrarVentanaComentarios = () => {
        this.setState({cambioVentana:'inicio'})
    }
    
    opcionesMenu = (event) => {
    
        if(event.target.id == 'bMenuLateral' || event.target.id == 'iMenu'){
            let aside = document.getElementsByTagName('aside');
            if(this._boolMenu){
                aside[0].style.width = '30%';
                this._boolMenu = false;
            }else{
                aside[0].style.width = '0%';
                this._boolMenu = true;
            }

        }
        else if(event.target.id == 'bInicio'){
            this.setState({cambioVentana:'inicio'})
        }
        else if(event.target.id == 'bLogin'){
            this.setState({mostrarLogin:true})

        }
        else if(event.target.id == 'bRegistro'){
            this.setState({mostrarRegistro:true})

        }
        else if(event.target.id == 'bCerrar'){
            
            const confirmafion = window.confirm('Quieres cerrar sesion?');
            if(confirmafion){
                localStorage.removeItem('usuario');
                localStorage.removeItem('primarykey');
                localStorage.removeItem('key');
                localStorage.removeItem('key2');
                this.setState({cambioVentana:'inicio'});
            }
            
        }
        else if(event.target.id == 'bPerfil'){
            this.setState({cambioVentana:'perfil'})
        }
    }

    //cuando se cierre el navegador, borramos las variables del localStorage
    removeLocalStorage = () => {
        window.addEventListener('unload',function(){
            localStorage.removeItem('key');
            localStorage.removeItem('key2');
            localStorage.removeItem('usuario');
            localStorage.removeItem('primarykey');
            
        })        
    }

    render(){
        
        return(
            <section>
                <Nav eventoSection={this.opcionesMenu}></Nav>
                <Aside id='aside'></Aside>
                
                {   this.state.cambioVentana == 'inicio'
                    ?
                    <Inicio eventoAbrirVentanaComentarios={this.abrirVentanaComentarios}></Inicio>
                    :
                    this.state.cambioVentana == 'perfil'
                    ?
                    <Perfil usuario={localStorage.getItem('usuario')} eventoAbrirVentana={this.abrirVentanaSubirFoto}></Perfil>
                    :
                    this.state.cambioVentana == 'comentarios'
                    ?
                    <Comentarios eventoCerrarVentana={this.cerrarVentanaComentarios}>COMENTARIOS</Comentarios>
                    :
                    <div></div>
                }
                {
                    this.state.mostrarLogin
                    ?
                    <Login eventoCerrarVentana={this.cerrarVentanaLogin} titulo='LOGIN'></Login>
                    :
                    <div></div>
                }
                {
                    this.state.mostrarRegistro
                    ?
                    <Registro eventopCerrarVentana={this.cerrarVentanaRegistro} titulo='REGISTRO'></Registro>
                    :
                    <div></div>

                }
                {
                    this.state.ventanaSubirFoto
                    ?
                    <SubirVideo eventoCerrarVentana={this.cerrarVentanaSubirFoto}></SubirVideo>
                    :
                    <div></div>
                }
            </section>
        )
    }
}

export default Section