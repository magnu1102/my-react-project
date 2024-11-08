// src/pages/Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Tool Hub</h1>
      <p>Welcome to the tool hub! Select a tool to get started:</p>
      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '1rem' }}>
        <li style={{ marginBottom: '1rem' }}>
          <Link to="/kpi-input-form" style={{ textDecoration: 'none', fontSize: '1.2rem', color: '#00c2e8' }}>
            KPI Input Form
          </Link>
        </li>
        <li style={{ marginBottom: '1rem' }}>
          <Link to="/table-of-contents" style={{ textDecoration: 'none', fontSize: '1.2rem', color: '#00c2e8' }}>
            Table of Contents
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Homepage;
