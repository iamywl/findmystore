// src/pages/StoreMapSearchPage.jsx

import React, { useState, useMemo } from 'react';
import FilterBar from '../components/search/FilterBar';
import MapSection from '../components/search/MapSection';
import initialMockListings from '../data/mockListings'; 

// 🚨 Active Filter Tag 컴포넌트
const FilterTag = ({ label, onRemove }) => (
    <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#646cff',
        color: 'white',
        borderRadius: '16px',
        padding: '5px 12px',
        marginRight: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'default',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '5px',
    }}>
        {label}
        <button 
            onClick={onRemove}
            style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                marginLeft: '8px',
                cursor: 'pointer',
                padding: '0',
                lineHeight: '1'
            }}
        >
            ×
        </button>
    </div>
);


const StoreMapSearchPage = () => {
  const [listings, setListings] = useState(initialMockListings); 
  const [filters, setFilters] = useState({ 
    업종: [],
    매출증빙: false,
    테마: [],
    금액: {},
    층수: null,
    면적: null,
    주차대수: null,
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

  // 필터 태그를 클릭하여 해당 필터를 해제하는 함수
  const handleRemoveFilter = (filterName, specificValue = null) => {
    if (filterName === '매출증빙') {
        handleFilterChange(filterName, false);
    } else if (Array.isArray(filters[filterName])) {
        if (specificValue) {
             // 다중 선택 필터 (예: 테마)에서 특정 값만 제거
            const newValues = filters[filterName].filter(v => v !== specificValue);
            handleFilterChange(filterName, newValues);
        } else {
            // 다중 선택 필터 전체 초기화 (태그 전체 제거)
            handleFilterChange(filterName, []);
        }
    } else if (filterName === '금액') {
        handleFilterChange(filterName, {});
    } else {
        handleFilterChange(filterName, null);
    }
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
  
  // 활성화된 필터 목록을 계산하는 로직
  const activeFilters = useMemo(() => {
    const tags = [];
    
    // 1. 매출증빙
    if (filters.매출증빙) {
        tags.push({ key: '매출증빙', label: '매출증빙 매물' });
    }

    // 2. 테마 (다중 선택)
    filters.테마.forEach(theme => {
        tags.push({ key: `테마-${theme}`, label: `테마: ${theme}`, filterName: '테마', specificValue: theme });
    });
    
    // 3. 금액 (범위)
    if (filters.금액.min || filters.금액.max) {
        const min = filters.금액.min ? `${filters.금액.min}만원` : '최소';
        const max = filters.금액.max ? `${filters.금액.max}만원` : '최대';
        tags.push({ key: '금액', label: `금액: ${min} ~ ${max}` });
    }
    
    // 4. 층수, 면적, 주차대수 (단일 선택)
    if (filters.층수) tags.push({ key: '층수', label: `층수: ${filters.층수}` });
    if (filters.면적) tags.push({ key: '면적', label: `면적: ${filters.면적}` });
    if (filters.주차대수) tags.push({ key: '주차대수', label: `주차대수: ${filters.주차대수}` });

    return tags;
  }, [filters]);


  return (
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
      
      {/* 🚨 활성화된 필터 태그 영역 */}
      {activeFilters.length > 0 && (
          <div style={{ marginBottom: '20px', padding: '10px 0', borderBottom: '1px solid #eee' }}>
              {activeFilters.map(tag => (
                  <FilterTag 
                      key={tag.key} 
                      label={tag.label} 
                      onRemove={() => handleRemoveFilter(tag.filterName || tag.key, tag.specificValue)} 
                  />
              ))}
          </div>
      )}

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