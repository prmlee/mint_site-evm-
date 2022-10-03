import React from 'react';
import Router from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App max-w-mdm'>
      <>
        <Router />
        <ToastContainer autoClose={ 4000} hideProgressBar theme='colored' />
      </>
    </div>
  );
}

export default App;
