// src/data/mockCommercialData.js
// 🚨 상권(Commercial Zone)의 중심점 데이터를 동적으로 생성합니다.

// 🚨 상권 개수를 임의로 변경할 수 있는 상수입니다.
const NUMBER_OF_COMMERCIAL_ZONES = 100; 

const baseLat = 37.55; // 서울 중심 위도
const baseLng = 126.99; // 서울 중심 경도

const commercialZoneNames = [
    '강남역 상권', '홍대입구 상권', '성수동 카페거리', '여의도 오피스 상권', 
    '명동 관광 상권', '가로수길 상권', '종로 전통 상권', '잠실 주거 상권'
];

const commercialRegions = ['강남구', '마포구', '성동구', '영등포구', '중구', '서초구', '종로구', '송파구'];

const createCommercialZone = (id) => {
    // 좌표를 서울 중심가 주변 넓은 영역에 무작위로 분산
    const latOffset = (Math.random() - 0.5) * 0.2; 
    const lngOffset = (Math.random() - 0.5) * 0.4;

    const lat = baseLat + latOffset;
    const lng = baseLng + lngOffset;

    const nameIndex = id % commercialZoneNames.length;
    const regionIndex = id % commercialRegions.length;

    // 가격을 ID에 따라 다르게 설정
    const depositBase = (id % 15) * 500 + 500; 
    const rentBase = (id % 7) * 40 + 80; 

    return { 
        id: id, 
        // 상권 이름 + 번호를 붙여 동적 이름 생성
        name: `${commercialZoneNames[nameIndex]} (${id})`, 
        price: `보증금 ${depositBase.toLocaleString()} / 월세 ${rentBase.toLocaleString()}`,
        lat: lat, 
        lng: lng, 
        region: commercialRegions[regionIndex] 
    };
};

const commercialZones = [];
for (let i = 1; i <= NUMBER_OF_COMMERCIAL_ZONES; i++) {
    commercialZones.push(createCommercialZone(i));
}

export default commercialZones;