import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Prediction from './pages/prediction/Prediction';
import User from './pages/user/User';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className='main'>
        <Routes>
        <Route path="/prediction" Component={Prediction} />
        <Route path="/user" Component={User} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
