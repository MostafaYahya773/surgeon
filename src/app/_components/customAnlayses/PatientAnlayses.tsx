import React from 'react';

export const CustomAnlayses = ({
  number,
  color,
  name,
  icon: Icon,
}: {
  number: number | any;
  color?: string;
  name?: string;
  icon?: any;
}) => {
  return (
    <div
      className="flex flex-col gap-y-2 bg-white dark:bg-slate-900 p-4 lg:p-3 rounded-md border-b-4 border-primary w-full"
      style={{ borderBottomColor: color }}
    >
      <div className="flex items-center gap-2 border-b border-primary pb-2">
        <Icon className="w-6 h-6" style={{ color: color }} />
        <h3 className="font-bold mt-1 text-[15px]" style={{ color: color }}>
          {name}
        </h3>
      </div>
      <div className="flex flex-col gap-x-2">
        <span className="font-bold text-[20px]" style={{ color: color }}>
          {number}
        </span>
        <p className="text-[12px] text-secondary">{name}</p>
      </div>
    </div>
  );
};
