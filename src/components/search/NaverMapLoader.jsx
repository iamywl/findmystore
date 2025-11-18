import React, { useState, useEffect, useRef, useCallback } from 'react';

// ====================================================================
// 1. 유틸리티 및 데이터 생성 함수 (루프 버그 수정 완료)
// ====================================================================

const formatPrice = (price) => {
    if (price >= 10000) {  
        return `${(price / 10000).toFixed(1)}억`.replace(/\.0억$/, '억');
    } else if (price > 0) {  
        return `${price}만`;
    }
    return '0';
};

const generateMockListings = () => {
    const NUMBER_OF_LISTINGS = 1000;
    const baseLat = 37.5665;
    const baseLng = 126.9780;
    const districts = ['마포구', '서대문구', '용산구', '종로구', '강남구', '송파구'];
    const mockListings = [];

    // 🚨 FIX: for (let id = 1; id <= NUMBER_OF_LISTINGS; id++)로 수정 완료
    for (let id = 1; id <= NUMBER_OF_LISTINGS; id++) { 
        const latOffset = (Math.random() - 0.5) * 0.2;
        const lngOffset = (Math.random() - 0.5) * 0.4;
        const lat = baseLat + latOffset;
        const lng = baseLng + lngOffset;
        const deposit = (id % 15) * 500 + 500;
        const rent = (id % 7) * 40 + 80;
        const district = districts[id % districts.length];

        mockListings.push({
            id, lat, lng, district, deposit, rent,
            label: id + '번 매물'
        });
    }
    return mockListings;
};

// ====================================================================
// 2. 클러스터링 논리 함수
// ====================================================================

// 격자(Grid) 기반 동적 클러스터링 (분할 역할)
const getClusteredMarkersByGrid = (listings, zoom) => {
    if (!listings || listings.length === 0) return [];
    
    // 🚨 FIX: GRID_SIZE를 0.01로 조정하여 분할 민감도를 높입니다.
    const GRID_SIZE = 0.01 / Math.pow(2, zoom - 12); 
    
    const clusters = {};

    listings.forEach(listing => {
        const latKey = Math.floor(listing.lat / GRID_SIZE);
        const lngKey = Math.floor(listing.lng / GRID_SIZE);
        const clusterKey = `${latKey}_${lngKey}`; 
        
        if (!clusters[clusterKey]) { clusters[clusterKey] = { latSum: 0, lngSum: 0, count: 0, totalDeposit: 0, totalRent: 0, }; }
        clusters[clusterKey].count++;
        clusters[clusterKey].totalDeposit += (listing.deposit || 0);
        clusters[clusterKey].totalRent += (listing.rent || 0);
        clusters[clusterKey].latSum += listing.lat;
        clusters[clusterKey].lngSum += listing.lng;
    });

    return Object.keys(clusters).map(key => {
        const cluster = clusters[key];
        return {
            id: key, lat: cluster.latSum / cluster.count, lng: cluster.lngSum / cluster.count,
            count: cluster.count, avgDeposit: Math.floor(cluster.totalDeposit / cluster.count), 
            avgRent: Math.floor(cluster.totalRent / cluster.count), label: cluster.count + '개',
        };
    }).filter(c => c.count > 0);
};

// 지역구(District) 기반 클러스터링 (병합 역할)
const getClusteredMarkersByDistrict = (listings) => {
    if (!listings || listings.length === 0) return [];

    const clusters = {};

    listings.forEach(listing => {
        const clusterKey = listing.district; 
        if (!clusterKey) return; 

        if (!clusters[clusterKey]) { clusters[clusterKey] = { latSum: 0, lngSum: 0, count: 0, totalDeposit: 0, totalRent: 0, }; }
        clusters[clusterKey].count++;
        clusters[clusterKey].totalDeposit += (listing.deposit || 0);
        clusters[clusterKey].totalRent += (listing.rent || 0);
        clusters[clusterKey].latSum += listing.lat;
        clusters[clusterKey].lngSum += listing.lng;
    });

    return Object.keys(clusters).map(key => {
        const cluster = clusters[key];
        return {
            id: key, lat: cluster.latSum / cluster.count, lng: cluster.lngSum / cluster.count,
            count: cluster.count, avgDeposit: Math.floor(cluster.totalDeposit / cluster.count), 
            avgRent: Math.floor(cluster.totalRent / cluster.count), label: key,
        };
    }).filter(c => c.count > 0);
};


// ====================================================================
// 3. 지도 렌더링 컴포넌트
// ====================================================================

