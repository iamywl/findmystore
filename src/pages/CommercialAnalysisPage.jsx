// src/pages/CommercialAnalysisPage.jsx

import React, { useState, useMemo } from 'react';
import NaverMapLoader from '../components/search/NaverMapLoader'; 
import AnalysisPage from './AnalysisPage'; // 보고서 템플릿 재활용
import mockAnalysisData from '../data/mockAnalysisData';
import initialMockListings from '../data/mockListings'; // 지도에 마커를 표시하기 위한 데이터

// 상권 분석 페이지 (지도와 보고서 통합)
const CommercialAnalysisPage = () => {
    // 🚨 1. 현재 선택된 상권/매물 ID 상태 (초기값: 1번 매물)
    const [selectedId, setSelectedId] = useState(1); 
    
    // 🚨 2. 지도에 표시할 마커 데이터 (listings에서 lat, lng가 있는 항목만 추출)
    // 상권 분석 지도에서는 매물 대신 상권 자체의 영역을 표시하지만, 
    // 여기서는 간단하게 상권 데이터를 가진 매물 ID 1~5번만 사용합니다.
    const mapListings = useMemo(() => initialMockListings.filter(l => l.id <= 5), []); 

    // 🚨 3. 지도 이벤트 핸들러 (마커 클릭 시 ID 업데이트)
    const handleMapMarkerClick = (id) => {
        setSelectedId(id);
        console.log(`상권 분석 보고서 ID: ${id}로 업데이트`);
    };

    const handleMapBoundsChange = () => {
        // 상권 분석 지도에서는 지도 이동 시 주변 상권 영역을 동적으로 로드해야 합니다.
        // 현재는 목업 데이터이므로 콘솔에만 출력합니다.
        console.log("상권 영역 로딩 로직 실행 (목업)");
    };

    return (
        <div style={{ padding: '0 20px', backgroundColor: '#f9f9f9', flexGrow: 1, minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', paddingTop: '20px', marginBottom: '20px', color: '#333' }}>
                지도 기반 상권 분석 툴
            </h1>
            
            <div style={{ display: 'flex', height: '80vh', gap: '20px', margin: '0 auto' }}>
                
                {/* 1. 지도 영역 (좌측, 50% 너비) */}
                <div style={{ flex: 1, minWidth: '45%', backgroundColor: '#f5f5f5', borderRadius: '12px', position: 'relative', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    
                    <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 50, background: 'white', padding: '5px 10px', borderRadius: '6px', color: '#333' }}>
                        *마커 클릭 시 보고서 업데이트
                    </div>
                    
                    {/* Naver Map Loader 컴포넌트 */}
                    <NaverMapLoader 
                        listings={mapListings} // 상권 분석을 위해 소수의 데이터만 전달
                        onMapBoundsChange={handleMapBoundsChange}
                        onMarkerClick={handleMapMarkerClick} // 🚨 클릭 이벤트 전달
                        facilityToggles={{}} // 주변 시설 토글은 여기서는 사용하지 않음
                    />
                </div>

                {/* 2. 분석 보고서 영역 (우측, 50% 너비) */}
                <div style={{ flex: 1, minWidth: '45%', overflowY: 'auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <AnalysisPage analysisId={selectedId} isEmbedded={true} /> {/* 🚨 AnalysisPage 임베드 */}
                </div>
            </div>
        </div>
    );
};

export default CommercialAnalysisPage;