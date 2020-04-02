import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyD3pKZI6xsWRYtb9Fzf09QNGCCHR8Xma5w",
    authDomain: "viewin-2492b.firebaseapp.com",
    databaseURL: "https://viewin-2492b.firebaseio.com",
    projectId: "viewin-2492b",
    storageBucket: "viewin-2492b.appspot.com",
    messagingSenderId: "818011151050",
    appId: "1:818011151050:web:59e031c7d3b6132f567233"
});

ReactDOM.render(<App />, document.getElementById('root'));

