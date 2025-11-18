// src/components/search/FloatingMarkerInfo.jsx

import React from 'react';

// 마커 위에 상시 노출될 정보 패널 컴포넌트
const FloatingMarkerInfo = ({ listing, isCommercialMap, onClick }) => {
    
    // 🚨 DEBUG: 이 컴포넌트가 렌더링될 때 listing prop의 내용을 출력합니다.
    console.log("DEBUG: FloatingMarkerInfo received listing:", listing);

    // FIX: listing prop이 유효한지 확인하고, 그렇지 않다면 렌더링을 중단합니다.
    if (!listing) return null; 

    // 클러스터 데이터 존재 여부 확인 (count 속성 사용)
    const isClusteredData = listing.count !== undefined;

    // --- 데이터 준비 ---
    let displayMain;
    let displaySub;

    if (isClusteredData) {
        // 🚨 클러스터링된 데이터 로직
        const avgSales = listing.avgSales || 0;
        const avgRent = listing.avgRent || 0;
        
        displayMain = `${listing.count}개`;
        displaySub = `평균 ${avgSales.toLocaleString()} / 월세 ${avgRent.toLocaleString()}`;
        
    } else {
        // 🚨 일반 매물 데이터 로직 (클러스터링 실패 또는 비활성화 시 대비)
        const safeType = listing.type || '정보 없음';
        const safeArea = listing.area || '';
        const safePrice = listing.price || '가격 정보 없음';
        const safeName = listing.name || '상권 분석 정보';

        displayMain = isCommercialMap
            ? safeName
            : `${safeType}${safeArea ? ' (' + safeArea + ')' : ''}`;
            
        displaySub = safePrice;
    }
    // --- 스타일 및 이벤트 ---

    const baseStyle = {
        position: 'relative',
        bottom: '30px', 
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: '160px',
        padding: '5px 8px',
        background: 'rgba(45, 84, 255, 0.95)',
        color: 'white',
        borderRadius: '4px',
        textAlign: 'center',
        fontSize: '11px',
        fontWeight: '500',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        whiteSpace: 'nowrap',
        zIndex: 10,
    };
    
    const tailStyle = {
        position: 'absolute', 
        bottom: '-5px', 
        left: '50%', 
        transform: 'translateX(-50%) rotate(45deg)', 
        width: '10px', 
        height: '10px', 
        background: 'rgba(45, 84, 255, 0.95)',
        zIndex: -1,
    };

    const handleClick = (e) => {
        e.stopPropagation(); // 지도 클릭 이벤트가 전파되지 않도록 방지
        onClick(listing.id); // 클러스터 ID 또는 매물 ID 전달
    };

    return (
        <div style={{ position: 'absolute' }}>
            <div 
                onClick={handleClick}
                style={baseStyle}
            >
                <span style={{ fontSize: '12px', fontWeight: 'bold', display: 'block' }}>{displayMain}</span>
                <span style={{ fontSize: '10px', display: 'block' }}>{displaySub}</span>
                <div style={tailStyle}></div>
            </div>
        </div>
    );
};

export default FloatingMarkerInfo;