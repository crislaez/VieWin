import  React from 'react'
//CSS
import '../Css/Aside.css'
//FIREBASE
import firebase from 'firebase'

class Aside extends React.Component{

    _isMountd = false;

    constructor(props){
        super(props);
        this.state = 
            {
                buscador:'',
                array:[]
            };
    }

    componentDidMount(){
        this._isMountd = true;
    }

    componentWillUnmount(){
        this._isMountd = false;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(!this.state.buscador){

        }else{
            let arr = [];
            let aux = false;
            this.setState({buscador:''})
            firebase.database().ref().on('value',(snap) => {
                snap.val().forEach((dato, key) => {
                    if(dato.nombre == this.state.buscador){
                        arr.push(dato);
                        // console.log(dato)
                        aux = true;
                    }                 
                })                 
            })
            this.setState({array:arr})

            if(!aux){
                alert('No existe usuario con ese nombre')
            }                     
        }        
    }

    render(){
        let  arr2 = [];
        this.state.array.map((data,key) => {
            data.datos.map((d,k) => {
                let usuario = 
                    {
                        mensaje:d.mensaje,
                        video:d.video
                    }
                arr2.push(usuario);
            })
        })

        return(
            <aside>
                <div className='divBuscador'>
                <form id='fBuscador' action=''method='' onSubmit={this.handleSubmit}>
                    <input type='text' value={this.state.buscador} onChange={(param) => {this.setState({buscador:param.target.value})}}></input>
                    <input type='submit' value='buscar'></input>
                </form>
                </div>

                <div className='divContenedorBuscador'>
                {
                    this._isMountd && arr2
                    ?
                    arr2.map((data, key) => {
                        return(
                            <div key={key} className='dibResultado'>
                                <video src={data.video} controls></video>
                                <p>{data.mensaje}</p>
                            </div>
                        )
                    })
                    :
                    <div>...</div>
                }
                </div>
            </aside>
        )
    }
}

export default Aside