'use client';
import { GlobalContext } from '@/context/global';
import { useFetchData } from '@/hooks/useFetchData';
import { useFormik } from 'formik';
import { UserPen } from 'lucide-react';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { Auth } from '@/interfaces';
import LoadingSave from '@/app/_components/LoadingSave/LoadingSave';
export default function Setting() {
  const { data: userData } = useFetchData('doctors');

  const [isView, setIsView] = useState<boolean>(false);
  const { handleEdit, setEndpoint, isSubmitting } = useContext(GlobalContext);
  const inputs: Auth[] = [
    { type: 'text', name: 'name', label: 'Full Name' },
    { type: 'email', name: 'email', label: 'Email' },
    { type: 'text', name: 'specialization', label: 'Specialization' },
    { type: 'text', name: 'phone', label: 'Phone' },
    { type: 'date', name: 'date_of_birth', label: 'Date of Birth' },
  ];

  const formik = useFormik({
    initialValues: {
      name: userData?.[0]?.name || '',
      email: userData?.[0]?.email || '',
      specialization: userData?.[0]?.specialization || '',
      phone: userData?.[0]?.phone || '',
      //   image_url: userData?.[0]?.image_url || '',
      date_of_birth: userData?.[0]?.date_of_birth || '',
    },
    onSubmit: (values, { setSubmitting }) => {
      handleEdit(userData?.[0]?.id, values, setIsView);
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    setEndpoint('doctors');
  }, []);
  return (
    <div className="p-5 flex flex-col gap-5">
      {/* Profile Image */}
      <div className="imgDetails flex flex-col gap-5 items-center">
        <h3 className="text-[14px] text-slate-500">Your profile picture</h3>
        <div className="relative w-fit">
          <div className="img z-0 w-20 h-20 rounded-full dark:bg-slate-600 overflow-hidden">
            <Image
              src={'/doctor.jpg'}
              alt="doctor"
              width={90}
              height={90}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="change__Img absolute -bottom-2 right-0 dark:bg-slate-700 dark:text-white w-7 h-7 flex justify-center items-center rounded-full z-20">
            <label
              htmlFor="change"
              className="cursor-pointer rounded-lg text-[14px]"
            >
              <UserPen className="w-4 h-4" />
            </label>
            <input
              type="file"
              id="change"
              className="hidden"
              //   onChange={ReadImagePath}
            />
          </div>
        </div>
        <p className="dark:text-secondary text-[18px]">{userData?.[0]?.name}</p>
      </div>

      {/* Personal Information */}
      <div className="information w-[70%] mx-auto h-fit bg-slate-800 rounded-md p-3">
        <h4 className="dark:text-white text-[20px]">Personal Information</h4>
        <form
          onSubmit={formik.handleSubmit}
          className="inputs grid grid-cols-2 gap-3 mt-2"
        >
          {inputs.map((input, index) => (
            <div key={index} className="input flex flex-col gap-2">
              <label
                htmlFor={input.name}
                className="dark:text-secondary text-[14px]"
              >
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                value={formik.values[input.name] || ''} // fallback
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="outline-none border border-secondary/30 focus:border-secondary/70 duration-200 w-full bg-white dark:bg-slate-800 dark:text-white rounded-md py-[4px] px-2 text-[15px]"
              />
            </div>
          ))}
          <div className="col-span-2 mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? <LoadingSave /> : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
