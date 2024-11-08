// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '1rem',
      backgroundColor: '#333',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      zIndex: 1000
    }}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/kpi-input-form" style={linkStyle}>KPI Input Form</Link>
      <Link to="/table-of-contents" style={linkStyle}>Table of Contents Tool</Link>
    </nav>
  );
}

const linkStyle = {
  color: '#00c2e8',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  backgroundColor: '#444',
  borderRadius: '8px',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
  display: 'inline-block'
};

linkStyle[':hover'] = {
  backgroundColor: '#555' // Hover effect color
};

export default Navbar;
