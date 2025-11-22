'use client';
import React, { useContext } from 'react';
import { X } from 'lucide-react';
import { ManualReportDetails } from '../ManualReports/ManualReportDetails/ManualReportDetails';
import { usePathname } from 'next/navigation';
import PaitentsDetailsView from '../patient/PatientDetailsView/PaitentsDetailsView';
import { GlobalContext } from '@/context/global';
import ManualDetailsView from '../ManualReports/ManualDetailsView/ManualDetailsView';
import { PatientEdit } from '../patient/patientsEdit/patientEdit';
import ManualEdit from '../ManualReports/ManualReportEdit/ManualEdit';
import ReminderDetails from '../Reminder/ReminderDetails/ReminderDetails';
import ReminderView from '../Reminder/ReminderView/ReminderView';
import dynamic from 'next/dynamic';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import ReminderEdit from '../Reminder/ReminderEdit/ReminderEdit';
const PatientAdd = dynamic(
  () => import('../patient/PatientAdd/PatientAdd').then((m) => m.PatientAdd),
  {
    ssr: false,
    loading: () => <LoadingAnimation />,
  }
);
export const CustomDetails = React.memo(
  ({
    setIsView,
  }: {
    setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const { dataInCustom } = useContext(GlobalContext);
    const pathName = usePathname();

    // Helper function to determine which component to show
    const renderComponent = () => {
      if (pathName === '/home/Patients' && dataInCustom === 'view')
        return <PaitentsDetailsView />;
      else if (pathName === '/home/Patients' && dataInCustom === 'edit')
        return <PatientEdit setIsView={setIsView} />;
      else if (
        (pathName === '/home/Patients' || pathName === '/home') &&
        dataInCustom === 'add Patients'
      )
        return <PatientAdd setIsView={setIsView} />;
      else if (
        (pathName === '/home/ManualReport' || pathName === '/home') &&
        dataInCustom === 'add ManualReport'
      )
        return <ManualReportDetails setIsView={setIsView} />;
      else if (pathName === '/home/ManualReport' && dataInCustom === 'edit')
        return <ManualEdit setIsView={setIsView} />;
      else if (
        (pathName === '/home/ManualReport' || pathName === '/home') &&
        dataInCustom === 'view ManualReport'
      )
        return <ManualDetailsView />;
      else if (pathName === '/home/Reminders' && dataInCustom === 'edit')
        return <ReminderEdit setIsView={setIsView} />;
      else if (
        (pathName === '/home/Reminders' || pathName === '/home') &&
        dataInCustom === 'view Reminders'
      )
        return <ReminderView />;
      else if (
        (pathName === '/home/Reminders' || pathName === '/home') &&
        dataInCustom === 'add Reminders'
      )
        return <ReminderDetails setIsView={setIsView} />;
      return null;
    };

    return (
      <div className="fixed flex justify-center items-center top-0 left-0 backdrop-blur-sm right-0 bottom-0 h-screen w-screen z-50">
        <div className="overflow-y-auto w-full min-h-[200px] max-h-[80vh] sm:w-[70%]  rounded-md p-3 bg-white dark:bg-slate-800 shadow-[0px_0px_90px] dark:shadow-[0px_0px_5px] shadow-secondary dark:shadow-slate-500 grid grid-rows-[auto_1fr] gap-3 mx-2">
          <div className="close flex justify-end">
            <span
              onClick={() => setIsView(false)}
              className="cursor-pointer pb-2 "
            >
              <X className="w-6 h-6 text-blue-600 rounded-md" />
            </span>
          </div>
          <div className="dataInComponent">{renderComponent()}</div>
        </div>
      </div>
    );
  }
);
