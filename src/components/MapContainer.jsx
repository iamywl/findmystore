// src/components/MapContainer.jsx (zustand 통합 및 마커 추가)

import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/store';

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

const MapContainer = () => {
  const mapElement = useRef(null);
  const mapInstance = useRef(null); // 지도 객체를 저장
  const markersRef = useRef([]); // 마커 객체들을 저장
  
  const [mapLoaded, setMapLoaded] = useState(false);
  const stores = useStore((state) => state.stores); // 전역 매물 데이터 가져오기

  // 1. 지도 스크립트 로드 로직 (이전 단계에서 최종 해결한 코드)
  useEffect(() => {
    if (!NAVER_CLIENT_ID || NAVER_CLIENT_ID.length < 5) return;
    if (window.naver && window.naver.maps) {
      setMapLoaded(true);
      return;
    }

    const mapScript = document.createElement('script');
    mapScript.type = 'text/javascript';
    mapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${NAVER_CLIENT_ID}&submodules=geocoding`;
    mapScript.async = true;
    mapScript.onload = () => setMapLoaded(true);
    document.head.appendChild(mapScript);
  }, []);

  // 2. 지도 초기화 및 이벤트 리스너 설정
  useEffect(() => {
    if (mapLoaded && window.naver && mapElement.current) {
      const { naver } = window;
      
      // 지도 초기화
      const map = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(37.5501, 127.0734), // 건대입구 근처 초기 중심
        zoom: 15,
        mapTypeControl: true,
        scaleControl: false,
        zoomControl: true,
      });

      mapInstance.current = map; // 지도 객체 저장
    }
  }, [mapLoaded]);
  
  // 3. 마커 렌더링 및 동기화
  useEffect(() => {
    if (!mapInstance.current || !window.naver) return;
    const naver = window.naver;
    const map = mapInstance.current;
    
    // 이전 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    // 새 마커 추가
    stores.forEach(store => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(store.lat, store.lng),
        map: map,
        // 여기에 마커 아이콘 커스터마이징 로직 추가 가능
      });
      markersRef.current.push(marker);
    });
    
  }, [stores, mapLoaded]); // stores 데이터가 변경될 때마다 마커 업데이트

  if (!mapLoaded && !NAVER_CLIENT_ID) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: 'red', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e0e0e0' }}>
            ❌ API 키 누락: .env 파일을 확인하고 유효한 Maps 신규 Client ID를 사용하세요.
        </div>
      );
  }
  
  return (
    <div 
      ref={mapElement} 
      style={{ width: '100%', height: '100%' }}
    >
      {/* 로딩 중 메시지 */}
      {!mapLoaded && (
        <div style={{ padding: '20px', textAlign: 'center', background: '#f0f0f0', color: '#333', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          지도를 로드하고 있습니다...
        </div>
      )}
    </div>
  );
};

export default MapContainer;