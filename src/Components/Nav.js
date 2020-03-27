import React from 'react'
//CSS
import '../Css/Nav.css'
//FONT AWESOME
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'

class Nav extends React.Component{

    constructor(props){
        super(props)
        this.state = 
            {
                load:false
            }
    }
    
    componentDidMount(){
        setInterval(() => {
            if(localStorage.getItem('usuario')){
                this.setState({load:true})
                console.log('Existe')
            }else{
                this.setState({load:false})
                console.log('No Existe')
            }
        },500);
    }

    render(){
        return(
            <nav>
                <button id='bMenuLateral' type='button' className='botones'  onClick={this.props.eventoSection}><FontAwesomeIcon icon={faBars}></FontAwesomeIcon></button>
                <input id='bInicio' type='button' className='botones' value='INICIO' onClick={this.props.eventoSection}></input>
                {
                    this.state.load
                    ?
                    <input id='bPerfil' type='button' className='botones' value='PERFIL' onClick={this.props.eventoSection}></input>
                    :
                    <div style={{display:'none'}}></div>
                }
                <input id='bRegistro' type='button' className='botones' style={{float:"right"}} value='REGISTRARSE' onClick={this.props.eventoSection}></input>
                {
                    this.state.load
                    ?
                    <input id='bCerrar' type='button' className='botones' style={{float:'right'}} value='CERRAR SESION' onClick={this.props.eventoSection}></input>
                    :
                    <input id='bLogin' type='button' className='botones' style={{float:'right'}} value='LOGIN' onClick={this.props.eventoSection}></input>

                }
                
               
            </nav>
        )
    }
}

export default Nav