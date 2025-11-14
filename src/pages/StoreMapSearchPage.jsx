// src/pages/StoreMapSearchPage.jsx

import React, { useState } from 'react';
import FilterBar from '../components/search/FilterBar';
import MapSection from '../components/search/MapSection';
import initialMockListings from '../data/mockListings'; // 🚨 변경: 더미 데이터 import

const StoreMapSearchPage = () => {
  // 🚨 변경: import한 더미 데이터 사용
  const [listings, setListings] = useState(initialMockListings); 
  const [filters, setFilters] = useState({
    // ... (기존 필터 상태는 그대로 유지)
  });
  
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
    console.log(`${facilityName} 토글 상태 변경: ${!facilityToggles[facilityName]}`);
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
    <div style={{ padding: '0 20px', backgroundColor: '#f9f9f9', flexGrow: 1 }}>
      {/* 검색 입력창 및 필터 바 섹션 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
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

        <FilterBar filters={{ /* ... */ }} onFilterChange={handleFilterChange} />
      </div>

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