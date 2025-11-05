// src/store/store.js

import { create } from 'zustand';

// 매물 데이터 Mockup (이전에 생성한 mockStoresData를 기반으로 확장)
const initialStores = [
  { id: 1, title: '트렌디한 카페', type: '음식점', location: '1층', deposit: 6000, monthlyRent: 279, lat: 37.5501, lng: 127.0734, tags: ['직거래'] }, // 건대입구 근처
  { id: 2, title: '이자카야 자리', type: '요식업', location: '지하', deposit: 3000, monthlyRent: 220, lat: 37.5550, lng: 127.0298, tags: ['부동산'] }, // 성수 근처
  { id: 3, title: '소형 의류 매장', type: '소매업', location: '2층', deposit: 1000, monthlyRent: 140, lat: 37.5412, lng: 127.0501, tags: ['직거래'] }, // 압구정 근처
  { id: 4, title: '사무실 겸용', type: '서비스', location: '3층', deposit: 8000, monthlyRent: 360, lat: 37.5020, lng: 127.0392, tags: ['부동산'] }, // 강남역 근처
  // 여기에 더 많은 데이터를 추가하여 지도에 표시합니다.
];

export const useStore = create((set) => ({
  // 1. 매물 데이터 상태
  stores: initialStores,
  
  // 2. 지도 뷰포트 상태 (현재 지도에서 보이는 영역)
  mapBounds: null,
  
  // 3. 지도와 동기화된 필터링된 매물 목록
  filteredStores: initialStores,

  // 액션: 매물 목록 필터링 (현재는 전체 목록을 반환)
  setMapBounds: (bounds) => {
    // 실제 구현 시: bounds 내의 stores만 필터링하여 filteredStores를 업데이트합니다.
    set({ mapBounds: bounds, filteredStores: initialStores }); 
  },

  // 액션: 매물 데이터 설정 (API 호출 시 사용)
  setStores: (newStores) => set({ stores: newStores, filteredStores: newStores }),

}));