import React from 'react';
import Image from 'next/image';
import { CircleUserRound } from 'lucide-react';
export default function Nav() {
  const date = new Date();
  return (
    <div className="fixed max-w-[1600px] mx-auto left-0 right-0 top-0 z-10 border-b border-primary py-2 grid grid-cols-[auto_1fr] lg:grid-cols-[20%_1fr] items-center bg-white shadow-sm">
      <div className="flex items-center justify-between mx-3">
        <div className="name flex flex-col ">
          <h2 className="font-bold ">
            {date.toLocaleTimeString('en-US').includes('PM')
              ? 'Good Afternoon'
              : 'Good Morning'}
            , Dr. John
          </h2>
          <p className="text-secondary text-[15px]">i hope you are well</p>
        </div>
        <div className="icon">
          <CircleUserRound className="text-secondary cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
