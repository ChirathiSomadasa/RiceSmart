import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Prediction from './pages/prediction/Prediction';


function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className='main'>
        <Routes>
        <Route path="/prediction" Component={Prediction} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
