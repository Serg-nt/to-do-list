import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import App from "./App";
import store from "./reduxStore/reduxStore";
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDYqVveT6hQg6Jofcz_TZJ9gQqQrRjGMJk",
    authDomain: "todolist-831f7.firebaseapp.com",
    databaseURL: "https://todolist-831f7-default-rtdb.firebaseio.com",
    projectId: "todolist-831f7",
    storageBucket: "todolist-831f7.appspot.com",
    messagingSenderId: "1085610781823",
    appId: "1:1085610781823:web:447a26997ced991c92234a"
}

firebase.initializeApp(firebaseConfig)

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
