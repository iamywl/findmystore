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
  color: '#333', // 🚨 수정: 드롭다운 내부 글자색을 검은색 계열로 지정
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
  const handleChipClick = (value) => {
    if (filterName === '테마' || filterName === '업종') {
      // 다중 선택 가능 필터
      const isSelected = currentSelection.includes(value);
      const newSelection = isSelected 
        ? currentSelection.filter(item => item !== value)
        : [...currentSelection, value];
      onSelect(filterName, newSelection);
    } else {
      // 단일 선택 필터 (층수, 면적, 주차대수)
      // 🚨 수정: 이미 선택된 항목을 다시 클릭하면 해제합니다.
      const newValue = currentSelection === value ? null : value;
      onSelect(filterName, newValue);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      {options.map(option => {
        const value = typeof option === 'string' ? option : option.name;
        
        // 🚨 상태 확인 로직 수정
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
          </div>
        );
      })}
    </div>
  );
};

// 금액 범위 슬라이더 렌더링
const renderSliderRange = (filterName, onSelect, currentSelection) => {
  // 현재 선택 값으로 초기화
  const [minPrice, setMinPrice] = useState(currentSelection.min || 0);
  const [maxPrice, setMaxPrice] = useState(currentSelection.max || 10000); // 1억 가정 (단위: 만원)

  const handleApply = () => {
    onSelect(filterName, { 
        min: minPrice > 0 ? minPrice : null, 
        max: maxPrice < 10000 ? maxPrice : null 
    });
  };

  const inputStyle = { padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100px', color: '#333' };

  return (
    <div>
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>권리금 (만원)</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <input type="number" placeholder="최소" value={minPrice || ''} onChange={(e) => setMinPrice(Number(e.target.value))} style={inputStyle} />
        <span>~</span>
        <input type="number" placeholder="최대" value={maxPrice || ''} onChange={(e) => setMaxPrice(Number(e.target.value))} style={inputStyle} />
      </div>
      
      <button 
        onClick={handleApply} 
        style={{ padding: '10px 20px', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        적용하기
      </button>
    </div>
  );
};


const FilterDropdown = ({ filterName, options = [], onSelect, type, currentSelection }) => {
  let content;

  switch (type) {
    case 'icon-grid':
    case 'simple-grid':
    case 'chip-select':
      content = renderGridOptions(options, filterName, currentSelection, onSelect);
      break;
    case 'slider-range':
      content = renderSliderRange(filterName, onSelect, currentSelection);
      break;
    default:
      content = <p style={{color: '#333'}}>선택 항목이 없습니다.</p>;
  }

  return (
    <div style={dropdownStyle}>
      <h3 style={{ marginTop: 0, color: '#333' }}>{filterName} 선택</h3>
      {content}
    </div>
  );
};

export default FilterDropdown;