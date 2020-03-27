import React from 'react';
//CCS
import '../Css/App.css'
//COMPONENTES
import Header from './Header'
import Section from './Section'
import Footer from './Footer'

class App extends React.Component{

    render(){
        return(
            <div>
                <Header></Header>
                <Section></Section>
                <Footer></Footer>
            </div>
        )
    }
}

export default App