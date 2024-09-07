import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Predictions from './pages/predictions/Predictions';
import PredictionResult from './pages/predictions/PredictionResult';
import EditResult from './pages/predictions/EditResult';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/predictions" element={<Predictions />} />
    <Route path="/predictionResult" element={<PredictionResult />} />
    <Route path="/EditResult/:id" element={<EditResult />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
