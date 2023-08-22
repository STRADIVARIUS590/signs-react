import { useState } from 'react';
import reactLogo from './assets/react.svg';
import NavBar from './components/NavBar';
import ShowUser from './components/ShowUser';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categories from './pages/Categories'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <>
        {/* Aquí dentro del Router definimos las rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<Categories />} />

        </Routes>
      </>
    </Router>
  );
}

export default App;
