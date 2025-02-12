
import './App.css'
import DashBorad from './Pages/DashBorad'
import Signup from './Pages/Signup'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {
  

  return (
    <><ToastContainer/>
    <Router>
      <Routes>
      <Route path='/' element={<Signup />}/>
      <Route path='/dashboard' element={<DashBorad />}/>
      </Routes>
    </Router></>
  )
}

export default App
