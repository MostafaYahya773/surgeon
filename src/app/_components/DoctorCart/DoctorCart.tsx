import Image from 'next/image';
import React from 'react';
export const DoctorCart = React.memo(
  ({ doctorDetails }: { doctorDetails: any }) => {
    return (
      <div className="doctorInfo w-[300px] h-full p-3 bg-gradient-to-tr from-blue-600 to-blue-500 dark:from-slate-800 dark:to-slate-900 rounded-lg flex flex-col gap-3">
        <div className="img bg-white w-[100px] h-[100px] rounded-full mx-auto overflow-hidden">
          <Image src="/doctor.jpg" alt="doctor" width={100} height={100} />
        </div>
        <div className="name__posation">
          <p className="name text-center text-white font-medium">
            {doctorDetails?.name}
          </p>
          <p className="posation text-center text-primary">
            {doctorDetails?.Specialization}
          </p>
        </div>
        <div className="doctorDetails grid grid-cols-3 gap-3">
          <div className="operation flex flex-col gap-2 items-center">
            <p className="text-white">Operation</p>
            <span className="bg-white text-blue-600 dark:text-slate-600 px-2 py-1 w-full rounded-lg text-center text-[14px]">
              {doctorDetails?.NumOFOperation}
            </span>
          </div>
          <div className="age flex flex-col gap-2 items-center">
            <p className="text-white">Exprience</p>
            <span className="bg-white text-blue-600 dark:text-slate-600 px-2 py-1 w-full rounded-lg text-center text-[14px]">
              {doctorDetails?.exprience} Years
            </span>
          </div>
          <div className="age flex flex-col gap-2 items-center">
            <p className="text-white">Age</p>
            <span className="bg-white text-blue-600 dark:text-slate-600 px-2 py-1 w-full rounded-lg text-center text-[14px]">
              {doctorDetails?.age} Years
            </span>
          </div>
        </div>
      </div>
    );
  }
);
