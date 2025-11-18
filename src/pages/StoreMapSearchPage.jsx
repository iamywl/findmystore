// src/components/search/NaverMapLoader.jsx

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import NaverMapLoader from '../components/search/NaverMapLoader'; 
import MapSection from '../components/search/MapSection';
import FilterBar from '../components/search/FilterBar';
import { useNavigate } from 'react-router-dom';

// ====================================================================
// 🚨 데이터 생성 함수 (이 파일로 이동)
// ====================================================================

const generateMockListings = () => {
    const NUMBER_OF_LISTINGS = 1000;
    // 서울시청 근처를 중심으로 넓게 분포
    const baseLat = 37.5665;
    const baseLng = 126.9780; 
    const districts = ['마포구', '서대문구', '용산구', '종로구', '강남구', '송파구'];
    const mockListings = [];

    for (let id = 1; id <= NUMBER_OF_LISTINGS; id++) {
        const latOffset = (Math.random() - 0.5) * 0.2;
        const lngOffset = (Math.random() - 0.5) * 0.4;
        const lat = baseLat + latOffset;
        const lng = baseLng + lngOffset;
        const deposit = (id % 15) * 500 + 500; // 500만 ~ 7500만
        const rent = (id % 7) * 40 + 80;       // 80만 ~ 320만
        const district = districts[id % districts.length];

        mockListings.push({
            id, lat, lng, district, deposit, rent,
            compared: false, // 비교하기 상태 추가
            // 왼쪽 목록 표기를 위한 예시 정보 추가
            type: districts[id % 3] + ' 매물',
            priceInfo: `보증금 ${deposit} / 월세 ${rent}`,
            floor: `${(id % 5) + 1}층`,
            area: `${(id % 10) + 10}평`,
        });
    }
    return mockListings;
};

// FilterTag 컴포넌트 (StoreMapSearchPage.jsx 내부)
const FilterTag = ({ label, onRemove }) => (
    <div style={{
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


const StoreMapSearchPage = () => {
    const navigate = useNavigate();
    
    // 🚨 FIX: 초기 데이터 로드 및 로딩 상태 관리
    const [listings, setListings] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 데이터 생성 및 상태 설정
        const initialListings = generateMockListings();
        setListings(initialListings);
        setIsLoading(false);
        console.log("DEBUG: 최종 데이터 로드 완료. 목록/지도에 모두 사용됨 (길이:", initialListings.length, ")");
    }, []); 


    const [filters, setFilters] = useState({ 
        업종: [],
        매출증빙: false,
        테마: [],
        금액: {min: null, max: null}, 
        층수: null,
        면적: null,
        주차대수: null,
    }); 
    const [facilityToggles, setFacilityToggles] = useState({
        subway: false,
        school: false,
        hospital: false,
    });

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value,
        }));
        
        // 🌟 TODO: 여기에 실제 필터링 로직 (listings 상태 업데이트)이 들어가야 합니다.
    };

    const handleRemoveFilter = (filterName, specificValue = null) => {
        if (filterName === '매출증빙') {
            handleFilterChange(filterName, false);
        } else if (Array.isArray(filters[filterName])) {
            if (specificValue) {
                const newValues = filters[filterName].filter(v => v !== specificValue);
                handleFilterChange(filterName, newValues);
            } else {
                handleFilterChange(filterName, []);
            }
        } else if (filterName === '금액') {
            handleFilterChange(filterName, {min: null, max: null}); 
        } else {
            handleFilterChange(filterName, null);
        }
    };

    const handleFacilityToggle = (facilityName) => {
        setFacilityToggles(prev => ({
            ...prev,
            [facilityName]: !prev[facilityName],
        }));
    };

    const handleCompareToggle = (id) => {
        setListings(prev => 
            prev.map(item => 
                item.id === id ? { ...item, compared: !item.compared } : item
            )
        );
    };
    
    // 일반 매물 검색 페이지: 마커 클릭 시 매물 상세 페이지로 이동 (임시 콘솔 로그)
    const handleMarkerClick = (listingId) => {
        // navigate(`/listing/${listingId}`); 
        console.log(`매물 상세 페이지로 이동 요청: /listing/${listingId}`);
    };

    const comparedListings = listings.filter(item => item.compared);
    
    const activeFilters = useMemo(() => {
        const tags = [];
        if (filters.매출증빙) tags.push({ key: '매출증빙', label: '매출증빙 매물' });
        filters.업종.forEach(item => { tags.push({ key: `업종-${item}`, label: `업종: ${item}`, filterName: '업종', specificValue: item }); });
        filters.테마.forEach(theme => { tags.push({ key: `테마-${theme}`, label: `테마: ${theme}`, filterName: '테마', specificValue: theme }); });
        if (filters.금액.min || filters.금액.max) {
            const min = filters.금액.min ? `${filters.금액.min}만원` : '최소';
            const max = filters.금액.max ? `${filters.금액.max}만원` : '최대';
            tags.push({ key: '금액', label: `금액: ${min} ~ ${max}` });
        }
        if (filters.층수) tags.push({ key: '층수', label: `층수: ${filters.층수}` });
        if (filters.면적) tags.push({ key: '면적', label: `면적: ${filters.면적}` });
        if (filters.주차대수) tags.push({ key: '주차대수', label: `주차대수: ${filters.주차대수}` });

        return tags;
    }, [filters]);
    
    if (isLoading) {
        return <div style={{textAlign: 'center', padding: '100px', fontSize: '18px'}}>데이터 로드 중...</div>;
    }


    return (
        <div style={{ padding: '0 20px', backgroundColor: '#f9f9f9', flexGrow: 1 }}> 
            
            {/* 검색 입력창 섹션 (상단) */}
            <div style={{ margin: '0 auto', paddingTop: '20px' }}> 
                <div style={{ 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px',
                    border: '1px solid #ddd', borderRadius: '8px', padding: '10px 15px', backgroundColor: 'white'
                }}>
                    <input 
                        type="text" 
                        placeholder="지역, 상호명을 입력해주세요" 
                        style={{ flexGrow: 1, border: 'none', outline: 'none', fontSize: '16px' }} 
                    />
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>🔍</button>
                </div>
            </div>
            
            {/* 필터 태그 영역 */}
            {activeFilters.length > 0 && (
                <div style={{ marginBottom: '20px', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#333' }}>선택 조건:</span>
                    {activeFilters.map(tag => (
                        <FilterTag 
                            key={tag.key} 
                            label={tag.label} 
                            onRemove={() => handleRemoveFilter(tag.filterName || tag.key, tag.specificValue)} 
                        />
                    ))}
                </div>
            )}

            {/* 필터 바 (FilterBar) */}
            <div style={{ margin: '0 auto', marginBottom: '20px' }}>
                <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            </div>


            {/* 지도 및 매물 목록 섹션 */}
            <MapSection 
                listings={listings} // 🌟 전체 데이터를 MapSection으로 전달
                facilityToggles={facilityToggles} 
                onFacilityToggle={handleFacilityToggle}
                onCompareToggle={handleCompareToggle}
                onMarkerClick={handleMarkerClick} 
                comparedListings={comparedListings}
                isCommercialMap={false}
            />
            
        </div>
    );
};

export default StoreMapSearchPage;