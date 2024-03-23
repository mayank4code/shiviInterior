import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'



import Login from './components/Login';
import Signup from "../src/components/Signup";

function App() {
  return (
    <Router className="App">
      <Routes>
        {/* User */}
          
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          {/* Admin */}    
        </Routes>
    </Router>
  );
}

export default App;
