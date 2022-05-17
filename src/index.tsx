import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { requestInterceptor, responseInterceptor } from './core/handler';
import reportWebVitals from './reportWebVitals';

/**
 * Request interceptors 
 */
axios.interceptors.request.use(request => requestInterceptor,  (error) => {
  return Promise.reject(error);
});
axios.interceptors.response.use(response => response, responseInterceptor);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
