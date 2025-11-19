import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="header">
      <h1>CreditSmart</h1>
      <nav className="navbar">
        <a href="/" className="nav-link active">Inicio</a>
        <a href="/simulador" className="nav-link">Simulador</a>
        <a href="/solicitar" className="nav-link">Solicitar crédito</a>
      </nav>
    </header>
  );
};

export default Navbar;