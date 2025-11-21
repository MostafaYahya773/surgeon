import React from 'react';

interface DateInputProps {
  date?: string;
  label: string;
  setDate: (date: string) => void;
}

export const DateInput: React.FC<DateInputProps> = ({
  date,
  setDate,
  label,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-[14px] text-blue-600">{label}</label>
      <input
        type="datetime-local"
        value={date || ''}
        onChange={(e) => setDate(e.target.value)}
        className="outline-none border border-secondary/30 focus:border-secondary/70 duration-200 w-full bg-white dark:bg-slate-800 dark:text-white rounded-md py-[4px] px-2 text-[15px]"
      />
    </div>
  );
};
