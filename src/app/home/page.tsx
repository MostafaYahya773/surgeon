'use client';
import { CustomDetails } from '../_components/CustomDetails/CustomDetails';
import OperationAnlayses from '../_components/Dashboard/OperationAnlayses';
import LoadingAnimation from '../_components/LoadingAnimation/LoadingAnimation';
import { useFetchData } from '@/hooks/useFetchData';
import { useState } from 'react';

export default function HomePage() {
  const { data: manualReport } = useFetchData('manual_reports');
  const { data: notes } = useFetchData('notes');
  const { data: reminders } = useFetchData('reminders');
  const { data: doctors } = useFetchData('doctors');
  const [isView, setIsView] = useState<boolean>(false);

  if (!manualReport || !notes || !reminders) {
    return <LoadingAnimation />;
  }

  return (
    <section className="flex flex-col gap-y-5">
      <OperationAnlayses
        notes={notes}
        reports={manualReport}
        reminders={reminders}
        doctors={doctors}
        setIsView={setIsView}
      />
      <div className={`${isView ? 'block' : 'hidden'}`}>
        <CustomDetails setIsView={setIsView} />
      </div>
    </section>
  );
}
