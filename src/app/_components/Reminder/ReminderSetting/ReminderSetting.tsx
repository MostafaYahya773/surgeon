'use client';
import React, { useContext } from 'react';
import { Trash, ClipboardPen, FolderOpen } from 'lucide-react';
import { RemniderSettingProps } from '../../../../interfaces/index';
import { GlobalContext } from '@/context/global';

export const ReminderSetting = React.memo(
  ({
    setOpenSettingId,
    setIsView,
    reminderId,
  }: {
    setOpenSettingId: React.Dispatch<React.SetStateAction<boolean>>;
    setIsView: React.Dispatch<React.SetStateAction<boolean>>;
    reminderId: string;
  }) => {
    const { setDataInCustom, handleDelete, setId } = useContext(GlobalContext);
    const actions: RemniderSettingProps[] = [
      {
        label: 'Edit',
        color: 'text-blue-500',
        icon: <ClipboardPen className="w-4 h-4" />,
        border: true,
        onClick: () => {
          setIsView(true);
          setId(reminderId);
          setDataInCustom('edit');
        },
      },
      {
        label: 'Delete',
        color: 'text-red-500',
        icon: <Trash className="w-4 h-4" />,
        border: true,
        onClick: () => handleDelete(reminderId),
      },
      {
        label: 'Open',
        color: 'text-secondary',
        icon: <FolderOpen className="w-4 h-4" />,
        border: false,
        onClick: () => {
          setIsView(true);
          setDataInCustom('view Reminders');
          setId(reminderId);
        },
      },
    ];

    return (
      <div className="flex flex-col gap-2 bg-white shadow p-2 rounded-md">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={() => {
              action.onClick();
              setOpenSettingId(false);
            }}
            className={`flex gap-2 items-center ${action.color} ${
              action.border ? 'border-b pb-2 border-third' : ''
            }`}
          >
            {action.icon}
            <p className="text-[14px]">{action.label}</p>
          </button>
        ))}
      </div>
    );
  }
);
