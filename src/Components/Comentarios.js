import React from 'react'
//CSS
import '../Css/Comentarios.css'
//FIREBASE
import firebase from 'firebase'

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
                usuario:'',
                array:[],
                longitud:''
            }
    }

    componentDidMount(){
        this._isMounted = true;
        this.setState({key:localStorage.getItem('key'),key2:localStorage.getItem('key2'),rutavideo:localStorage.getItem('rutavideo'),usuario:localStorage.getItem('usuario')})

        firebase.database().ref(`${localStorage.getItem('key')}/datos/${localStorage.getItem('key2')}/comentario`).on('value',(snap) => {
            if(this._isMounted){
                if(snap.val()){
                    this.setState({array:snap.val(), longitud:snap.val().length})
                }               
            }            
        })
        
    }
    
    componentWillUnmount(){
        this._isMounted = false;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.state.usuario){
            alert('Tienes que estar registrado para comentar')
        }else{
            //creamos una instancia del boton submit para que no se pueda volver a aceptar
            //hasta que se suba el comentario
            const bSubmitC = document.querySelector('#bSubmitC');
            bSubmitC.disabled = true;

            let indiceComentario;
            if(!this.state.longitud){
                indiceComentario = 0;
            }else{
                indiceComentario = this.state.longitud
            }

            const comentario = 
                {
                    usuario:this.state.usuario,
                    comentario:this.state.comentario

                }

            firebase.database().ref(`${localStorage.getItem('key')}/datos/${localStorage.getItem('key2')}/comentario/${indiceComentario}/`).set(comentario)

            alert('Comentario subido');
            //dejamos el boton del submit disable
            bSubmitC.disabled = false;
            //limpiamos los estados
            this.setState({key:'',key2:'',rutavideo:'',usuario:'',comentario:''});
        }
        
    }
//{this.state.rutavideo}
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
                {
                    this._isMounted && this.state.array
                    ?
                    this.state.array.map((data, key) => {
                        return(
                            <div key={key} className='divComentarioIndividual'>
                                <p style={{color:'#1B3440',fontWeight:'bold'}}>{data.usuario}:</p>
                                <p>{data.comentario}</p>
                            </div>
                        )
                    })
                    :
                    <div>No hay comentarios</div>
                }
                </div>

                <form onSubmit={this.handleSubmit} className='divFormulario'>
                    <input type='text' value={this.state.comentario} onChange={(param) => {this.setState({comentario:param.target.value})}} placeholder='Comentario...'></input>
                    <br></br>
                    <input id='bSubmitC' type='submit' value='Enviar'></input>
                </form>
            </div>
        )
    }
}

export default Comentarios