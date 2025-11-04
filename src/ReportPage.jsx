// src/pages/ReportPage.jsx
import React from 'react';
import reportData from '../data/mockReportData';
import KeyMetrics from '../components/reports/KeyMetrics';
import SalesTrendChart from '../components/reports/SalesTrendChart';
import './ReportPage.css'; // 레이아웃을 위한 CSS 파일

const ReportPage = () => {
  // 실제로는 API 호출을 통해 reportData를 가져와야 합니다.
  
  return (
    <div className="report-layout">
      {/* Sidebar - 선택 정보 (왼쪽 이미지의 회색 영역) */}
      <div className="report-sidebar">
        <h2>분석 보고서</h2>
        <p>선택 반영 항목: aaa구 bbb동, CCC업종</p>
        {/* 추가적인 선택 옵션 표시 */}
      </div>

      {/* Main Content - 리포트 내용 */}
      <div className="report-main-content">
        <h1>SAI! 분석 보고서</h1>
        <p className="report-summary">
          {reportData.summaryOpinion}
        </p>
        
        <div className="report-section">
          <h3>종합 의견</h3>
          <KeyMetrics metrics={reportData.keyMetrics} />
        </div>

        <div className="report-section">
          <h3>매출 및 인구 분석</h3>
          <SalesTrendChart data={reportData.salesTrendData} />
        </div>
        
        {/* 주거 인구, 주요 시설 현황 등의 추가 섹션 */}
      </div>
    </div>
  );
};

export default ReportPage;
