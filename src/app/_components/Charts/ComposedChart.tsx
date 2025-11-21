'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { ComposedChartsProps } from '../../../interfaces/index';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from '../Charts/RechartsWrapper';

const ComposedCharts = React.memo(
  ({ data, colSize, color, chartKey }: ComposedChartsProps) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
      <div ref={ref} className="w-full h-64">
        {inView && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 0, right: 20, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="barColor" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="5%" stopColor={color?.[0]} stopOpacity={0.7} />
                  <stop offset="95%" stopColor={color?.[1]} stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#0369a1' }}
                axisLine={false}
                tickMargin={5}
                tickLine={false}
              />
              <YAxis
                axisLine={false}
                tick={{ fontSize: 12, fill: '#0369a1' }}
                tickLine={false}
              />
              <Tooltip />
              <Legend />

              <Bar
                dataKey={chartKey}
                barSize={colSize}
                fill="url(#barColor)"
                radius={[10, 10, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
    );
  }
);

export default ComposedCharts;
