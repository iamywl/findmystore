import React from 'react';

const modalStyle = {
  position: 'absolute',
  bottom: '0',
  left: '0',
  right: '0',
  backgroundColor: 'white',
  borderTop: '2px solid #646cff',
  boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
  padding: '15px 30px',
  zIndex: 100,
  maxWidth: '1200px',
  margin: '0 auto',
  color: '#333', 
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'center',
  color: '#333', 
};

const thStyle = {
  backgroundColor: '#f0f0ff', 
  padding: '10px',
  border: '1px solid #ddd',
  color: '#333',
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  fontWeight: 'normal', 
  color: '#333',
};

const CompareModal = ({ listings }) => {
  // 사용할 실제 데이터 필드와 표시할 이름 정의
  const features = [
    { key: 'id', label: '매물 번호' },
    { key: 'type', label: '업종 (type)' },
    { key: 'area', label: '면적 (area)' },
    { key: 'price', label: '금액 (price)' },
    { key: 'managementFee', label: '관리비' },
    { key: 'parking', label: '주차 대수' },
  ];

  const listingData = listings;

  return (
    <div style={modalStyle}>
      <h3 style={{ marginTop: 0, color: '#646cff' }}>🚨 매물 비교 ({listings.length}개 선택됨)</h3>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>항목</th>
            {listingData.map((l, index) => (
              <th key={l.id} style={thStyle}>
                매물 {index + 1} ({l.id})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map(feature => (
            <tr key={feature.key}>
              <td style={thStyle}>{feature.label}</td>
              {listingData.map(l => (
                <td key={`${l.id}-${feature.key}`} style={tdStyle}>
                  **{l[feature.key] || 'N/A'}**
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <p style={{ textAlign: 'right', fontSize: '12px', color: '#888' }}>
        * 비교 모달은 2개 이상 선택 시 나타납니다.
      </p>
    </div>
  );
};

export default CompareModal;