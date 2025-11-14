// src/components/search/NaverMapLoader.jsx

import React, { useState, useEffect, useRef } from 'react';

// 지도 렌더링을 담당하는 핵심 컴포넌트
const NaverMapRenderer = ({ listings, facilityToggles, onMapBoundsChange }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || !window.naver || mapInstanceRef.current) return;
    
    // 1. 지도 초기화 및 렌더링
    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.5665, 126.9780), // 초기 서울 중심 좌표
      zoom: 13,
      minZoom: 10,
    });
    mapInstanceRef.current = map;

    // 2. 지도 경계 변경 이벤트 리스너 (검색 동기화)
    window.naver.maps.Event.addListener(map, 'idle', () => {
      const bounds = map.getBounds();
      onMapBoundsChange(bounds); // 부모 컴포넌트에 경계 정보 전달
    });

    // 3. 마커 및 주변 시설 로직 (TODO: 여기에 마커를 생성하는 코드를 넣으세요.)
    // console.log(`마커 표시: ${listings.length}개, 시설 토글:`, facilityToggles);

    return () => {
        // 컴포넌트 언마운트 시 리스너 정리
        window.naver.maps.Event.clearInstanceListeners(map);
    };

  }, [listings, facilityToggles]); 

  return (
    <div 
        ref={mapRef} 
        style={{ width: '100%', height: '100%', borderRadius: '12px' }} 
    />
  );
};


const NaverMapLoader = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // window.naver 객체가 정의되면 API 로딩 완료로 간주
    if (window.naver && window.naver.maps) {
      setIsLoaded(true);
      return;
    }
    
    // API 로드 완료를 감지하는 리스너 설정
    const interval = setInterval(() => {
        if (window.naver && window.naver.maps) {
            setIsLoaded(true);
            clearInterval(interval);
        }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        color: '#666' 
      }}>
        지도 로딩 중...
      </div>
    );
  }

  return <NaverMapRenderer {...props} />;
};

export default NaverMapLoader;