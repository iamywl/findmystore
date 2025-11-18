// src/pages/CommercialAnalysisPage.jsx

import React, { useState, useMemo } from 'react';
import NaverMapLoader from '../components/search/NaverMapLoader'; 
import AnalysisPage from './AnalysisPage'; // 보고서 템플릿 재활용

// 🚨 주의: 아래 initialMockListings는 StoreMapSearchPage에서 가져오는 데이터와 다를 수 있습니다.
// 여기서는 데이터 유실 방지를 위해 generateMockListings 함수를 다시 정의합니다.
const generateMockListings = () => {
    // NaverMapLoader와 동일한 데이터 구조를 따르도록 합니다.
    const mockListings = [];
    const districts = ['마포구', '서대문구', '용산구', '종로구', '강남구', '송파구'];
    const baseLat = 37.5665;
    const baseLng = 126.9780;
    
    for (let id = 1; id <= 100; id++) { // 분석 페이지는 소수 데이터만 사용
        const lat = baseLat + (Math.random() - 0.5) * 0.05;
        const lng = baseLng + (Math.random() - 0.5) * 0.1;
        const deposit = (id % 15) * 500 + 500;
        const rent = (id % 7) * 40 + 80;
        const district = districts[id % districts.length];

        mockListings.push({
            id, lat, lng, district, deposit, rent,
            label: `분석 매물 ${id}`,
            isCommercialMap: true,
        });
    }
    return mockListings;
};

// FilterTag 컴포넌트 (StoreMapSearchPage에서 재활용되는 경우)
const FilterTag = ({ label, onRemove }) => (
    <div style={{
        /* ... 스타일 유지 ... */
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#646cff',
        color: 'white',
        borderRadius: '16px',
        padding: '5px 12px',
        marginRight: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'default',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '5px',
    }}>
        {label}
        <button 
            onClick={onRemove}
            style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '16px',
                marginLeft: '8px',
                cursor: 'pointer',
                padding: '0',
                lineHeight: '1'
            }}
        >
            ×
        </button>
    </div>
);


// 상권 분석 페이지 (지도와 보고서 통합)
const CommercialAnalysisPage = () => {
    
    // 🚨 1. 현재 선택된 상권/매물 ID 상태
    const [selectedId, setSelectedId] = useState(1); 
    
    // 🚨 2. 지도에 표시할 마커 데이터 (NaverMapLoader에 전달할 데이터)
    // 여기서는 100개의 분석용 더미 데이터를 사용합니다.
    const mapListings = useMemo(() => generateMockListings(), []); 

    // 🚨 3. 지도 이벤트 핸들러 (마커 클릭 시 ID 업데이트)
    const handleMapMarkerClick = (id) => {
        setSelectedId(id);
        console.log(`상권 분석 보고서 ID: ${id}로 업데이트`);
    };

    const handleMapBoundsChange = () => {
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
                    
                    {/* Naver Map Loader 컴포넌트 (isLoaded 체크 없이 직접 렌더링) */}
                    <NaverMapLoader 
                        listings={mapListings} 
                        onMapBoundsChange={handleMapBoundsChange}
                        onMarkerClick={handleMapMarkerClick} // 🚨 클릭 이벤트 전달
                        isAnalysisMode={true} // 🚨 분석 모드 활성화 (단순 마커 렌더링)
                        facilityToggles={{}}
                    />
                </div>

                {/* 2. 분석 보고서 영역 (우측, 50% 너비) */}
                <div style={{ flex: 1, minWidth: '45%', overflowY: 'auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <AnalysisPage analysisId={selectedId} isEmbedded={true} /> 
                </div>
            </div>
        </div>
    );
};

export default CommercialAnalysisPage;