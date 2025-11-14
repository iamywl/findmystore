// src/components/search/NaverMapLoader.jsx

import React, { useState, useEffect, useRef } from 'react';

// 지도 렌더링을 담당하는 핵심 컴포넌트
const NaverMapRenderer = ({ listings, facilityToggles, onMapBoundsChange }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // 이미 인스턴스가 생성되었거나 naver 객체가 없으면 종료
    if (!mapRef.current || !window.naver || mapInstanceRef.current) return;
    
    // 1. 지도 초기화 및 렌더링
    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
      zoom: 13,
      minZoom: 10,
    });
    mapInstanceRef.current = map;
    
    // 2. 지도 경계 변경 이벤트 리스너 (검색 동기화)
    window.naver.maps.Event.addListener(map, 'idle', () => {
      const bounds = map.getBounds();
      onMapBoundsChange(bounds); 
    });

    // 3. 마커 및 주변 시설 로직 (TODO)
    // console.log("지도 렌더링 완료. 마커/시설 로직 구현 필요.");

    return () => {
        // 컴포넌트 언마운트 시 리스너 정리
        window.naver.maps.Event.clearInstanceListeners(map);
    };

  }, [onMapBoundsChange]); 
  
  // 마커 업데이트 로직 (데이터 변경 시)
  useEffect(() => {
      if (mapInstanceRef.current) {
          // console.log(`마커/시설 데이터 업데이트: ${listings.length}개 매물`);
      }
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
    // API 로드 완료 시점을 감지
    const checkNaverMapLoaded = () => {
        if (window.naver && window.naver.maps) {
            setIsLoaded(true);
            return true;
        }
        return false;
    };

    if (checkNaverMapLoaded()) return;
    
    // 100ms 간격으로 API 로딩을 폴링하여 완료 시점을 감지
    const interval = setInterval(() => {
        if (checkNaverMapLoaded()) {
            clearInterval(interval);
        }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', // 높이 100% 확보
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        color: '#666',
        fontSize: '1.2em'
      }}>
        지도 로딩 중...
      </div>
    );
  }

  return <NaverMapRenderer {...props} />;
};

export default NaverMapLoader;