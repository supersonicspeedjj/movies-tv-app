import React from 'react';
import ReactDOM from 'react-dom';
import clevertap from 'clevertap-web-sdk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import {store} from './redux/store';
clevertap.init('485-ZZW-596Z'); // Replace YOUR_ACCOUNT_ID, can be initialized just once
// clevertap.setLogLevel(3)
ReactDOM.render(
  <React.StrictMode>
  
    <Provider store={store}>
   

    <App />
    </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
