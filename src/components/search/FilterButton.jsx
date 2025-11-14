// src/components/search/FilterButton.jsx
import React from 'react';
const FilterButton = ({ name, isActive, onClick, isToggle = false }) => {
  const buttonStyle = {
    padding: '8px 15px',
    backgroundColor: isActive ? '#f0f0ff' : 'white', // 활성화 시 배경색 변경
    color: isActive ? '#646cff' : '#333',         // 활성화 시 글자색 변경
    border: `1px solid ${isActive ? '#646cff' : '#ddd'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  };

  return (
    <button 
      onClick={onClick} 
      style={buttonStyle}
    >
      {name}
    </button>
  );
};

export default FilterButton;