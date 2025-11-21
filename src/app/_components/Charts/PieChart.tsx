'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from '../Charts/RechartsWrapper';
import { PieChartProps } from '../../../interfaces/index';
import { useInView } from 'react-intersection-observer';

const PieChart: React.FC<PieChartProps> = React.memo(
  ({ data, colors = ['#60a5fa', '#facc15'], showTooltip = true }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    if (!data || data.length === 0) return null;

    const total = data.reduce((acc, item) => acc + (item.value || 0), 0);

    return (
      <div ref={ref} className="grid grid-cols-1 h-full">
        {inView && (
          <div className="w-full relative grid grid-rows-[1fr_auto] gap-2">
            {/* الشارت الرئيسي */}
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data as any[]}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={85}
                  cornerRadius={5}
                  paddingAngle={3}
                  label={false}
                  stroke="none"
                >
                  {data.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
                  ))}
                </Pie>

                {/* Tooltip لازم يكون جوا PieChart */}
                {showTooltip && <Tooltip />}
              </PieChart>
            </ResponsiveContainer>

            {/* Overlay: Total Patients في النص فوق الدونات */}
            <div className="absolute inset-0 flex flex-col items-center justify-center font-medium text-center text-[15px] gap-2 pointer-events-none z-10">
              <span className="text-secondary/50 dark:text-slate-400">
                Total Patients
              </span>
              <span className="text-[25px] font-bold dark:text-white">
                {total.toLocaleString()}
              </span>
            </div>

            {/* Legend تحت الشارت */}
            <div className="w-full flex justify-center items-center gap-7 mt-4 flex-wrap">
              {data.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span
                    className="w-8 h-3 rounded-md inline-block"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  />
                  <p className="text-[15px] text-secondary/70 dark:text-gray-300">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

PieCharts.displayName = 'PieCharts';

export default PieChart;
