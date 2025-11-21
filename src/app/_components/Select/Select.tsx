'use client';
import React, { useState, useContext } from 'react';
import Select, { components } from 'react-select';
import { ArrowDownWideNarrow } from 'lucide-react';
import { SelectProps } from '../../../interfaces/index';
import { GlobalContext } from '@/context/global';

interface MySelectProps {
  data: SelectProps[];
  placeholder?: string;
  value?: string; // علشان نربطه بـ Formik أو أي state خارجي
  onChange?: (option: SelectProps) => void; // لما المستخدم يختار حاجة
}
export const MySelect = ({
  data,
  placeholder,
  value,
  onChange,
}: MySelectProps) => {
  const { setListValue } = useContext(GlobalContext);
  const [internalValue, setInternalValue] = useState<SelectProps | null>(null);

  // تحديد القيمة المعروضة بناء على إذا كان في "value" جاي من بره ولا لأ
  const selectedOption =
    value !== undefined
      ? data.find((option) => option.value === value) || null
      : internalValue;

  const handleChange = (selectedOption: SelectProps | null) => {
    if (selectedOption) {
      // لو في onChange من بره (Formik مثلًا) نديه القيمة
      if (onChange) onChange(selectedOption);
      // نحفظها داخليًا لو مفيش onChange
      else setInternalValue(selectedOption);

      // نحافظ على الـ Context behavior القديم
      setListValue(selectedOption.value);
    }
  };

  const CustomControl = (props: any) => (
    <components.Control {...props}>
      <ArrowDownWideNarrow className="w-4 h-4 text-gray-500 ml-2" />
      {props.children}
    </components.Control>
  );

  return (
    <Select
      instanceId="custom-select"
      options={data}
      placeholder={placeholder}
      components={{ Control: CustomControl }}
      classNamePrefix="react-select"
      value={selectedOption}
      onChange={handleChange}
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: '38px',
          fontSize: '14px',
          outline: 'none',
          borderRadius: '10px',
          borderColor: '#ccc',
          boxShadow: state.isFocused ? '0 0 4px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.2s ease',
          '&:hover': { borderColor: '#bbb' },
        }),
        menu: (base) => ({
          ...base,
          marginTop: '4px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
          border: '1px solid #eee',
          overflow: 'hidden',
          backgroundColor: '#fff',
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? '#7dd3fc' : '#fff',
          color: '#333',
          cursor: 'pointer',
          transition: 'background-color 0.15s ease',
        }),
      }}
    />
  );
};
