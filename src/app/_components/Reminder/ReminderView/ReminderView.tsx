'use client';
import { GlobalContext } from '@/context/global';
import { useSelectDataById } from '@/hooks/useSelectDataById';
import React, { useContext } from 'react';
import LoadingAnimation from '../../LoadingAnimation/LoadingAnimation';
export default function ReminderView() {
  const { id, setDataNow, setReminderNow } = useContext(GlobalContext);
  const { data: reminder, isLoading } = useSelectDataById(id, 'reminders');

  const dateAsString = new Date(reminder?.created_at)
    .toLocaleString('en-EG', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(/,/g, '');

  const lastUpdate = new Date(reminder?.updated_at)
    .toLocaleString('en-EG', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
    .replace(/,/g, '');

  const reminderAt = new Date(reminder?.remind_at)
    .toLocaleString('en-EG', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    })
    .replace(/,/g, '');

  const endTime = new Date(reminder?.end_date).toDateString();

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="flex flex-col gap-7">
      <div className="title grid grid-cols-4 *:text-secondary">
        <div className="flex gap-1 flex-col ">
          <span className="label font-medium text-blue-600 text-[12px]">
            Created At
          </span>
          <p className="value text-[13px] flex flex-col ">
            <span>{dateAsString?.slice(0, 15)}</span>

            <span>at {dateAsString?.slice(16)}</span>
          </p>
        </div>
        <div className="flex gap-1 flex-col ">
          <span className="label font-medium text-blue-600 text-[12px]">
            Last Update
          </span>
          <p className="value  pt-1 text-[13px] flex flex-col">
            <span>{lastUpdate?.slice(0, 15)}</span>
            <span>at {lastUpdate?.slice(16)}</span>
          </p>
        </div>
        <div className="flex gap-1 flex-col ">
          <span className="label font-medium text-blue-600 text-[12px]">
            Reminder Time
          </span>
          <p className="value  pt-1 text-[13px] flex flex-col">
            <span>{reminderAt?.slice(0, 15)}</span>
            <span>at {reminderAt?.slice(16)}</span>
          </p>
        </div>

        <div className="flex gap-1 flex-col ">
          <span className="label font-medium text-blue-600 text-[12px]">
            End Time
          </span>
          <p className="value  pt-1 text-[13px]">{endTime}</p>
        </div>
      </div>
      <div className="description flex flex-col gap-7">
        <div className="title">
          <div className="flex gap-3 items-center mb-2">
            <span className="label font-medium text-blue-600 text-[18px]">
              Title
            </span>
            <span
              className={`${
                (reminder?.priority === 'High' &&
                  'bg-orange-200 text-orange-600') ||
                (reminder?.priority === 'Normal' &&
                  'bg-green-200 text-green-600') ||
                (reminder?.priority === 'Very High' &&
                  'bg-red-200 text-red-600')
              } px-3  rounded-lg text-[13px]`}
            >
              {reminder?.priority}
            </span>
          </div>
          <p className="value text-[15px] text-secondary">{reminder?.title}</p>
        </div>
        <div className="title flex flex-col gap-2">
          <span className="label font-medium text-blue-600 text-[18px]">
            Description
          </span>
          <p className="value text-[15px] text-secondary">
            {reminder?.description}
          </p>
        </div>
      </div>
    </div>
  );
}
