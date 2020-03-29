import React from 'react'
//CSS
import '../Css/Comentarios.css'

class Comentarios extends React.Component{
    
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = 
            {
                comentario:'',
                key:'',
                key2:'',
                rutavideo:'',
                usuario:''
            }
    }

    componentDidMount(){
        this._isMounted = true;
        this.setState({key:localStorage.getItem('key'),key2:localStorage.getItem('key2'),rutavideo:localStorage.getItem('rutavideo'),usuario:localStorage.getItem('usuario')})
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log(this.state.key)
        console.log(this.state.key2)
        console.log(this.state.usuario);
        console.log(this.state.comentario);
    }

    render(){
        return(
            <div className='divContenedorComentarios'>
                <div className='divInputComentarios'>
                    <input id='bAtras' type='button' onClick={this.props.eventoCerrarVentana} value='ATRAS'></input>
                </div>

                <div className='divVIdeo'>
                    <video style={{width:'100%',height:'500px'}} src={this.state.rutavideo} controls></video>
                </div>

                <div className='divComentarios'>
                </div>

                <form onSubmit={this.handleSubmit} className='divFormulario'>
                    <input type='text' value={this.state.comentario} onChange={(param) => {this.setState({comentario:param.target.value})}} placeholder='Comentario...'></input>
                    <br></br>
                    <input type='submit' value='Enviar'></input>
                </form>
            </div>
        )
    }
}

export default Comentarios