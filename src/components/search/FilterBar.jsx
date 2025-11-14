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
} from '../../data/filterOptions'; // 🚨 데이터 파일에서 옵션들을 가져옵니다.

const FilterBar = ({ filters, onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleButtonClick = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const handleDropdownSelect = (filterName, value) => {
    onFilterChange(filterName, value);
    // 선택 후 드롭다운 닫기
    setActiveFilter(null); 
  };
  
  const handleReset = () => {
    // 모든 필터 초기화 로직 (StoreMapSearchPage에서 처리할 수도 있습니다)
    window.location.reload(); // 간단히 페이지 새로고침
  };

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', position: 'relative', zIndex: 10 }}>
      {/* 1. 업종 필터 */}
      <FilterButton 
        name="업종" 
        isActive={activeFilter === '업종'} 
        onClick={() => handleButtonClick('업종')} 
      />
      {/* 2. 매출증빙 (토글 버튼이나 간단한 체크박스 형태로 가정) */}
      <FilterButton 
        name="매출증빙" 
        isActive={filters.매출증빙} 
        onClick={() => onFilterChange('매출증빙', !filters.매출증빙)}
        isToggle={true}
      />
      {/* 3. 테마 필터 */}
      <FilterButton 
        name="테마" 
        isActive={activeFilter === '테마'} 
        onClick={() => handleButtonClick('테마')} 
      />
      {/* 4. 금액 필터 */}
      <FilterButton 
        name="금액" 
        isActive={activeFilter === '금액'} 
        onClick={() => handleButtonClick('금액')} 
      />
      {/* 5. 층수 필터 */}
      <FilterButton 
        name="층수" 
        isActive={activeFilter === '층수'} 
        onClick={() => handleButtonClick('층수')} 
      />
      {/* 6. 면적 필터 */}
      <FilterButton 
        name="면적" 
        isActive={activeFilter === '면적'} 
        onClick={() => handleButtonClick('면적')} 
      />
      {/* 7. 주차대수 필터 */}
      <FilterButton 
        name="주차대수" 
        isActive={activeFilter === '주차대수'} 
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
            type="icon-grid"
          />
        )}
        {activeFilter === '테마' && (
          <FilterDropdown 
            filterName="테마" 
            options={THEME_OPTIONS} 
            onSelect={handleDropdownSelect} 
            type="simple-grid"
          />
        )}
        {activeFilter === '금액' && (
          <FilterDropdown 
            filterName="금액" 
            onSelect={handleDropdownSelect} 
            type="slider-range"
          />
        )}
        {activeFilter === '층수' && (
          <FilterDropdown 
            filterName="층수" 
            options={FLOOR_OPTIONS} 
            onSelect={handleDropdownSelect} 
            type="chip-select"
          />
        )}
        {activeFilter === '면적' && (
          <FilterDropdown 
            filterName="면적" 
            options={AREA_OPTIONS} 
            onSelect={handleDropdownSelect} 
            type="chip-select"
          />
        )}
        {activeFilter === '주차대수' && (
          <FilterDropdown 
            filterName="주차대수" 
            options={PARKING_OPTIONS} 
            onSelect={handleDropdownSelect} 
            type="chip-select"
          />
        )}
      </div>
    </div>
  );
};

export default FilterBar;