import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Prediction from './pages/prediction/Prediction';
import Contact from './pages/contact/Contact';
import Solution from './pages/contact/Solution';


function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className='main'>
        <Routes>
        <Route path="/prediction" Component={Prediction} />
        <Route path="/contact/Contact" Component={Contact}/>
        <Route path="/contact/Solution" Component={Solution}/>

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
