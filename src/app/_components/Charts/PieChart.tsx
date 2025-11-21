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

const PieCharts = React.memo(
  ({
    data,
    colors = ['#60a5fa', '#facc15'],
    showTooltip = true,
  }: PieChartProps) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

    return (
      <div ref={ref} className="grid grid-cols-1 h-full ">
        {inView && (
          <>
            <div className="w-full relative grid grid-rows-[1fr_auto] gap-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <>
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
                        <Cell key={i} fill={colors[i % colors.length]} />
                      ))}
                    </Pie>
                  </>
                  {showTooltip && <Tooltip />}
                </PieChart>
                <div className="absolute inset-0 text-[15px] flex flex-col gap-2 justify-center items-center font-medium ">
                  <span className=" text-secondary/50 dark:text-slate-400">
                    Total Patients
                  </span>
                  <span className="text-[25px] dark:text-white">
                    {data?.[0]?.value + data?.[1]?.value}
                  </span>
                </div>
              </ResponsiveContainer>
              <div className="selectType w-full flex justify-center items-center gap-7 ">
                <div className="flex justify-center items-center gap-1">
                  <span className="text-[15px] w-8 h-3 bg-blue-400 rounded-md"></span>
                  <p className="text-[15px] text-secondary/70">Male</p>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <span className="text-[15px] w-8 h-3 bg-yellow-400 rounded-md"></span>
                  <p className="text-[15px] text-secondary/70">Female</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default PieCharts;
