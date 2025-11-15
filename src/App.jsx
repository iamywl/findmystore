// src/App.jsx (수정: import 오류 해결 및 컴포넌트 분리)

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage'; // 홈 페이지 (기본값)
import StoreMapSearchPage from './pages/StoreMapSearchPage'; // 일반 매물 검색 페이지
import AnalysisPage from './pages/AnalysisPage'; // 상권 분석 보고서 (기존 템플릿 - 지금은 거의 안 쓰임)
import CommercialAnalysisPage from './pages/CommercialAnalysisPage'; // 🚨 지도 통합 분석 페이지

function App() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Header />
      
      <main style={{flexGrow: 1}}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<StoreMapSearchPage />} />
          {/* 🚨 상권 ID를 동적으로 받아서 보고서를 보여주는 경로 (기존 보고서 템플릿) */}
          <Route path="/analysis/:id" element={<AnalysisPage />} /> 
          {/* 🚨 상권 분석: 지도와 보고서가 통합된 페이지 */}
          <Route path="/commercial-analysis" element={<CommercialAnalysisPage />} /> 
          <Route path="/*" element={<HomePage />} /> {/* 잘못된 경로 처리 */}
        </Routes>
      </main>
    </div>
  );
}

export default App;