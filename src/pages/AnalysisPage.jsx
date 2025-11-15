// src/pages/AnalysisPage.jsx

import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import mockAnalysisData from '../data/mockAnalysisData'; 

// --- 미니 컴포넌트 ---

// 통계 지표 카드
const MetricCard = ({ label, value, change, unit }) => {
    const isUp = change >= 0;
    const changeStyle = {
        color: isUp ? '#D53F8C' : '#3182CE', // 핑크 (상승) vs 파랑 (하락)
        fontWeight: 'bold',
        marginLeft: '5px',
        fontSize: '14px',
    };
    const sign = isUp ? '↑' : '↓';
    const changeText = `${sign} ${Math.abs(change)}${unit}`;
    const bgColor = isUp ? '#FCE7F6' : '#EBF8FF';

    return (
        <div style={{
            backgroundColor: bgColor,
            borderRadius: '8px',
            padding: '15px',
            textAlign: 'center',
            minWidth: '150px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>{label}</p>
            <h4 style={{ margin: '5px 0 0 0', color: '#333' }}>
                {value}
                <span style={changeStyle}>{changeText}</span>
            </h4>
        </div>
    );
};

// --- 메인 페이지 컴포넌트 ---

const AnalysisPage = () => {
    const { id } = useParams(); // URL 파라미터에서 매물 ID를 가져옴
    const [activeTab, setActiveTab] = useState('summary');

    // 목업 데이터에서 현재 ID에 맞는 분석 데이터를 찾습니다.
    const analysisData = useMemo(() => {
        return mockAnalysisData.find(d => d.id === parseInt(id)) || mockAnalysisData[0];
    }, [id]);

    if (!analysisData) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>분석 데이터를 찾을 수 없습니다. (ID: {id})</div>;
    }
    
    // --- 탭별 내용 렌더링 함수 ---
    const renderContent = (tab) => {
        switch (tab) {
            case 'summary':
                return (
                    <div>
                        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>종합 의견</h2>
                        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <p>{analysisData.summary.opinion}</p>
                            <div style={{ display: 'flex', gap: '15px', justifyContent: 'space-around', marginTop: '20px' }}>
                                {analysisData.summary.metrics.map((m, i) => (
                                    <MetricCard key={i} {...m} />
                                ))}
                            </div>
                        </div>
                        <p style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
                            * 자세한 상담은 서울신용보증재단 종합지원센터를 방문하시기 바랍니다. ☎1577-6119
                        </p>
                    </div>
                );
            case 'industry':
                return (
                    <div>
                        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>업종 분석</h2>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            점포수는 <span style={{ color: '#646cff', fontSize: '24px' }}>{analysisData.industry.storeCount.toLocaleString()}개</span> 입니다.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <MetricCard label="전년 동분기 대비" value="" change={analysisData.industry.storeChange.year} unit="개" />
                            <MetricCard label="전분기 대비" value="" change={analysisData.industry.storeChange.prev} unit="개" />
                        </div>
                        {/* 실제 차트 영역 (목업) */}
                        <div style={{ height: '300px', backgroundColor: '#f0f0f0', borderRadius: '8px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            [점포수 추이 차트]
                        </div>
                    </div>
                );
            case 'sales':
                return (
                    <div>
                        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>매출 분석</h2>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            점포당 월평균 매출액은 <span style={{ color: '#646cff', fontSize: '24px' }}>{analysisData.sales.avgSales}만원</span> 입니다.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <MetricCard label="전분기 대비" value="" change={analysisData.sales.salesChange.prev} unit="만원" />
                            <MetricCard label="전년 동분기 대비" value="" change={analysisData.sales.salesChange.year} unit="만원" />
                        </div>
                        {/* 월평균 매출 건수 */}
                        <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '30px' }}>
                            월평균 매출건수는 <span style={{ color: '#646cff', fontSize: '24px' }}>{analysisData.sales.avgTransactions}건</span> 입니다.
                        </p>
                    </div>
                );
            case 'population':
                return (
                    <div>
                        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>인구 분석</h2>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            유동인구 수는 일평균 <span style={{ color: '#646cff', fontSize: '24px' }}>{analysisData.population.totalFlowing.toLocaleString()}명</span> 입니다.
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            밀도는 <span style={{ color: '#646cff', fontWeight: 'bold' }}>{analysisData.population.density.toLocaleString()}명/ha</span> 입니다.
                        </p>
                        <p style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                            성별, 연령별 유동인구 포커스: 
                            <strong style={{ color: '#D53F8C', marginLeft: '5px' }}>{analysisData.population.ageGenderFocus.focus} ({analysisData.population.ageGenderFocus.percentage}%)</strong>
                        </p>
                    </div>
                );
            case 'area_breakdown':
                return (
                    <div>
                        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>지역(배후지) 분석</h2>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            전체 임대료는 3.3m²당 <span style={{ color: '#646cff', fontSize: '24px' }}>{analysisData.area.rentAvg.toLocaleString()}원</span> 입니다.
                        </p>
                        <h3 style={{ marginTop: '30px' }}>주요 시설 현황</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '15px' }}>
                            {analysisData.area.keyFacilities.map((f, i) => (
                                <div key={i} style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', minWidth: '100px' }}>
                                    <p style={{ margin: 0, color: '#666' }}>{f.name}</p>
                                    <strong style={{ fontSize: '18px', color: '#333' }}>{f.value}</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const tabs = [
        { key: 'summary', label: '요약보고서' },
        { key: 'industry', label: '업종분석' },
        { key: 'sales', label: '매출분석' },
        { key: 'population', label: '인구분석' },
        { key: 'area_breakdown', label: '지역(배후지)분석' },
    ];

    const tabStyle = (key) => ({
        padding: '10px 15px',
        cursor: 'pointer',
        borderBottom: activeTab === key ? '3px solid #646cff' : '3px solid transparent',
        color: activeTab === key ? '#646cff' : '#333',
        fontWeight: activeTab === key ? 'bold' : 'normal',
    });

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh', color: '#333' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <h1 style={{ margin: '0 0 20px 0', fontSize: '24px' }}>
                    분석리포트 <span style={{ fontSize: '16px', color: '#666', marginLeft: '10px' }}>{analysisData.date}</span>
                </h1>
                
                {/* 탭 네비게이션 */}
                <div style={{ display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
                    {tabs.map(tab => (
                        <div key={tab.key} style={tabStyle(tab.key)} onClick={() => setActiveTab(tab.key)}>
                            {tab.label}
                        </div>
                    ))}
                </div>

                {/* 분석 위치 정보 (좌측 상단 이미지 참조) */}
                <div style={{ display: 'flex', marginBottom: '30px', fontSize: '14px', color: '#666' }}>
                    <strong style={{ color: '#333', marginRight: '10px' }}>위치: {analysisData.location}</strong> | 
                    <span style={{ marginLeft: '10px' }}>기준분기: {analysisData.date}</span>
                </div>

                {/* 탭 컨텐츠 */}
                <div style={{ minHeight: '400px' }}>
                    {renderContent(activeTab)}
                </div>

            </div>
        </div>
    );
};

export default AnalysisPage;