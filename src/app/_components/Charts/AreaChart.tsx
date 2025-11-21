'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { AreaChartData } from '../../../interfaces/index';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from '../Charts/RechartsWrapper';

const AreaCharts = React.memo(({ data }: { data: AreaChartData[] }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  return (
    <div ref={ref} className="w-full h-full">
      {inView && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 0, left: -40, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorOps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              axisLine={false}
              dataKey="name"
              tick={{ fontSize: 12, fill: '#0369a1' }}
              tickMargin={5}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#0369a1' }}
            />
            {/* <CartesianGrid strokeDasharray="0 0" stroke="#7dd3fc" /> */}
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="operations"
              stroke="#3B82F6"
              fill="url(#colorOps)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});
export default AreaCharts;
