import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RestaurantPage from './components/RestaurantPage';
import Cart from './components/Cart';
import Auth from './components/Auth';
import DriverTrack from './components/DriverTrack';

export default function App() {
  return (
    <BrowserRouter>
      <header className="appbar">
        <div style={{fontWeight:700}}>Foodieee - Demo</div>
        <div style={{fontSize:14}}>Fullstack Internship</div>
      </header>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/driver" element={<DriverTrack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
