'use client';
import { GlobalContext } from '@/context/global';
import React, { useContext, useEffect } from 'react';
import LoadingAnimation from '../../LoadingAnimation/LoadingAnimation';
import { useSelectDataById } from '@/hooks/useSelectDataById';

export default function ManualDetailsView() {
  const { id } = useContext(GlobalContext);
  const { data, isLoading } = useSelectDataById(id, 'manual_reports');
  if (!id || isLoading) return <LoadingAnimation />;
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[20px] font-medium text-black dark:text-white border-b pb-2 dark:border-slate-600 border-secondary">
        {data?.title}
      </h2>
      <p className="text-[15px] text-secondary">{data?.description}</p>
    </div>
  );
}
