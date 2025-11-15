// src/components/search/FilterButton.jsx

import React from 'react';

const FilterButton = ({ name, isActive, onClick, isToggle = false }) => {
  const buttonStyle = {
    padding: '8px 15px',
    // 🚨 수정: isActive 상태에 따라 색상 유지
    backgroundColor: isActive ? '#f0f0ff' : 'white', 
    color: isActive ? '#646cff' : '#333',         
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