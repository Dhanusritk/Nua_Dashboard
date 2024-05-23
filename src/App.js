// App.js
import React from 'react';
import'./App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Auth/Login/Login';
import RegistrationForm from './components/Auth/Register/Register';
import LoginForm from './components/Auth/Login/Login';


function App() {
  

  return (
    <Router>
      
          <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<RegistrationForm />} />
          <Route path="/home" element={<Dashboard/>} />
          </Routes>
      
    </Router>
  );
}

export default App;
