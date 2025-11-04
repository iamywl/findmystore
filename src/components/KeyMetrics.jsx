// src/components/reports/KeyMetrics.jsx
import React from 'react';
import './KeyMetrics.css'; // CSS 파일 필요

const MetricCard = ({ title, value, change }) => (
  <div className="metric-card">
    <div className={`metric-change ${change.startsWith('+') ? 'positive' : 'negative'}`}>
      {change}
    </div>
    <div className="metric-value">{value}</div>
    <div className="metric-title">{title}</div>
  </div>
);

const KeyMetrics = ({ metrics }) => (
  <div className="key-metrics-container">
    <MetricCard title="입지 수" value={metrics.storeCount.current} change={metrics.storeCount.change} />
    <MetricCard title="평균 매출 (월)" value={metrics.sales.current} change={metrics.sales.change} />
    <MetricCard title="유동 인구 (월)" value={metrics.floatingPopulation.current} change={metrics.floatingPopulation.change} />
    {/* 필요한 다른 지표 카드 추가 */}
  </div>
);

export default KeyMetrics;
