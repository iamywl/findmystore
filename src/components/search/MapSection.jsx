// src/components/search/MapSection.jsx (네이버 지도 연동 전의 안전한 상태로 복구)

import React from 'react';
import CompareModal from './CompareModal'; 
// import NaverMap from './NaverMap'; // 🚨 지도 연동 코드를 임시로 제거하고 안전하게 복구합니다.

// 지도 및 목록 전체 레이아웃
const mapLayoutStyle = {
  display: 'flex',
  height: '75vh', 
  gap: '20px',
  maxWidth: '1200px',
  margin: '0 auto 20px auto',
  position: 'relative', 
};

// 지도 영역 스타일 (회색 박스로 복구)
const mapAreaStyle = {
  flex: 2, 
  backgroundColor: '#e0e0e0', // 회색 박스로 복구
  borderRadius: '12px',
  position: 'relative', 
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

// ... (나머지 스타일은 동일) ...
const listingAreaStyle = { 
  flex: 1, 
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '10px',
  overflowY: 'auto', 
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

// 개별 매물 카드 스타일
const listingCardStyle = (compared) => ({
  border: compared ? '2px solid #646cff' : '1px solid #ddd',
  backgroundColor: compared ? '#f0f0ff' : 'white',
  borderRadius: '8px',
  padding: '15px',
  marginBottom: '10px',
  cursor: 'pointer',
  transition: 'all 0.2s',
  position: 'relative',
});

// 주변 시설 토글 바 스타일
const toggleBarStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '5px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  zIndex: 50,
  display: 'flex',
  gap: '5px',
};

// 토글 버튼 스타일
const toggleButtonStyle = (isActive) => ({
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#646cff' : '#eee',
    color: isActive ? 'white' : '#333',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
});


const ListingCard = ({ listing, onCompareToggle }) => {
  const isCompared = listing.compared;
  const compareCount = listing.compared ? '✅ 비교 중' : '비교하기';

  return (
    <div style={listingCardStyle(isCompared)}>
      <h4 style={{ margin: '0 0 5px 0', color: '#646cff' }}>{listing.type} 매물 ({listing.id})</h4>
      <p style={{ margin: '0 0 2px 0', fontSize: '14px', color: '#555' }}>면적: {listing.area}</p>
      <p style={{ margin: '0', fontWeight: 'bold' }}>금액: {listing.price}</p>
      
      {/* 비교하기 버튼 */}
      <button 
        onClick={() => onCompareToggle(listing.id)}
        style={{
          ...toggleButtonStyle(isCompared),
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '12px',
          padding: '5px 8px',
        }}
        // 비교는 최대 3개까지만 가능하다고 가정합니다.
        disabled={!isCompared && window.currentComparedCount >= 3} 
      >
        {compareCount}
      </button>
    </div>
  );
};

const MapSection = ({ listings, facilityToggles, onFacilityToggle, onCompareToggle, comparedListings }) => {
  const facilities = [
    { name: 'subway', label: '🚇 지하철역' },
    { name: 'school', label: '🏫 학교' },
    { name: 'hospital', label: '🏥 병원' },
  ];
  
  // 임시로 비교 개수를 전역 변수로 설정하여 비교 버튼 disabled 상태를 제어합니다.
  window.currentComparedCount = comparedListings.length;


  return (
    <div style={mapLayoutStyle}>
      {/* 1. 지도 영역 (회색 박스) */}
      <div style={mapAreaStyle}>
        
        {/* 주변 시설 토글 바 */}
        <div style={toggleBarStyle}>
          {facilities.map((fac) => (
            <button 
              key={fac.name} 
              onClick={() => onFacilityToggle(fac.name)} 
              style={toggleButtonStyle(facilityToggles[fac.name])}
            >
              {fac.label}
            </button>
          ))}
        </div>

        {/* 🚨 지도 대신 회색 박스 내용 표시 (원래 작동하던 지도 코드를 다시 삽입해야 합니다) */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          
          <p>여기에 원래 구현하셨던 **네이버 지도 컴포넌트**가 위치해야 합니다.</p>
        </div>
        
      </div>

      {/* 2. 매물 목록 영역 */}
      <div style={listingAreaStyle}>
        <h3 style={{ marginTop: '0', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
          최신 등록 매물 ({listings.length}건)
        </h3>
        {listings.map(listing => (
          <ListingCard 
            key={listing.id} 
            listing={listing} 
            onCompareToggle={onCompareToggle}
          />
        ))}
      </div>

      {/* 3. 매물 비교 모달 */}
      {comparedListings.length >= 2 && (
        <CompareModal 
          listings={comparedListings} 
          onClose={() => { /* ... */ }}
        />
      )}
    </div>
  );
};

export default MapSection;