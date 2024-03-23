import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'



import Login from './components/Login';
import Register from '../src/components/Register';

function App() {
  return (
    <Router className="App">
      <Routes>
        {/* User */}
          
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          {/* Admin */}    
        </Routes>
    </Router>
  );
}

export default App;
