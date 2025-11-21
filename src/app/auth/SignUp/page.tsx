'use client';
import React, { useState, useRef } from 'react';
import { Mail, Lock, User, Stethoscope, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Auth, auth } from '../../../interfaces/index';
import SelectDate from '@/app/_components/SelectDate/SelectDate';
import { useFormik } from 'formik';
import { useSignUp } from '@/hooks/useSignUp';
import toast from 'react-hot-toast';
import { redirect, useRouter } from 'next/navigation';
import * as Yup from 'yup';
import LoadingSave from '@/app/_components/LoadingSave/LoadingSave';
export default function SignUp() {
  const { mutate: signUp } = useSignUp();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const safeString = /^[A-Za-zأ-ي0-9\s]+$/;
  const noXSS =
    /^(?!.*<)(?!.*>)(?!.*script)(?!.*javascript:)(?!.*onerror)(?!.*onload).*$/i;

  const router = useRouter();
  const handleDateSelect = (date: Date | undefined, setFieldValue: any) => {
    setSelectedDate(date);
    setFieldValue(
      'date_of_birth',
      date ? date.toISOString().split('T')[0] : ''
    );
    setShowCalendar(false);
  };
  const LoginInputs: auth[] = [
    {
      placeHolder: 'Full Name',
      type: 'text',
      icon: <User className="w-4 h-4 text-gray-400" />,
      name: 'name',
    },
    {
      placeHolder: 'Specialization',
      type: 'text',
      icon: <Stethoscope className="w-4 h-4 text-gray-400" />,
      name: 'specialization',
    },
    {
      placeHolder: 'Birthdate',
      type: 'date',
      icon: <Calendar className="w-4 h-4 text-gray-400" />,
      name: 'date_of_birth',
    },
    {
      placeHolder: 'Email',
      type: 'email',
      icon: <Mail className="w-4 h-4 text-gray-400" />,
      name: 'email',
    },
    {
      placeHolder: 'Password',
      type: 'password',
      icon: <Lock className="w-4 h-4 text-gray-400" />,
      name: 'password',
    },
    {
      placeHolder: 'Confirm Password',
      type: 'password',
      icon: <Lock className="w-4 h-4 text-gray-400" />,
      name: 'confirmPassword',
    },
  ];
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(30, 'name must be at most 30 characters')
      .required('Name is required')
      .matches(noXSS, 'Invalid characters')
      .matches(safeString, 'Symbols are not allowed'),

    email: Yup.string()
      .email('Invalid email')
      .required('Email is required')
      .matches(noXSS, 'Invalid characters'),

    password: Yup.string()
      .required('Password is required')
      .matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]{8,}$/, 'Password is weak')
      .matches(noXSS, 'Invalid characters'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .matches(noXSS, 'Invalid characters'),

    date_of_birth: Yup.date().required('Date of birth is required'),
    specialization: Yup.string()
      .max(30, 'Specialization must be at most 30 characters')
      .required('Specialization is required')
      .matches(noXSS, 'Invalid characters')
      .matches(safeString, 'Symbols are not allowed'),
  });

  const formik = useFormik<Auth>({
    initialValues: {
      name: '',
      email: '',
      specialization: '',
      date_of_birth: '',
      password: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      signUp(values, {
        onSuccess: () => {
          toast.success('Account created successfully');
          resetForm();
          setSelectedDate(undefined);
          setSubmitting(false);
          router.push('/auth/Login');
        },
        onError: (data) => {
          toast.error(data.message || 'Error creating account');
          setSubmitting(false);
        },
      });
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
  });

  return (
    <div className="flex justify-center items-center mx-auto h-screen">
      <div className="dark:bg-slate-800 w-fit h-fit rounded-lg p-6">
        <div className="w-full flex flex-col gap-10">
          {/* Header */}
          <div className="title flex justify-between items-center">
            <Image
              src="/nav/SurgeonLogo.png"
              alt="logo"
              width={25}
              height={25}
            />
            <Link
              href="/auth/Login"
              className="text-blue-600 dark:text-white text-[15px] border border-slate-600 py-[2px] px-5 rounded-lg dark:hover:bg-white dark:hover:text-blue-400 transition-all duration-300"
            >
              Log in
            </Link>
          </div>

          {/* Text Section */}
          <div className="flex flex-col gap-1">
            <h3 className="text-2xl font-bold text-blue-400">
              Create new account
            </h3>
            <p className="dark:text-secondary text-[14px]">
              Manage your patients and appointments online
            </p>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-4 relative"
            onSubmit={formik.handleSubmit}
          >
            {/* Full Name */}
            {LoginInputs?.slice(0, 1).map((input, idx) => (
              <div className="input relative" key={idx}>
                <input
                  className="w-full p-2 px-8 rounded-lg outline-none text-[15px] border dark:border-slate-700 focus:border-slate-600 dark:text-white dark:bg-slate-800"
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeHolder}
                  value={
                    formik.values[input.name as keyof typeof formik.values] ||
                    ''
                  }
                  onChange={formik.handleChange}
                />
                <span className="absolute left-0 top-1/4 px-2">
                  {input.icon}
                </span>
                {formik.errors[input?.name as keyof Auth] &&
                  (formik.submitCount > 0 ||
                    formik.values[input?.name as keyof Auth] !== '') && (
                    <div className="text-red-400 text-[14px] mt-1">
                      {formik.errors[input?.name as keyof Auth]}
                    </div>
                  )}
              </div>
            ))}

            {/* Specialization + Birthdate */}
            <div className="grid grid-cols-2 gap-4">
              {LoginInputs?.slice(1, 3).map((input, idx) => {
                if (input.placeHolder === 'Birthdate') {
                  return (
                    <div className="input relative" key={idx}>
                      <input
                        ref={dateInputRef}
                        className="w-full p-2 px-8 rounded-lg outline-none text-[15px] border dark:border-slate-700 focus:border-slate-600 dark:text-white dark:bg-slate-800 cursor-pointer"
                        type="text"
                        placeholder={input.placeHolder}
                        readOnly
                        value={
                          selectedDate
                            ? selectedDate.toLocaleDateString('en-CA')
                            : ''
                        }
                        onClick={() => setShowCalendar(!showCalendar)}
                      />
                      <span className="absolute left-0 top-1/4 px-2">
                        {input.icon}
                      </span>
                      {showCalendar && (
                        <div className="absolute z-50 mt-2">
                          <SelectDate
                            value={selectedDate}
                            onChange={(date) =>
                              handleDateSelect(date, formik.setFieldValue)
                            }
                          />
                        </div>
                      )}
                      {formik.errors[input?.name as keyof Auth] &&
                        (formik.submitCount > 0 ||
                          formik.values[input?.name as keyof Auth] !== '') && (
                          <div className="text-red-400 text-[14px] mt-1">
                            {formik.errors[input?.name as keyof Auth]}
                          </div>
                        )}
                    </div>
                  );
                }
                return (
                  <div className="input relative" key={idx}>
                    <input
                      className="w-full p-2 px-8 rounded-lg outline-none text-[15px] border dark:border-slate-700 focus:border-slate-600 dark:text-white dark:bg-slate-800"
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeHolder}
                      value={
                        formik.values[
                          input.name as keyof typeof formik.values
                        ] || ''
                      }
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span className="absolute left-0 top-1/4 px-2">
                      {input.icon}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Email */}
            {LoginInputs.slice(3, 4).map((input, idx) => (
              <div className="input relative" key={idx}>
                <input
                  className="w-full p-2 px-8 rounded-lg outline-none text-[15px] border dark:border-slate-700 focus:border-slate-600 dark:text-white dark:bg-slate-800"
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeHolder}
                  value={
                    formik.values[input.name as keyof typeof formik.values] ||
                    ''
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="absolute left-0 top-1/4 px-2">
                  {input.icon}
                </span>
                {formik.errors[input?.name as keyof Auth] &&
                  (formik.submitCount > 0 ||
                    formik.values[input?.name as keyof Auth] !== '') && (
                    <div className="text-red-400 text-[14px] mt-1">
                      {formik.errors[input?.name as keyof Auth]}
                    </div>
                  )}
              </div>
            ))}

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-2 gap-4">
              {LoginInputs.slice(4).map((input, idx) => (
                <div className="input relative" key={idx}>
                  <input
                    className="w-full p-2 px-8 rounded-lg outline-none text-[15px] border dark:border-slate-700 focus:border-slate-600 dark:text-white dark:bg-slate-800"
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeHolder}
                    value={
                      formik.values[input.name as keyof typeof formik.values] ||
                      ''
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span className="absolute left-0 top-1/4 px-2">
                    {input.icon}
                  </span>
                  {/* {formik?.touched[input.name as keyof typeof formik.touched] &&
                    formik?.errors[
                      input.name as keyof typeof formik.errors
                    ] && (
                      <p className="text-red-500 text-[12px] mt-2">
                        {
                          formik?.errors[
                            input.name as keyof typeof formik.errors
                          ]
                        }
                      </p>
                    )} */}
                  {formik.errors[input?.name as keyof Auth] &&
                    (formik.submitCount > 0 ||
                      formik.values[input?.name as keyof Auth] !== '') && (
                      <div className="text-red-400 text-[14px] mt-1">
                        {formik.errors[input?.name as keyof Auth]}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className="w-full p-2 bg-blue-500 rounded-lg mt-2 text-white hover:bg-blue-400"
            >
              {formik.isSubmitting ? <LoadingSave /> : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
