// src/components/search/FilterDropdown.jsx

import React, { useState } from 'react';

// 드롭다운 공통 스타일
const dropdownStyle = {
  position: 'absolute',
  backgroundColor: 'white',
  border: '1px solid #646cff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  padding: '20px',
  marginTop: '5px',
  zIndex: 100,
  minWidth: '400px',
};

// 칩 버튼 공통 스타일
const chipStyle = (isSelected) => ({
  padding: '10px 15px',
  margin: '5px',
  backgroundColor: isSelected ? '#646cff' : '#f0f0f0',
  color: isSelected ? 'white' : '#333',
  border: '1px solid #ddd',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  display: 'inline-block',
  textAlign: 'center',
});

// 아이콘/칩 그리드 렌더링
const renderGridOptions = (options, filterName, currentSelection, onSelect) => {
  // 업종의 경우 큰 분류(외식업 등)와 작은 분류(한식 등)가 있으나, 여기서는 단순화하여 칩 형태로만 구현합니다.
  const handleChipClick = (value) => {
    // 다중 선택 가능 필터 (예: 테마)
    if (filterName === '테마') {
      const isSelected = currentSelection.includes(value);
      const newSelection = isSelected 
        ? currentSelection.filter(item => item !== value)
        : [...currentSelection, value];
      onSelect(filterName, newSelection);
    } 
    // 단일 선택 필터 (예: 층수, 면적, 주차대수)
    else {
      onSelect(filterName, value);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {options.map(option => {
        const value = typeof option === 'string' ? option : option.name;
        const isSelected = Array.isArray(currentSelection) 
          ? currentSelection.includes(value) 
          : currentSelection === value;

        return (
          <div 
            key={value} 
            style={chipStyle(isSelected)} 
            onClick={() => handleChipClick(value)}
          >
            {value}
            {/* 아이콘 타입의 경우 이 안에 아이콘을 추가합니다. */}
          </div>
        );
      })}
    </div>
  );
};

// 금액 범위 슬라이더 렌더링
const renderSliderRange = (filterName, onSelect) => {
  // 실제 슬라이더 컴포넌트 대신 단순 입력 필드로 대체
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000); // 1억 가정

  const handleApply = () => {
    onSelect(filterName, { min: minPrice, max: maxPrice });
  };

  const inputStyle = { padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100px' };

  return (
    <div>
      <h4 style={{ margin: '0 0 10px 0' }}>권리금 (만원)</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} style={inputStyle} />
        <span>~</span>
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={inputStyle} />
      </div>
      
      {/* 월세, 보증금도 비슷하게 구현 (생략) */}

      <button 
        onClick={handleApply} 
        style={{ padding: '10px 20px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        적용하기
      </button>
    </div>
  );
};


const FilterDropdown = ({ filterName, options = [], onSelect, type, currentSelection = [] }) => {
  let content;

  // 필터 타입별 렌더링
  switch (type) {
    case 'icon-grid':
    case 'simple-grid':
    case 'chip-select':
      content = renderGridOptions(options, filterName, currentSelection, onSelect);
      break;
    case 'slider-range':
      content = renderSliderRange(filterName, onSelect);
      break;
    default:
      content = <p>선택 항목이 없습니다.</p>;
  }

  return (
    <div style={dropdownStyle}>
      <h3 style={{ marginTop: 0 }}>{filterName} 선택</h3>
      {content}
    </div>
  );
};

export default FilterDropdown;