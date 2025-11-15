// src/components/search/FilterBar.jsx

import React, { useState } from 'react';
import FilterButton from './FilterButton';
import FilterDropdown from './FilterDropdown';
import { 
  INDUSTRY_OPTIONS, 
  THEME_OPTIONS, 
  FLOOR_OPTIONS, 
  AREA_OPTIONS, 
  PARKING_OPTIONS 
} from '../../data/filterOptions'; 

const FilterBar = ({ filters, onFilterChange }) => {
  // 현재 열린 드롭다운 이름
  const [activeFilter, setActiveFilter] = useState(null);

  const handleButtonClick = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const handleDropdownSelect = (filterName, value) => {
    onFilterChange(filterName, value);
    // 선택 후 드롭다운 닫기 (선택 방식에 따라 닫지 않을 수도 있음)
    // setActiveFilter(null); 
  };
  
  const handleReset = () => {
    window.location.reload(); 
  };
  
  // 🚨 활성화 상태 계산: filters 객체에 값이 있으면 true
  const isFilterActive = (name) => {
    const value = filters[name];
    if (typeof value === 'boolean') return value;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
    return !!value;
  };


  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', position: 'relative', zIndex: 10 }}>
      {/* 1. 업종 필터 */}
      <FilterButton 
        name="업종" 
        isActive={activeFilter === '업종' || isFilterActive('업종')} 
        onClick={() => handleButtonClick('업종')} 
      />
      {/* 2. 매출증빙 (토글 버튼) */}
      <FilterButton 
        name="매출증빙" 
        isActive={filters.매출증빙} // boolean 값으로 바로 확인
        onClick={() => onFilterChange('매출증빙', !filters.매출증빙)}
        isToggle={true}
      />
      {/* 3. 테마 필터 */}
      <FilterButton 
        name="테마" 
        isActive={activeFilter === '테마' || isFilterActive('테마')} 
        onClick={() => handleButtonClick('테마')} 
      />
      {/* 4. 금액 필터 */}
      <FilterButton 
        name="금액" 
        isActive={activeFilter === '금액' || isFilterActive('금액')} 
        onClick={() => handleButtonClick('금액')} 
      />
      {/* 5. 층수 필터 */}
      <FilterButton 
        name="층수" 
        isActive={activeFilter === '층수' || isFilterActive('층수')} 
        onClick={() => handleButtonClick('층수')} 
      />
      {/* 6. 면적 필터 */}
      <FilterButton 
        name="면적" 
        isActive={activeFilter === '면적' || isFilterActive('면적')} 
        onClick={() => handleButtonClick('면적')} 
      />
      {/* 7. 주차대수 필터 */}
      <FilterButton 
        name="주차대수" 
        isActive={activeFilter === '주차대수' || isFilterActive('주차대수')} 
        onClick={() => handleButtonClick('주차대수')} 
      />

      {/* 8. 초기화 버튼 (보라색) */}
      <button 
        onClick={handleReset}
        style={{ 
          padding: '8px 15px', 
          backgroundColor: '#8d7bf0', 
          color: 'white', 
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold'
        }}
      >
        🔄 초기화
      </button>

      {/* 드롭다운 영역 */}
      <div style={{ position: 'absolute', top: '50px', left: '0', minWidth: '300px' }}>
        {activeFilter === '업종' && (
          <FilterDropdown 
            filterName="업종" 
            options={INDUSTRY_OPTIONS} 
            onSelect={handleDropdownSelect} 
            currentSelection={filters.업종}
            type="icon-grid"
          />
        )}
        {activeFilter === '테마' && (
          <FilterDropdown 
            filterName="테마" 
            options={THEME_OPTIONS} 
            onSelect={handleDropdownSelect} 
            currentSelection={filters.테마}
            type="simple-grid"
          />
        )}
        {activeFilter === '금액' && (
          <FilterDropdown 
            filterName="금액" 
            onSelect={handleDropdownSelect} 
            currentSelection={filters.금액}
            type="slider-range"
          />
        )}
        {activeFilter === '층수' && (
          <FilterDropdown 
            filterName="층수" 
            options={FLOOR_OPTIONS} 
            onSelect={handleDropdownSelect} 
            currentSelection={filters.층수}
            type="chip-select"
          />
        )}
        {activeFilter === '면적' && (
          <FilterDropdown 
            filterName="면적" 
            options={AREA_OPTIONS} 
            onSelect={handleDropdownSelect} 
            currentSelection={filters.면적}
            type="chip-select"
          />
        )}
        {activeFilter === '주차대수' && (
          <FilterDropdown 
            filterName="주차대수" 
            options={PARKING_OPTIONS} 
            onSelect={handleDropdownSelect} 
            currentSelection={filters.주차대수}
            type="chip-select"
          />
        )}
      </div>
    </div>
  );
};

export default FilterBar;