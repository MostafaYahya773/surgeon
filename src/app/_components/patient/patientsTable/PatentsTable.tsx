import React, { useContext } from 'react';
import { OperationRecord } from '../../../../interfaces/index';
import { Trash, SquarePen, Eye, User } from 'lucide-react';
import { GlobalContext } from '@/context/global';
import LoadingAnimation from '../../LoadingAnimation/LoadingAnimation';
import { NoData } from '../../NoData/NoData';
const PatientsTable = React.memo(
  ({
    paitents,
    setIsView,
  }: {
    paitents: OperationRecord[];
    setIsView: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const { setId, setDataInCustom, handleDelete } = useContext(GlobalContext);
    if (paitents?.length === 0)
      return (
        <NoData
          title="You don't have any patients"
          icon={<User className="w-32 h-32 text-blue-600 opacity-50" />}
        />
      );
    if (!paitents) return <LoadingAnimation />;

    return (
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 dark:bg-slate-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-slate-800 text-black dark:text-white">
            <tr>
              <th className="px-4 py-2 text-left hidden lg:table-cell">
                Un Number
              </th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left hidden md:table-cell">
                Date In
              </th>
              <th className="px-4 py-2 text-left hidden lg:table-cell">Age</th>
              <th className="px-4 py-2 text-left hidden md:table-cell">
                Gender
              </th>
              <th className="px-4 py-2 text-left hidden md:table-cell">
                Operation
              </th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Setting</th>
            </tr>
          </thead>
          <tbody>
            {paitents?.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2 text-left text-secondary font-medium hidden lg:table-cell">
                  {p?.un_number}
                </td>
                <td className="px-4 py-2 text-left text-black font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-sky-300 rounded-full flex justify-center items-center text-blue-600">
                      {p?.patient_name?.charAt(0).toUpperCase()}
                    </span>
                    <p className="text-black dark:text-white text-[14px]">
                      {p?.patient_name?.split(' ').length > 2
                        ? `${p?.patient_name
                            ?.split(' ')
                            .slice(0, 2)
                            .join(' ')}...`
                        : p?.patient_name}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-2 text-left text-secondary font-medium hidden md:table-cell">
                  {p?.operation_date}
                </td>
                <td className="px-4 py-2 text-left text-secondary font-medium hidden lg:table-cell">
                  {p?.patient_age}
                </td>
                <td
                  className={`${
                    p.gender === 'Male' ? 'text-[#F97316]' : 'text-[#facc15]'
                  } px-4 py-2 text-left font-medium hidden md:table-cell`}
                >
                  {p.gender}
                </td>
                <td className="px-4 py-2 text-left text-secondary font-medium hidden md:table-cell">
                  {p?.operation_name?.split(' ').length > 3
                    ? `${p?.operation_name
                        ?.split(' ')
                        .slice(0, 3)
                        .join(' ')}...`
                    : p?.operation_name}
                </td>
                <td className="px-4 py-2 text-left text-secondary font-medium">
                  <span
                    className={`${
                      p?.operation_status === 'Emergency'
                        ? 'text-red-600'
                        : 'text-green-600'
                    } px-2 py-[2px]  rounded-md`}
                  >
                    {p?.operation_status}
                  </span>
                </td>
                <td className="px-4 py-2 text-left text-secondary font-medium">
                  <div className="flex  gap-3">
                    <span title="Print">
                      <Eye
                        onClick={() => {
                          setIsView(true);
                          setId(p.id);
                          setDataInCustom('view');
                        }}
                        className="w-5 h-5 cursor-pointer text-secondary/50"
                      />
                    </span>
                    <span title="Edit">
                      <SquarePen
                        onClick={() => {
                          setIsView(true);
                          setDataInCustom('edit');
                          setId(p?.id);
                        }}
                        className="w-5 h-5 cursor-pointer text-blue-600"
                      />
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
export default PatientsTable;
