import React, { useContext } from 'react';
import { FetchData } from '../../../../interfaces/index';
import { Trash, SquarePen, Eye, BookOpenText } from 'lucide-react';
import { GlobalContext } from '@/context/global';
import { NoData } from '../../NoData/NoData';
import LoadingAnimation from '../../LoadingAnimation/LoadingAnimation';
const ManualRebortTable = React.memo(
  ({
    paitentReports,
    setIsView,
  }: {
    paitentReports: FetchData[];
    setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const { setId, setDataInCustom, handleDelete } = useContext(GlobalContext);
    if (!paitentReports) return <LoadingAnimation />;
    if (paitentReports?.length === 0)
      return (
        <div className="h-[70vh]">
          <NoData
            title="You don't have any reports"
            icon={
              <BookOpenText className="w-32 h-32 text-blue-600 opacity-50" />
            }
          />
        </div>
      );
    return (
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 dark:bg-slate-800  rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-slate-800 text-black dark:text-white">
            <tr>
              <th className="px-4 py-2 text-left hidden lg:table-cell">Name</th>
              <th className="px-4 py-2 text-left hidden md:table-cell">
                Description
              </th>
              <th className="px-4 py-2 text-left hidden md:table-cell">
                Date In
              </th>
              <th className="px-4 py-2 text-left">Setting</th>
            </tr>
          </thead>
          <tbody>
            {paitentReports?.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="px-1 py-2 text-left text-secondary font-medium hidden lg:table-cell">
                  <div className="flex gap-2 items-center">
                    <span className="w-6 h-6 bg-sky-300 rounded-full flex justify-center items-center text-blue-600">
                      {p.title.charAt(0).toUpperCase()}
                    </span>
                    {p.title}
                  </div>
                </td>
                <td className="text-secondary">{`${p.description
                  .split(' ')
                  .slice(0, 3)
                  .join(' ')}...`}</td>
                <td className="px-4 py-2 text-left text-secondary font-medium hidden lg:table-cell">
                  {p.created_at?.slice(0, 10)}
                </td>
                <td className="px-4 py-2 text-left text-secondary font-medium">
                  <div className="flex gap-3">
                    <span title="Print">
                      <Eye
                        onClick={() => {
                          setIsView(true);
                          setDataInCustom('view ManualReport');
                          setId(p?.id);
                        }}
                        className="w-5 h-5 cursor-pointer text-secondary/50"
                      />
                    </span>
                    <span
                      onClick={() => {
                        setIsView(true), setDataInCustom('edit'), setId(p?.id);
                      }}
                      title="Edit"
                    >
                      <SquarePen className="w-5 h-5 cursor-pointer text-blue-600" />
                    </span>
                    <span onClick={() => handleDelete(p?.id)} title="Delete">
                      <Trash className="w-5 h-5 cursor-pointer text-red-600" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
export default ManualRebortTable;
