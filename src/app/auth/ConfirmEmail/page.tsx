'use client';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from '@/hooks/useLogIn';
import toast from 'react-hot-toast';
import LoadingSave from '@/app/_components/LoadingSave/LoadingSave';
import { ConfirmmEmail } from '../../../interfaces/index';
import { useConfirmEmail } from '@/hooks/useConfirmEmail';
export default function ConfirmEmail() {
  const { mutate: setEmail } = useConfirmEmail();
  const LoginInputs = [
    {
      placeHolder: 'Email',
      type: 'email',
      icon: <Mail className="w-4 h-4 text-gray-400" />,
      name: 'email',
    },
  ];

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .matches(
        /^(?!.*<script)(?!.*<\/)(?!.*<[^>]+>)(?!.*javascript:).*$/,
        'Invalid characters'
      ),
  });

  const formik = useFormik<ConfirmmEmail>({
    initialValues: {
      email: '',
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: (value, { setSubmitting, resetForm }) => {
      setEmail(value, {
        onSuccess: async () => {
          toast.success('Link sent successfully');
          resetForm();
          setSubmitting(false);
        },
        onError: () => {
          toast.error('email is incorrect');
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <div className="flex justify-center items-center mx-auto h-screen">
      <div className="dark:bg-slate-800 w-fit h-fit rounded-lg p-6">
        <div className="w-full flex flex-col gap-10">
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
              Login
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold text-blue-400">
                Reset Your Password
              </h3>
              <p className="dark:text-secondary text-[14px]">
                Enter your email address and we will send you a link to reset
                your password
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-4">
                {LoginInputs.map((input, index) => (
                  <div className="input relative" key={index}>
                    <input
                      className="w-full p-2 px-8 rounded-lg outline-none text-[15px] border dark:border-slate-700 focus:border-slate-600 dark:text-white dark:bg-slate-800"
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeHolder}
                      value={formik.values[input.name as keyof ConfirmmEmail]}
                      onChange={formik.handleChange}
                    />
                    <span className="absolute left-0 top-1/4 px-2">
                      {input.icon}
                    </span>
                    {formik.errors[input?.name as keyof ConfirmmEmail] &&
                      (formik.submitCount > 0 ||
                        formik.values[input?.name as keyof ConfirmmEmail] !==
                          '') && (
                        <div className="text-red-400 text-[14px] mt-1">
                          {formik.errors[input?.name as keyof ConfirmmEmail]}
                        </div>
                      )}
                  </div>
                ))}
              </div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full p-2 bg-blue-500 rounded-lg mt-2 text-white hover:bg-blue-400 disabled:opacity-50"
              >
                {formik.isSubmitting ? <LoadingSave /> : 'send email'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
