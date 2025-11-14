// src/components/search/MapSection.jsx

import React from 'react';
import CompareModal from './CompareModal'; 
import NaverMapLoader from './NaverMapLoader'; // 🚨 지도 로더 컴포넌트 import

// 지도 및 목록 전체 레이아웃
const mapLayoutStyle = {
  display: 'flex',
  height: '75vh', 
  gap: '20px',
  maxWidth: '1200px',
  margin: '0 auto 20px auto',
  position: 'relative', 
};

// 지도 영역 스타일
const mapAreaStyle = {
  flex: 2, 
  backgroundColor: '#f5f5f5', 
  borderRadius: '12px',
  position: 'relative', 
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  minHeight: '400px', 
};

// 매물 목록 영역 스타일
const listingAreaStyle = { 
  flex: 1, 
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '10px',
  overflowY: 'auto', 
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

// 토글 버튼 및 카드 스타일 (이전과 동일)
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


const ListingCard = ({ listing, onCompareToggle }) => {
  const isCompared = listing.compared;
  const compareCount = isCompared ? '✅ 비교 중' : '비교하기';

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
  
  window.currentComparedCount = comparedListings.length;

  const handleMapBoundsChange = (bounds) => {
    // 지도 경계 변경 동기화 로직 (여기서 API 호출을 수행해야 함)
    console.log("지도 경계 변경. 새로운 매물 검색 시작:", bounds);
  };

  return (
    <div style={mapLayoutStyle}>
      {/* 1. 지도 영역 (NaverMapLoader 삽입) */}
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

        {/* 🚨 네이버 지도 로더 컴포넌트 삽입 */}
        <NaverMapLoader 
          listings={listings} 
          facilityToggles={facilityToggles}
          onMapBoundsChange={handleMapBoundsChange}
        />
        
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