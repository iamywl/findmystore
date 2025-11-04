// src/data/mockReportData.js
const reportData = {
  title: "선택 지역 및 업종 분석 리포트",
  summaryOpinion: "aaa구 bbb동은 점포 수가 증가 추세이며 유동인구가 안정적입니다. 창업 시 경쟁 업종의 동향을 주시하며..",
  keyMetrics: {
    storeCount: { current: 890, change: "+11" }, // 현재 점포 수와 전년 대비 변화
    floatingPopulation: { current: "46,858", change: "-2,845" }, // 유동 인구
    sales: { current: "851 만원", change: "-57 만원" }, // 평균 매출
  },
  salesTrendData: [ // 최근 6개월 매출 추이 (차트용 데이터)
    { month: '2025.06', avgSales: 800 },
    { month: '2025.07', avgSales: 820 },
    { month: '2025.08', avgSales: 900 },
    // ...
  ]
};

export default reportData;
