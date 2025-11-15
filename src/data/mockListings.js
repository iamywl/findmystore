// src/data/mockListings.js
// 🚨 매물 개수를 상수로 관리하며, 1000개의 더미 데이터를 생성합니다.

// 🚨 매물 개수를 임의로 변경할 수 있는 상수입니다.
const NUMBER_OF_LISTINGS = 1000; 

const baseLat = 37.5665; // 서울 시청 위도
const baseLng = 126.9780; // 서울 시청 경도

const getMockListing = (id) => {
    // 좌표를 서울 중심가 주변 넓은 영역에 무작위로 분산
    const latOffset = (Math.random() - 0.5) * 0.2; 
    const lngOffset = (Math.random() - 0.5) * 0.4;

    const lat = baseLat + latOffset;
    const lng = baseLng + lngOffset;

    const types = ['외식업', '서비스업', '도/소매업', '교육/학원업', '숙박업', '기타'];
    const areas = ['10평 이하', '10평대', '20평대', '30평대', '40평대', '50평 이상'];

    const type = types[id % types.length];
    const area = areas[id % areas.length];
    
    // 금액을 ID에 따라 다르게 설정
    const depositBase = (id % 15) * 500 + 500; 
    const rentBase = (id % 7) * 40 + 80; 
    const managementFeeBase = (id % 12) * 2 + 3; 

    return { 
        id: id, 
        type: type, 
        area: area, 
        price: `보증금 ${depositBase.toLocaleString()} / 월세 ${rentBase.toLocaleString()}`, 
        managementFee: `${managementFeeBase}만 원`, 
        parking: `${(id % 5) + 1}대`, 
        compared: false, 
        lat: lat, 
        lng: lng 
    };
};

const mockListings = [];
for (let i = 1; i <= NUMBER_OF_LISTINGS; i++) {
    mockListings.push(getMockListing(i));
}

export default mockListings;