// src/pages/StoreMapSearchPage.jsx

import React from 'react';

// 지도 및 목록 컴포넌트는 Lazy Loading을 사용합니다.
const MapContainer = React.lazy(() => import('../components/MapContainer.jsx')); 
const StoreList = React.lazy(() => import('../components/StoreList.jsx')); 

const StoreMapSearchPage = () => {
    return (
        <div style={{ display: 'flex', height: 'calc(100vh - 70px)', width: '100%', margin: 0, padding: 0 }}>
            {/* 1. 왼쪽: 매물 검색 필터 및 목록 영역 */}
            <div 
                style={{ 
                    flex: '0 0 400px', 
                    overflowY: 'auto', 
                    borderRight: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    color: '#213547' 
                }}
            >
                <div style={{ padding: '20px', borderBottom: '1px solid #ccc', backgroundColor: '#fff' }}>
                    {/* 검색창 영역 */}
                    <input 
                        type="text" 
                        placeholder="지역, 상호명을 입력해 주세요." 
                        style={{ width: 'calc(100% - 20px)', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>
                {/* 🚨 StoreList 컴포넌트 렌더링 */}
                <React.Suspense fallback={<div>목록 로딩 중...</div>}>
                    <StoreList />
                </React.Suspense>
            </div>
            
            {/* 2. 오른쪽: 지도 영역 */}
            <div style={{ flex: 1 }}>
                {/* 🚨 MapContainer 컴포넌트 렌더링 */}
                <React.Suspense fallback={<div>지도 로딩 중...</div>}>
                    <MapContainer /> 
                </React.Suspense>
            </div>
        </div>
    );
};

export default StoreMapSearchPage;