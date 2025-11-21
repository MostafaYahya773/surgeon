'use client';
import React, { use, useContext, useEffect, useMemo, useState } from 'react';
import { CustomAnlayses } from '../../_components/customAnlayses/PatientAnlayses';
import { SelectProps } from '../../../interfaces/index';
import {
  Calendar,
  Plus,
  Ellipsis,
  CalendarArrowUp,
  CalendarCheck2,
} from 'lucide-react';
import { GlobalContext } from '@/context/global';
import { CustomDetails } from '../../_components/CustomDetails/CustomDetails';
import { ReminderSetting } from '../../_components/Reminder/ReminderSetting/ReminderSetting';
import { SearchAndFilter } from '../../_components/SearchAndFilter/SearchAndFilter';
import { useFetchData } from '@/hooks/useFetchData';
import { NoData } from '../../_components/NoData/NoData';
import LoadingAnimation from '../../_components/LoadingAnimation/LoadingAnimation';
export default function Reminders() {
  const { setDataInCustom, searchInput, listValue, setEndpoint, endpoint } =
    useContext(GlobalContext);
  const [isView, setIsView] = useState<boolean>(false);
  const [openSettingId, setOpenSettingId] = useState<number | null>(null);
  const { data: reminderList, isLoading } = useFetchData(endpoint);

  const { totalReminders, HighPriority, veryHighPriority, NormalPriority } =
    useMemo(() => {
      const totalReminders = reminderList?.length;
      const HighPriority = reminderList?.filter(
        (reminder) => reminder.priority === 'High'
      ).length;
      const NormalPriority = reminderList?.filter(
        (reminder) => reminder.priority === 'Normal'
      ).length;
      const veryHighPriority = reminderList?.filter(
        (reminder) => reminder.priority === 'Very High'
      ).length;

      return {
        totalReminders,
        HighPriority,
        NormalPriority,
        veryHighPriority,
      };
    }, [reminderList]);

  const priorityList: SelectProps[] = [
    { label: 'All', value: 'All' },
    { label: 'Very High', value: 'Very High' },
    { label: 'High', value: 'High' },
    { label: 'Normal', value: 'Normal' },
  ];

  const filterByPriority = reminderList?.filter((reminder) => {
    const lv = (listValue || '').toLowerCase();
    const q = (searchInput || '').toLowerCase();

    const matchesPriority =
      lv === '' || lv === 'all'
        ? true
        : reminder?.priority?.toLowerCase() === lv;
    const matchesSearch =
      q === '' ? true : reminder?.title?.toLowerCase().includes(q);

    return matchesPriority && matchesSearch;
  });

  useEffect(() => {
    setEndpoint('reminders');
  });
  if (isLoading) return <LoadingAnimation />;

  return (
    <section className="flex flex-col gap-3 p-2">
      <div className="bg-therd dark:bg-slate-800  p-3 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
        <CustomAnlayses
          number={totalReminders}
          color="#2563eb"
          name="Total Reminders"
          icon={Calendar}
        />
        <CustomAnlayses
          number={veryHighPriority}
          color="#ef4444"
          name="Very High"
          icon={Calendar}
        />
        <CustomAnlayses
          number={HighPriority}
          color="#f97316"
          name="High"
          icon={Calendar}
        />
        <CustomAnlayses
          number={NormalPriority}
          color="#22c55e"
          name="Normal"
          icon={Calendar}
        />
      </div>

      <div className="flex items-center">
        <SearchAndFilter data={priorityList} />
      </div>

      <div className="title__addButton flex justify-between items-center flex-wrap gap-3 mx-3 border-b border-therd pb-3">
        <h2 className="text-[20px] font-medium flex gap-2 items-center text-black dark:text-white">
          Reminders
        </h2>
        <button
          onClick={() => {
            setIsView(true);
            setDataInCustom('add Reminders');
          }}
          className="px-3 py-1 text-[15px] flex items-center gap-1 rounded-md bg-gradient-to-tr from-[#1e40af] to-[#0284c7] text-white hover:scale-105 transition-all duration-300 border-none outline-none"
        >
          Add Reminder
          <Plus className="w-4 h-4 font-bold" />
        </button>
      </div>

      <div className={`${isView ? 'block' : 'hidden'}`}>
        <CustomDetails setIsView={setIsView} />
      </div>

      <div className="reminder__List grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-2 font-medium text-secondary w-full">
        <div className="col-span-3">
          {filterByPriority?.length === 0 && (
            <div className="h-[55vh]">
              <NoData
                title="You don't have any reminders"
                icon={
                  <Calendar className="w-32 h-32 text-blue-600 opacity-50" />
                }
              />
            </div>
          )}
        </div>
        {filterByPriority?.map((reminder) => (
          <div
            key={reminder?.id}
            className="grid grid-rows-[auto_auto_1fr_auto] gap-2 border border-secondary/20 p-2 rounded-md bg-therd dark:bg-slate-800 relative"
          >
            <div className="flex justify-between items-center">
              <h2 className="title  text-[15px] text-black dark:text-white">
                {`${
                  reminder?.title?.split(' ').length > 4
                    ? reminder?.title.split(' ').slice(0, 4).join(' ') + '...'
                    : reminder?.title
                }`}
              </h2>
              <Ellipsis
                onClick={() =>
                  setOpenSettingId(
                    openSettingId === reminder.id ? null : reminder.id
                  )
                }
                className="w-6 h-6 cursor-pointer"
              />
            </div>

            <p
              className={`description flex items-center text-[13px] w-fit py-1 px-2 rounded-md  ${
                (reminder?.priority === 'Very High' &&
                  'text-red-500 bg-red-100') ||
                (reminder?.priority === 'High' &&
                  'text-orange-500 bg-orange-100') ||
                (reminder?.priority === 'Normal' &&
                  'text-green-500 bg-green-100')
              }`}
            >
              {reminder?.priority}
            </p>

            <p className="description text-[15px] font-normal">
              {`${
                reminder?.description?.split(' ').length > 7
                  ? reminder?.description?.split(' ').slice(0, 7).join(' ') +
                    '...'
                  : reminder?.description
              }`}
            </p>

            <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-2 ">
              <p className="text-[13px] flex items-center gap-2">
                <CalendarArrowUp className="w-4 h-4 " />
                <span className="pt-[3px]">
                  {reminder?.start_date?.slice(0, 10)}
                </span>
              </p>
              <p className="text-[13px] flex items-center gap-2">
                <CalendarCheck2 className="w-4 h-4" />
                <span className="pt-[3px]">
                  {reminder?.end_date?.slice(0, 10)}
                </span>
              </p>
            </div>

            {openSettingId === reminder.id && (
              <div className="absolute z-[5] right-10 top-3">
                <ReminderSetting
                  setOpenSettingId={() => setOpenSettingId(null)}
                  setIsView={setIsView}
                  reminderId={reminder?.id}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
