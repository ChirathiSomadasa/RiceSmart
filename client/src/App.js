import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Contact from './pages/contact/Contact';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import Home from './pages/home/Home';


function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/contact" element={<Contact />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
