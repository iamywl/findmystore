// src/App.jsx (안정화된 최종 레이아웃 코드)

import React from 'react';
import MapContainer from './components/MapContainer.jsx'; // MapContainer 재포함
// import './App.css'; // 주석 유지

function App() {
  return (
    // 전체 화면 Flex 레이아웃
    <div className="app-layout" style={{ display: 'flex', height: '100vh', width: '100%', margin: 0, padding: 0 }}>
      {/* 1. 왼쪽: 매물 검색 필터 및 목록 영역 */}
      <div 
        style={{ 
          flex: '0 0 400px', 
          padding: '20px', 
          overflowY: 'auto', 
          borderRight: '1px solid #ccc',
          backgroundColor: '#f9f9f9',
          color: '#213547' 
        }}
      >
        <header style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '1.8em', margin: 0 }}>🏠 아빠 점포 거래소</h1>
        </header>
        
        <div style={{ padding: '10px', backgroundColor: '#fff', border: '1px solid #ddd' }}>
          **✅ CSS 및 레이아웃 정상 작동 중**
        </div>
        
        <h3>최신 등록 매물 목록</h3>
        <p style={{ color: '#888' }}>여기에 매물 목록 카드들이 표시될 예정입니다.</p>
        
      </div>
      
      {/* 2. 오른쪽: 지도 영역 */}
      <div style={{ flex: 1 }}>
        <MapContainer /> {/* 지도 컴포넌트 다시 렌더링 */}
      </div>
    </div>
  );
}

export default App;