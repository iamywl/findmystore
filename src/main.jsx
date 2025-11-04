// src/main.jsx (확인)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // App 컴포넌트가 올바르게 import 되었는지
import './index.css';

// document.getElementById('root')가 null이 아닌지 확인
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);