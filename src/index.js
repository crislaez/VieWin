import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import firebase from 'firebase'

firebase.initializeApp({

});

ReactDOM.render(<App />, document.getElementById('root'));

