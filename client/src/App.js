import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'


import Navbar from './components/Navbar';

import Login from './components/Login';
import Register from '../src/components/Register';
import Home from '../src/components/Home';


function App() {
  return (
    <Router className="App">
      <Navbar/>
      <Routes>
        {/* User */}
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />

          {/* Admin */}    
        </Routes>
    </Router>
  );
}

export default App;
