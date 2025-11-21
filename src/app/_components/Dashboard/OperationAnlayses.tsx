'use client';
import React, { useContext, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import {
  User,
  BookOpen,
  Target,
  ClipboardMinus,
  Book,
  Pen,
  Calendar,
  Mars,
  Venus,
  BookOpenCheck,
  SquareActivity,
} from 'lucide-react';
import { GlobalContext } from '@/context/global';
import { NoData } from '../NoData/NoData';
import { ShowReport } from '@/interfaces/index';
import { PatientsAnlayses } from '../../../interfaces/index';
import { usePathname } from 'next/navigation';
import { DoctorCart } from '../DoctorCart/DoctorCart';

const CalenderUI = dynamic(() => import('../Calender/Calender'), {
  ssr: false,
  loading: () => <LoadingAnimation />,
});
const PioCharts = dynamic(() => import('../Charts/PieChart'), {
  ssr: false,
  loading: () => <LoadingAnimation />,
});
const AreaCharts = dynamic(() => import('../Charts/AreaChart'), {
  ssr: false,
  loading: () => <LoadingAnimation />,
});
const OperationAnalysesComponent = dynamic(
  () => import('../OperationAnlaysesComponent/operationAnlaysesComponent'),
  {
    ssr: false,
  }
);
const ComposedCharts = dynamic(() => import('../Charts/ComposedChart'), {
  ssr: false,
  loading: () => <LoadingAnimation />,
});

const ReminderInDay = dynamic(() => import('../ReminderInDay/ReminderInDay'), {
  ssr: false,
  loading: () => <LoadingAnimation />,
});

export default function OperationAnlayses({
  notes,
  reports,
  reminders,
  doctors,
  setIsView,
}: {
  notes: any;
  reports: any;
  reminders: any;
  doctors: any;
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    filterEmergency,
    filterElective,
    genderMale,
    genderFemale,
    age_under_20,
    age_20_to_35,
    age_36_to_50,
    age_over_50,
  } = useMemo(() => {
    const filterElective = notes?.filter(
      (item: any) => item?.operation_status === 'Elective'
    ).length;

    const filterEmergency = notes?.filter(
      (item: any) => item?.operation_status === 'Emergency'
    ).length;

    const genderMale = notes?.filter(
      (item: any) => item?.gender === 'Male'
    ).length;
    const genderFemale = notes?.filter(
      (item: any) => item?.gender === 'Female'
    ).length;

    const age_under_20 = notes?.filter(
      (item: any) => item?.patient_age <= 20
    ).length;
    const age_20_to_35 = notes?.filter(
      (item: any) => item?.patient_age > 20 && item?.patient_age <= 35
    ).length;
    const age_36_to_50 = notes?.filter(
      (item: any) => item?.patient_age > 35 && item?.patient_age <= 50
    ).length;
    const age_over_50 = notes?.filter(
      (item: any) => item?.patient_age > 50
    ).length;
    return {
      filterElective,
      filterEmergency,
      genderMale,
      genderFemale,
      age_under_20,
      age_20_to_35,
      age_36_to_50,
      age_over_50,
    };
  }, [notes]);

  const { setDataInCustom, setId } = useContext(GlobalContext);
  const path = usePathname();
  const years = [
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
  ];
  const mostCommonOperation = [
    { name: 'APP', operations: 10 },
    { name: 'CHO', operations: 30 },
    { name: 'HER', operations: 5 },
    { name: 'CABG', operations: 10 },
  ];
  const mostOperationsBarMonth = [
    { name: 'Jan', operations: 2 },
    { name: 'Feb', operations: 1 },
    { name: 'Mar', operations: 1 },
    { name: 'Apr', operations: 3 },
    { name: 'May', operations: 4 },
    { name: 'Jun', operations: 5 },
    { name: 'Jul', operations: 7 },
    { name: 'Aug', operations: 1 },
    { name: 'Sep', operations: 2 },
    { name: 'Oct', operations: 3 },
    { name: 'Nov', operations: 8 },
    { name: 'Dec', operations: 1 },
  ];
  const gender = [
    { name: 'Male', value: genderMale },
    { name: 'Female', value: genderFemale },
  ];

  const ageGroups = [
    { name: '0-18', patients: age_under_20 || 0 },
    { name: '20-35', patients: age_20_to_35 || 0 },
    { name: '36-50', patients: age_36_to_50 || 0 },
    { name: '51+', patients: age_over_50 || 0 },
  ];

  const operationsStatusType = [
    {
      name: 'Elective',
      type: filterElective,
      color: '#22c55e',
      icon: BookOpenCheck,
    },
    {
      name: 'Emergency',
      type: filterEmergency,
      color: '#ef4444',
      icon: SquareActivity,
    },
    { name: 'Male', type: genderMale, color: '#60a5fa', icon: Mars },
    { name: 'Female', type: genderFemale, color: '#eab308', icon: Venus },
  ];

  const totalPatientsAnlayses: PatientsAnlayses[] = [
    {
      name: 'Total Operations',
      NumOFpatients: notes?.length || 0,
      icon: Target,
      color: '#60a5fa',
    },
    {
      name: 'Total Reports',
      NumOFpatients: reports?.length || 0,
      icon: ClipboardMinus,
      color: '#22c55e',
    },
    {
      name: 'Total Reminders',
      NumOFpatients: reminders?.length || 0,
      icon: Book,
      color: '#eab308',
    },
  ];

  const doctorDetails = {
    name: doctors?.[0]?.name,
    NumOFOperation: notes?.length || 0,
    age:
      new Date().getFullYear() -
      new Date(doctors?.[0]?.date_of_birth).getFullYear(),
    exprience: 20,

    Specialization: doctors?.[0]?.specialization,
  };

  const shorts = [
    {
      name: 'Add Patient',
      icon: User,
      onClick: () => {
        setIsView(true);
        setDataInCustom('add Patients');
      },
    },
    {
      name: 'Add Manual Report',
      icon: Pen,
      onClick: () => {
        setIsView(true);
        setDataInCustom('add ManualReport');
      },
    },
    {
      name: 'Add Reminder',
      icon: Calendar,
      onClick: () => {
        setIsView(true);
        setDataInCustom('add Reminders');
      },
    },
  ];

  const report = () => {
    return (
      <>
        {reports?.length === 0 && (
          <NoData
            title="You don't have any reports"
            icon={<BookOpen className="w-20 h-20 text-blue-200" />}
          />
        )}

        <div className="grid grid-rows-4 gap-2 rounded-md p-2 h-full">
          {reports?.slice(0, 4).map((item: ShowReport) => (
            <div
              key={item?.id}
              className="flex bg-blue-50 dark:bg-slate-700 items-center justify-between p-2 rounded-lg"
            >
              <p className="text-secondary dark:text-white text-[14px]">
                {item?.title}
              </p>
              <button
                onClick={() => {
                  setIsView(true);
                  setDataInCustom('view ManualReport');
                  setId(item?.id);
                }}
                className="view text-[13px] text-blue-500 p-1 hover:scale-105"
              >
                view
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <section
      className={`home mr-[312px] ${
        path === '/home' ? 'grid grid-cols-[1fr_auto] relative' : ''
      } `}
    >
      <div className="flex flex-col gap-5 w-full rounded-md p-2 ">
        <div className="calemder__ui">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2 ">
            <div className="w-full h-full order-2 lg:order-1 rounded-lg bg-white dark:bg-slate-800 min-h-[300px]">
              <OperationAnalysesComponent
                data={<ReminderInDay setIsView={setIsView} />}
                name="Reminders"
                description="Upcoming Reminders"
                initKey="taskUi"
              />
            </div>
            <div className="order-1 lg:order-2 bg-white dark:bg-slate-800 rounded-lg">
              <OperationAnalysesComponent
                data={<CalenderUI />}
                initKey="gender"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-y-5 bg-white dark:bg-slate-800 rounded-lg min-h-[300px]">
            <OperationAnalysesComponent
              name="Operation per Month"
              description="total operations per month"
              data={
                <ComposedCharts
                  data={mostOperationsBarMonth}
                  colSize={10}
                  chartKey="operations"
                  color={['#0ea5e9', '#2563eb']}
                />
              }
              years={years}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg min-h-[300px]">
              <OperationAnalysesComponent
                name="Reports"
                description="Last 4 Reports"
                data={report()}
              />
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg min-h-[300px]">
              <OperationAnalysesComponent
                name="Genders"
                description="Anlayse Genders"
                data={<PioCharts data={gender} />}
              />
            </div>

            <div className="grid grid-rows-4 gap-2 ">
              {operationsStatusType?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white dark:bg-slate-800 rounded-lg p-2"
                >
                  <div className="flex gap-3 items-center">
                    <span className="icon">
                      <item.icon
                        className="w-5 h-5"
                        style={{ color: item.color }}
                      />
                    </span>
                    <p className="type" style={{ color: item.color }}>
                      {item?.name}
                    </p>
                  </div>
                  <div className="count text-secondary/70 dark:text-white">
                    {item?.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="bg-white dark:bg-slate-800 rounded-lg min-h-[300px]">
              <OperationAnalysesComponent
                name="Most Common Operation"
                description="Anlayse Most Common Operation"
                data={<AreaCharts data={mostCommonOperation} />}
              />
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg min-h-[300px]">
              <OperationAnalysesComponent
                name="Age Groups"
                description="Anlayse Age Groups"
                data={
                  <ComposedCharts
                    data={ageGroups}
                    chartKey="patients"
                    height={300}
                    colSize={20}
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="shorts grid grid-rows-[auto_auto_auto] gap-2 min-h-screen fixed right-0 top-0 p-2 ">
        <div className="doctor__Cart">
          <DoctorCart doctorDetails={doctorDetails} />
        </div>
        <div className="quiqueShorts flex flex-col gap-2 bg-blue-600 dark:bg-slate-800 p-3 rounded-lg">
          <h2 className="text-[18px] font-medium text-white">Quick Short</h2>
          <div className="shorts flex flex-col gap-2">
            {shorts?.map((item, index) => (
              <button
                onClick={item?.onClick}
                key={index}
                className="flex gap-2 items-center text-blue-600 dark:text-white  bg-white dark:bg-slate-700 p-2 rounded-lg dark:hover:bg-slate-500 hover:scale-[1.01] hover:bg-blue-200  transition-all duration-150"
              >
                <span className="icon">
                  <item.icon className="w-4 h-4" />
                </span>
                <p className="text-[14px]">{item?.name}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-rows-3 gap-2 ">
          {totalPatientsAnlayses?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white dark:bg-slate-800 rounded-lg p-4"
            >
              <div className="flex gap-3 items-center">
                <span className="icon">
                  <item.icon
                    className="w-5 h-5"
                    style={{ color: item.color }}
                  />
                </span>
                <p className="type" style={{ color: item.color }}>
                  {item?.name}
                </p>
              </div>
              <div className="count text-secondary">{item?.NumOFpatients}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
