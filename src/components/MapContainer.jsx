// src/components/MapContainer.jsx (import.meta.env 복구 및 최종 안정화)

import React from 'react';
import {
  Container as NaverMapContainer, // 이름 변경 (React DOM 오류 방지)
  NaverMap,
  useNavermaps,
} from 'react-naver-maps';

// 🚨 import.meta.env 사용으로 복구
const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

// 지도 뷰 컴포넌트
const MapViewComponent = () => {
  const navermaps = useNavermaps(); 
  const defaultCenter = { lat: 37.5665, lng: 126.9780 };

  return (
    <NaverMap
      defaultCenter={new navermaps.LatLng(defaultCenter.lat, defaultCenter.lng)}
      defaultZoom={15}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

// 메인 Wrapper 컴포넌트: Client ID 체크 및 컨테이너 로드 담당
const MapWrapper = () => {
    // Client ID 검사: Client ID가 없을 경우 경고 메시지 반환
    if (!NAVER_CLIENT_ID || NAVER_CLIENT_ID.length < 5) {
        return (
            <div style={{ padding: '20px', textAlign: 'center', color: 'red', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e0e0e0' }}>
               ❌ 네이버 지도 Client ID가 설정되지 않았습니다. (Docker 환경 변수 확인)
            </div>
        );
    }

    return (
        <NaverMapContainer 
            ncpClientId={NAVER_CLIENT_ID} 
            submodules={['geocoding']} 
            style={{ width: '100%', height: '100%' }} 
        >
            <MapViewComponent /> 
        </NaverMapContainer>
    );
};

export default MapWrapper;