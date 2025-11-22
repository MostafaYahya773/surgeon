import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface BirthDatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

const SelectDate: React.FC<BirthDatePickerProps> = ({ value, onChange }) => {
  const [selected, setSelected] = React.useState<Date | undefined>(value);

  const handleSelect = (date: Date | undefined) => {
    setSelected(date);
    if (onChange) onChange(date);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="border rounded-xl shadow-sm p-2 bg-white dark:bg-slate-800 dark:border-slate-700 w-fit">
        <style jsx global>{`
          /* حجم اليوم */
          .rdp-day_button {
            width: 28px !important;
            height: 28px !important;
          }
          .rdp-day {
            width: 30px !important;
            height: 25px !important;
          }
          .rdp-dropdown {
            padding: 5px !important;
          }
          .rdp-button_previous,
          .rdp-button_next {
            display: none !important;
          }

          .rdp-month_caption {
            padding: 0 !important;
            font-size: 0.75rem !important;
            justify-content: between !important;
          }
          .rdp-dropdowns {
            width: 100% !important;
            justify-content: space-between !important;
          }
        `}</style>

        <DayPicker
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          fromYear={1950}
          toYear={new Date().getFullYear()}
          captionLayout="dropdown"
          classNames={{
            month: 'dark:text-blue-400 text-[14px]',
            day: 'dark:text-white text-black text-[13px]',
            today: 'text-blue-400 dark:text-white',
            selected: '!text-blue-600',
          }}
        />
      </div>
    </div>
  );
};

export default SelectDate;
