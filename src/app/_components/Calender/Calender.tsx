'use client';
import React, { useContext } from 'react';
import { GlobalContext } from '@/context/global';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function CalendarUI() {
  const { date, setDate } = useContext(GlobalContext);

  return (
    <div className="w-full shadow-sm bg-white dark:bg-slate-800 rounded-md">
      <DayPicker
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ before: new Date() }}
        classNames={{
          day: 'rounded-full transition-colors md:px-3 text-blue-600',
          selected: 'bg-blue-600 text-white',
          today: 'font-semibold',
          disabled: 'text-gray-300 cursor-not-allowed',
          month: 'text-black dark:text-white font-semibold',
        }}
      />
    </div>
  );
}
