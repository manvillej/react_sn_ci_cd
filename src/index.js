import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios'


axios.defaults.headers.put["Content-Type"] = "application/json"

if (process.env.NODE_ENV === 'development') {
    const username = process.env.REACT_APP_USER
    const password = process.env.REACT_APP_PASSWORD
    axios.defaults.auth = {
        username,
        password
    }
} else {
    axios.defaults.headers["X-userToken"] = window.servicenowUserToken
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
