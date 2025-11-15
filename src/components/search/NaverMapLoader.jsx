// src/components/search/NaverMapLoader.jsx

import React, { useState, useEffect, useRef } from 'react';

// 지도 렌더링을 담당하는 핵심 컴포넌트
const NaverMapRenderer = ({ listings, facilityToggles, onMapBoundsChange }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]); // 마커 인스턴스를 저장할 배열
  const infowindowRef = useRef(null); // 🚨 정보 창 인스턴스 (하나만 사용)

  // 정보 창 생성 함수
  const createInfoWindow = () => {
      if (!window.naver) return null;
      // InfoWindow 인스턴스를 하나만 생성하여 재활용합니다.
      return new window.naver.maps.InfoWindow({
          content: '', // 초기 내용 비움
          maxWidth: 250,
          backgroundColor: "#fff",
          borderColor: "#2d54ff",
          borderWidth: 2,
          anchorSize: new window.naver.maps.Size(10, 10),
          anchorSkew: true,
          pixelOffset: new window.naver.maps.Point(0, -10),
          zIndex: 100
      });
  };

  const createMarkers = (map, listings) => {
    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    if (!window.naver) return;

    // 정보 창 인스턴스 확인 및 생성 (최초 1회)
    if (!infowindowRef.current) {
        infowindowRef.current = createInfoWindow();
    }
    const infowindow = infowindowRef.current;

    listings.forEach(listing => {
        if (!listing.lat || !listing.lng) return;

        const position = new window.naver.maps.LatLng(listing.lat, listing.lng);

        const marker = new window.naver.maps.Marker({
            position: position,
            map: map,
            title: `${listing.type} (${listing.area})`,
            icon: {
                url: 'https://navermaps.github.io/maps.js/docs/data/pointer_blue.png', 
                size: new window.naver.maps.Size(22, 35),
                anchor: new window.naver.maps.Point(11, 35)
            }
        });

        // 🚨 마커 클릭 이벤트 리스너 추가: 정보 창 표시
        window.naver.maps.Event.addListener(marker, 'click', () => {
            const content = `
                <div style="padding:10px; font-size: 14px; color: #333; line-height: 1.4;">
                    <strong style="color: #646cff;">${listing.type} 매물 (${listing.area})</strong><br>
                    금액: ${listing.price}<br>
                    <span style="color: #888; font-size: 12px;">클릭 시 상세 이동 (미구현)</span>
                </div>
            `;
            infowindow.setContent(content);
            infowindow.open(map, marker);
        });

        markersRef.current.push(marker);
    });

    // 맵 클릭 시 정보 창 닫기
    window.naver.maps.Event.addListener(map, 'click', (e) => {
        if (infowindow.getMap()) {
            infowindow.close();
        }
    });

  };


  useEffect(() => {
    // 이미 인스턴스가 생성되었거나 naver 객체가 없으면 종료
    if (!mapRef.current || !window.naver || mapInstanceRef.current) return;
    
    // 1. 지도 초기화 및 렌더링
    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.54, 127.00), 
      zoom: 12, 
      minZoom: 10,
    });
    mapInstanceRef.current = map;
    
    // 2. 지도 경계 변경 이벤트 리스너 (검색 동기화)
    window.naver.maps.Event.addListener(map, 'idle', () => {
      const bounds = map.getBounds();
      onMapBoundsChange(bounds); 
    });

    // 3. 초기 마커 생성
    createMarkers(map, listings);
    
    return () => {
        // 컴포넌트 언마운트 시 정리
        window.naver.maps.Event.clearInstanceListeners(map);
        markersRef.current.forEach(marker => marker.setMap(null));
        if (infowindowRef.current) {
            infowindowRef.current.close();
            infowindowRef.current = null;
        }
    };

  }, [onMapBoundsChange]); 
  
  // 마커 업데이트 로직 (데이터 변경 시)
  useEffect(() => {
      if (mapInstanceRef.current && window.naver) {
          createMarkers(mapInstanceRef.current, listings);
          // TODO: facilityToggles에 따른 주변 시설 마커 토글 로직 추가
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
        height: '100%', 
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