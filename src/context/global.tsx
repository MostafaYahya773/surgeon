'use client';
import { createContext, ReactNode, useState } from 'react';
import {
  GlobalState,
  ReportData,
  OperationRecord,
  Form,
  Auth,
} from '../interfaces/index';
import toast from 'react-hot-toast';
import { useDeleteData } from '@/hooks/useDeleteData';
import { useUpdateData } from '@/hooks/useUpdateData';
import { usePathname } from 'next/navigation';
import LoadingAnimation from '@/app/_components/LoadingAnimation/LoadingAnimation';

export const GlobalContext = createContext<GlobalState>({} as GlobalState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [listValue, setListValue] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [dataInCustom, setDataInCustom] = useState<string>('');
  const [endpoint, setEndpoint] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dataNow, setDataNow] = useState<string>('');
  const [reminderNow, setReminderNow] = useState<string>('');
  const path = usePathname();

  // hooks
  const { mutate: deleteData, isPending } = useDeleteData(endpoint);
  const { mutate: updateData } = useUpdateData(endpoint);

  // function to delete report or patient
  const handleDelete = (userId: string) => {
    setIsSubmitting(true);
    deleteData(userId, {
      onSuccess: () => {
        toast.success(
          `${path === '/Patients' ? 'Patient' : 'Report'} deleted successfully`
        );
        setIsSubmitting(false);
      },
      onError: () => {
        toast.error(
          `${
            path === '/Patients' ? 'Patient' : 'Report'
          } not deleted successfully`
        );
        setIsSubmitting(false);
      },
    });
  };

  // function to edit report or patient
  const handleEdit = (
    userId: string,
    data: ReportData | OperationRecord | Form | Auth,
    setIsView?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setIsSubmitting(true);
    updateData(
      { id: userId, updatedData: data },
      {
        onSuccess: () => {
          toast.success(
            `${
              (path === '/home/Patients' && 'Patient') ||
              (path === '/home/ManualReport' && 'Report') ||
              (path === '/home/Reminders' && 'Reminder') ||
              (path === '/home/Setting' && 'profile')
            } updated successfully`
          );
        },
        onError: () => {
          toast.error(
            `${
              (path === '/home/Patients' && 'Patient') ||
              (path === '/home/ManualReport' && 'Report') ||
              (path === '/home/Reminders' && 'Reminder')
            } not updated successfully`
          );
        },
        onSettled: () => {
          setIsView(false);
          setIsSubmitting(false);
        },
      }
    );
  };

  return (
    <GlobalContext.Provider
      value={{
        listValue,
        setListValue,
        searchInput,
        setSearchInput,
        id,
        setId,
        dataInCustom,
        setDataInCustom,
        handleDelete,
        handleEdit,
        setEndpoint,
        endpoint,
        isSubmitting,
        date,
        setDate,
        dataNow,
        setDataNow,
        reminderNow,
        setReminderNow,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
