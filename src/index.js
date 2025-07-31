import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component

// Note: This file no longer imports any CSS files to prevent the build error.

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

