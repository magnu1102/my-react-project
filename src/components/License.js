// src/components/License.js
import React from 'react';
import licenseText from '../licenseText'; // Import the license text

function License() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>License Agreement</h2>
      <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
        {licenseText}
      </pre>
    </div>
  );
}

export default License;