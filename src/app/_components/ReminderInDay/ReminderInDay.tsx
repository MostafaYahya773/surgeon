import React, { useContext, useMemo } from 'react';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { NoData } from '../NoData/NoData';
import { useFetchData } from '@/hooks/useFetchData';
import { Book } from 'lucide-react';
import { GlobalContext } from '@/context/global';

const ReminderInDay = ({
  setIsView,
}: {
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data: reminder } = useFetchData('reminders');
  const {
    date: calenderDate,
    setId,
    setDataInCustom,
  } = useContext(GlobalContext);

  const selectedDate = useMemo(
    () =>
      reminder?.filter((p) => {
        return (
          p?.start_date?.slice(0, 10) ===
          calenderDate?.toLocaleDateString('en-CA')
        );
      }),
    [reminder, calenderDate]
  );
  if (selectedDate?.length === 0)
    return (
      <NoData
        title="You don't have any reminders today"
        icon={<Book className="w-32 h-32 text-blue-200" />}
      />
    );
  if (!reminder) return <LoadingAnimation />;
  return (
    <section className="w-full h-full">
      <table className="w-full">
        <thead className="bg-therd dark:bg-slate-700 dark:text-white">
          <tr>
            <th className="px-2 py-2 text-left text-[14px]">Name</th>
            <th className="px-2 py-2 text-left text-[14px]">priority</th>
            <th className="px-2 py-2 text-left hidden md:table-cell text-[14px]">
              Started Date
            </th>
            <th className="px-2 py-2 text-left hidden md:table-cell text-[14px]">
              End Date
            </th>
            <th className="px-2 py-2 text-left text-[14px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedDate?.map((p, i) => (
            <tr key={i} className="border-t  ">
              <td className="px-2 py-2 text-left text-black font-semibold">
                <p className="text-[15px] text-secondary dark:text-white">
                  {p?.title?.split(' ').length > 2
                    ? `${p?.title?.split(' ').slice(0, 2).join(' ')}...`
                    : p?.title}
                </p>
              </td>
              <td>
                <span
                  className={`${
                    (p?.priority === 'High' &&
                      'text-orange-600 bg-orange-200') ||
                    (p.priority === 'Normal' &&
                      'text-green-600 bg-green-200') ||
                    (p.priority === 'Very High' && 'text-red-600 bg-red-200')
                  } px-2 py-[2px] rounded-2xl text-[13px] text-left font-medium w-fit`}
                >
                  {p?.priority}
                </span>
              </td>

              <td className="px-4 py-2 text-left text-[13px] text-secondary dark:text-white font-medium hidden md:table-cell">
                <span className="">{p?.start_date?.slice(0, 10)}</span>
              </td>
              <td className="px-4 py-2 text-left text-[13px] text-secondary dark:text-white font-medium hidden md:table-cell">
                <span className="">{p?.end_date?.slice(0, 10)}</span>
              </td>
              <td className="px-4 py-2 text-left text-[13px] text-secondary dark:text-white font-medium">
                <button
                  onClick={() => {
                    setIsView(true);
                    setId(p?.id);
                    setDataInCustom('view Reminders');
                  }}
                  className="bg-blue-200 text-black/70 px-2 py-1 rounded-md hover:scale-105 transition-all duration-150"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ReminderInDay;
