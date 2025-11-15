// src/data/mockAnalysisData.js
import commercialZones from './mockCommercialData'; // 🚨 동적 상권 데이터 import

const createAnalysisData = (id, location) => ({
    id: id,
    location: location,
    date: '2025년 2분기',
    // 보고서 수치도 ID에 따라 약간씩 동적으로 생성
    dynamicStoreCount: 1000 + (id % 50) * 10,
    dynamicSales: 500 + (id % 20) * 5,

    summary: {
        opinion: `선택된 상권 "${location}"은 주변 경쟁 심화로 인한 매출 감소 추세(${10 - (id % 20)}%)입니다. 점포 창업 전 입지 선정에 신중해야 합니다.`,
        metrics: [
            { label: '점포수 (전분기 대비)', value: `${1000 + (id % 50)}개`, change: (id % 10) - 5, unit: '개' },
            { label: '월평균 매출액 (전분기 대비)', value: `${500 + (id % 20)}만 원`, change: -14 + (id % 5), unit: '만 원' },
            { label: '유동인구 (전년 동기 대비)', value: `${30000 + (id % 100)}명/ha`, change: -153 + (id % 10), unit: '명' },
        ],
    },
    industry: {
        storeCount: 1151 + (id % 100),
        storeChange: { prev: 73 + (id % 5), year: 55 - (id % 5) },
        storeStatus: {
            seoul: 637986,
            gwangjin: 20671,
            local: 1151,
        }
    },
    sales: {
        avgSales: 534 + (id % 10), 
        salesChange: { prev: -14 + (id % 3), year: -14 - (id % 3) }, 
        avgTransactions: 275 + (id % 15), 
        transactionChange: { prev: 14 - (id % 5), year: -26 + (id % 5) }, 
    },
    population: {
        totalFlowing: 56705 + (id * 10), 
        density: 31132 - (id * 5), 
        ageGenderFocus: {
            focus: id % 2 === 0 ? '남성, 30대' : '여성, 60대 이상',
            percentage: 12.4 + (id % 5) * 0.1
        }
    },
    area: {
        rentAvg: 109903 + (id * 100), 
        keyFacilities: [
            { name: '교통', value: 15.7 + (id % 5) * 0.1 },
            { name: '교육', value: 5.2 - (id % 5) * 0.1 },
            { name: '기타', value: 5.6 + (id % 5) * 0.1 },
            { name: '여가/문화', value: 5.4 - (id % 5) * 0.1 },
            { name: '유흥', value: 3.7 + (id % 5) * 0.1 },
        ]
    }
});

// 🚨 상권 데이터 목록을 순회하며 분석 데이터를 생성합니다.
const mockAnalysisData = commercialZones.map(zone => 
    createAnalysisData(zone.id, zone.name)
);

export default mockAnalysisData;