const NaverMapRenderer = ({ listings, onMapBoundsChange, onMarkerClick, isAnalysisMode }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);

    // Custom Overlay 생성 함수
    const createCustomOverlay = useCallback((listing, map) => {
        if (!window.naver) return null;
        
        const count = listing.count;
        const avgDeposit = listing.avgDeposit;
        const avgRent = listing.avgRent;
        const mainLabel = `보 ${formatPrice(avgDeposit)}`; 
        const subLabel = `월 ${formatPrice(avgRent)} | ${listing.label}`; 
        const safeId = listing.id;

        function CustomMarker(options) { this.setValues(options); }
        CustomMarker.prototype = new window.naver.maps.OverlayView();
        
        CustomMarker.prototype.onAdd = function() {
            const element = document.createElement('div');
            element.style.position = 'absolute';
            element.style.pointerEvents = 'auto';

            element.innerHTML = `
                <div style="position: absolute; bottom: 32px; left: 50%; transform: translate(-50%); pointer-events: auto;">
                    <div id="marker-${safeId}" style="
                        background-color: #5d54ff;  color: white;  border-radius: 4px;  padding: 6px 10px;  
                        text-align: center;  box-shadow: 0 2px 5px rgba(0,0,0,0.4);  min-width: 120px;  
                        cursor: pointer; white-space: nowrap; font-family: inherit;">
                        <span style="font-size: 14px; font-weight: bold; display: block;">${mainLabel}</span>
                        <span style="font-size: 10px; display: block;">${subLabel}</span>
                        <div style="
                            position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%) rotate(45deg);  
                            width: 10px; height: 10px; background: #5d54ff;
                        "></div>
                    </div>
                    <img src="https://navermaps.github.io/maps.js/docs/data/pointer_blue.png" style="
                        position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 20px; height: 32px; pointer-events: none;
                    "/>
                </div>
            `;
            
            element.addEventListener('click', (e) => { e.stopPropagation(); console.log(`Clicked cluster/listing ID: ${safeId}`); 
                if (onMarkerClick) onMarkerClick(safeId); 
            });
            this._element = element;  
            this.getPanes().overlayLayer.appendChild(this._element);
        };
        
        CustomMarker.prototype.draw = function() {
            if (!this.getMap() || !this._element) return;
            const position = this.getPosition();
            const projection = this.getProjection();
            const point = projection.fromCoordToOffset(position);

            this._element.style.left = point.x + 'px';
            this._element.style.top = point.y + 'px';
        };
        
        CustomMarker.prototype.getPosition = function() { return this.get('position'); };
        CustomMarker.prototype.onRemove = function() {
            if (this._element && this._element.parentNode) {
                this._element.parentNode.removeChild(this._element);
                this._element = null;
            }
        };

        const customMarker = new CustomMarker({
            position: new window.naver.maps.LatLng(listing.lat, listing.lng),
            map: map,
        });
        
        return customMarker;
    }, [formatPrice, onMarkerClick]);

    // 단순 마커 생성 함수 (분석 모드용)
    const createSimpleMarker = useCallback((listing, map, onClick) => {
        if (!window.naver) return null;

        const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(listing.lat, listing.lng),
            map: map,
            icon: {
                url: 'https://navermaps.github.io/maps.js/docs/data/pointer_blue.png',
                size: new window.naver.maps.Size(20, 32),
                anchor: new window.naver.maps.Point(10, 32)
            }
        });
        
        window.naver.maps.Event.addListener(marker, 'click', () => {
            onClick(listing.id);
        });

        return marker;
    }, []);
    
    // 마커 업데이트 함수 (데이터와 줌 레벨에 따라 클러스터링/단순 마커 전환)
    const updateMarkers = useCallback(() => {
        const map = mapInstanceRef.current;
        // 🚨 수정된 Array.isArray 사용
        if (!map || !window.naver || !Array.isArray(listings) || listings.length === 0) return;

        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        const zoomLevel = map.getZoom();
        
        // 🚨 isAnalysisMode가 true이거나 목록이 매우 적을 경우 단순 마커 모드
        if (isAnalysisMode || listings.length < 50) { 
            listings.forEach((listing) => {
                const marker = createSimpleMarker(listing, map, onMarkerClick);
                if(marker) markersRef.current.push(marker);
            });
            if (onMapBoundsChange) { onMapBoundsChange(map.getBounds()); }

        } else {
            // 🚨 일반 검색 모드: 줌 레벨에 따라 클러스터링 전환
            let clusteredListings = [];
            
            if (zoomLevel <= 12) { // 줌 레벨 12 이하: 지역구 기반 클러스터링 (병합)
                clusteredListings = getClusteredMarkersByDistrict(listings);
            } else { // 줌 레벨 13 이상: 격자 기반 클러스터링 (분할)
                clusteredListings = getClusteredMarkersByGrid(listings, zoomLevel);
            }
            
            clusteredListings.forEach((listing) => {
                const customOverlay = createCustomOverlay(listing, map);
                if (customOverlay) {
                    markersRef.current.push(customOverlay);
                }
            });
        }
        
    }, [listings, isAnalysisMode, createCustomOverlay, createSimpleMarker, onMarkerClick, onMapBoundsChange]);

    // 지도 초기화 및 이벤트 리스너 설정
    useEffect(() => {
        if (!mapRef.current || !window.naver || mapInstanceRef.current) return;
        
        const map = new window.naver.maps.Map(mapRef.current, {
            center: new window.naver.maps.LatLng(37.54, 127.00),
            zoom: 12,
            minZoom: 10,
        });
        mapInstanceRef.current = map;
        
        window.naver.maps.Event.addListener(map, 'idle', updateMarkers);
        window.naver.maps.Event.addListener(map, 'zoom_changed', updateMarkers);

        updateMarkers();
        
        return () => {
            window.naver.maps.Event.clearInstanceListeners(map);
        };
    }, [updateMarkers]);

    return (
        <div 
            ref={mapRef} 
            style={{ width: '100%', height: '800px', borderRadius: '12px' }} 
        />
    );
};


// ====================================================================
// 4. 메인 컴포넌트 (NaverMapLoader 이름 사용)
// ====================================================================

const NaverMapLoader = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        const checkNaverMapLoaded = () => {
            if (window.naver && window.naver.maps) {
                setIsLoaded(true);
                return true;
            }
            return false;
        };
        
        if (checkNaverMapLoaded()) return;
        
        const interval = setInterval(() => {
            if (checkNaverMapLoaded()) {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    if (!isLoaded) {
        return (
            <div style={{ width: '100%', height: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2em' }}>
                지도 로딩 중...
            </div>
        );
    }

    return <NaverMapRenderer {...props} />;
};

export default NaverMapLoader;