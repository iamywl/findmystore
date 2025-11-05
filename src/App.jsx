// src/App.jsx (수정: import 오류 해결 및 컴포넌트 분리)

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage'; // 메인 페이지
import StoreMapSearchPage from './pages/StoreMapSearchPage'; // 🚨 수정된 경로/컴포넌트 import

function App() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header />
      
      <main style={{flexGrow: 1}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* 🚨 /search 경로에 StoreMapSearchPage 연결 */}
          <Route path="/search" element={<StoreMapSearchPage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;