'use client';
import React from 'react';
import { LineChartsProps } from '../../../interfaces/index';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from '../Charts/RechartsWrapper';

const LineCharts = React.memo(
  ({ data, showTooltip = true }: LineChartsProps) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 15, right: 5, bottom: 0, left: -28 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" /> */}
          <XAxis
            axisLine={false}
            dataKey="name"
            tick={{ fontSize: 12, fill: '#3b82f6' }}
          />
          <YAxis axisLine={false} tick={{ fontSize: 12, fill: '#3b82f6' }} />
          {showTooltip && <Tooltip />}
          <Legend />
          <Line
            type="monotone"
            dataKey="operations"
            stroke="#3b82f6"
            strokeWidth={1}
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
);

export default LineCharts;
