import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './Assets/css/app.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <App />
    <ToastContainer
      theme="colored"
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      pauseOnHover={false}
      rtl={false}
    />
  </div>,
);
