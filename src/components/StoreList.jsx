// src/components/StoreList.jsx (오류 수정 및 zustand 통합)

import React from 'react';
import StoreCard from './StoreCard.jsx'; // 🚨 수정: 확장자 (.jsx) 명시
import { useStore } from '../store/store'; // Zustand store import

const StoreList = () => {
  // 전역 상태에서 필터링된 매물 목록을 가져옵니다.
  const filteredStores = useStore((state) => state.filteredStores);

  return (
    <div style={{ padding: '0 20px' }}>
      <h2 style={{ fontSize: '1.5em', borderBottom: '2px solid #007bff', paddingBottom: '10px', marginBottom: '20px' }}>
        최신 등록 매물 목록 ({filteredStores.length}건)
      </h2>
      {filteredStores.map(store => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
};

export default StoreList;