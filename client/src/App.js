import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Contact from './pages/contact/Contact';
import SignUp from './pages/signup/SignUp';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import ProblemForm from './pages/contact/ProblemForm';
import UpdateContact from './pages/contact/UpdateContact';
import AddSolution from './pages/contact/AddSolution';
import ManageDisease from './pages/contact/ManageDisease';
import Predictions from './pages/predictions/Predictions';
import PredictionResult from './pages/predictions/PredictionResult';
import EditResult from './pages/predictions/EditResult';
import SignOut from './pages/signout/SignOut';


   
function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/contact" element={<Contact />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/contact/ProblemForm" element={<ProblemForm/>}/>
    <Route path="/contact/UpdateContact/:id" element={<UpdateContact/>}/>
    <Route path="/contact/AddSolution/:id" element={<AddSolution/>}/>
    <Route path="/contact/ManageDisease" element={<ManageDisease/>}/>
    <Route path="/predictions" element={<Predictions />} />
    <Route path="/predictionResult" element={<PredictionResult />} />
    <Route path="/EditResult/:id" element={<EditResult />} />
    <Route path="/signout" element={<SignOut />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
