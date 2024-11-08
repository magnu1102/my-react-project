// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import KpiInputForm from './pages/KpiInputForm';
import TableOfContents from './pages/TableOfContents';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* Apply top padding to avoid overlap with fixed navbar */}
        <div style={{ paddingTop: '5rem' }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/kpi-input-form" element={<KpiInputForm />} />
            <Route path="/table-of-contents" element={<TableOfContents />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
