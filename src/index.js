import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import firebase from 'firebase'

firebase.initializeApp({
    apiKey:    process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABSE_URL,
    projectId: process.env.REACT_APP__PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_IDV
});

ReactDOM.render(<App />, document.getElementById('root'));

