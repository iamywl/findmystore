// src/pages/StoreMapSearchPage.jsx

import React, { useState } from 'react';
import FilterBar from '../components/search/FilterBar';
import MapSection from '../components/search/MapSection';
import initialMockListings from '../data/mockListings'; 

const StoreMapSearchPage = () => {
  const [listings, setListings] = useState(initialMockListings); 
  const [filters, setFilters] = useState({ /* ... 필터 상태 ... */ }); 
  const [facilityToggles, setFacilityToggles] = useState({
    subway: false,
    school: false,
    hospital: false,
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const handleFacilityToggle = (facilityName) => {
    setFacilityToggles(prev => ({
      ...prev,
      [facilityName]: !prev[facilityName],
    }));
  };

  const handleCompareToggle = (id) => {
    setListings(prev => 
      prev.map(item => 
        item.id === id ? { ...item, compared: !item.compared } : item
      )
    );
  };
  
  const comparedListings = listings.filter(item => item.compared);


  return (
    // 🚨 수정: 좌우 패딩만 유지하고 화면 전체 너비를 사용합니다.
    <div style={{ padding: '0 20px', backgroundColor: '#f9f9f9', flexGrow: 1 }}> 
      
      {/* 검색 입력창 및 필터 바 섹션 */}
      <div style={{ margin: '0 auto', paddingTop: '20px' }}> 
        
        {/* 검색 입력창 */}
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginBottom: '20px',
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '10px 15px',
            backgroundColor: 'white'
        }}>
            <input 
                type="text" 
                placeholder="지역, 상호명을 입력해주세요" 
                style={{ flexGrow: 1, border: 'none', outline: 'none', fontSize: '16px' }} 
            />
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>🔍</button>
        </div>

        {/* 필터 바 컴포넌트 */}
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* 지도 및 매물 목록 섹션 */}
      <MapSection 
        listings={listings} 
        facilityToggles={facilityToggles} 
        onFacilityToggle={handleFacilityToggle}
        onCompareToggle={handleCompareToggle}
        comparedListings={comparedListings}
      />
      
    </div>
  );
};

export default StoreMapSearchPage;