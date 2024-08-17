import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import SignUp from './pages/signup/SignUp';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
