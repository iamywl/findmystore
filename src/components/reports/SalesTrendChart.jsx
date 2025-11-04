// src/components/reports/SalesTrendChart.jsx
import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const SalesTrendChart = ({ data }) => {
  return (
    <div className="chart-wrapper">
      <h3>입지 내 동일 업종 매출 추이 분석</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis 
            domain={['auto', 'auto']}
            tickFormatter={(value) => `${value}만원`} 
          />
          <Tooltip 
            formatter={(value) => [`${value}만원`, '평균 매출']}
            labelFormatter={(label) => `${label} 기준`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="avgSales" 
            name="평균 매출" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesTrendChart;
