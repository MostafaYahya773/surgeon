'use client';
import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import LoadingSave from '../../LoadingSave/LoadingSave';
import { useAddData } from '../../../../hooks/useAddData';
import { ReportData } from '../../../../interfaces/index';
import { GlobalContext } from '@/context/global';
import * as Yup from 'yup';
export const ManualReportDetails = ({
  setIsView,
}: {
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { endpoint, setEndpoint } = useContext(GlobalContext);
  const { mutate } = useAddData(endpoint);
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Report Name is required')
      .matches(
        /^[A-Za-z0-9أ-ي\s]+$/,
        'Title must not contain symbols or links'
      ),

    description: Yup.string()
      .required('Report Description is required')
      .matches(
        /^[A-Za-z0-9أ-ي\s]+$/,
        'Description must not contain symbols or links'
      ),
  });

  const formik = useFormik<ReportData>({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: (ReportData, { resetForm, setSubmitting }) => {
      mutate(ReportData, {
        onSuccess: () => {
          toast.success('Report added successfully');
          resetForm();
          setIsView(false);
          setSubmitting(false);
        },
        onError: () => {
          toast.error('Error adding report');
          setSubmitting(false);
        },
      });
    },
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema,
  });

  useEffect(() => setEndpoint('manual_reports'), []);
  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full gap-2">
          <input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            type="text"
            placeholder="Enter Report Name"
            className="border rounded-lg p-2 w-full outline-none bg-therd dark:bg-slate-800 text-secondary/50 dark:text-white focus:border-secondary/50 focus:border-secondary/50"
          />
          {formik.errors.title &&
            (formik.submitCount > 0 || formik.values.title !== '') && (
              <div className="text-red-400 text-[14px] mt-1">
                {formik.errors.title}
              </div>
            )}
        </div>
        <div>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Report Description"
            className="border h-[300px] rounded-lg p-2 w-full mt-3 resize-none outline-none bg-therd dark:bg-slate-800 text-secondary/50 dark:text-white focus:border-secondary/50 focus:border-secondary/50"
          />
          {formik.errors.description &&
            (formik.submitCount > 0 || formik.values.description !== '') && (
              <div className="text-red-400 text-[14px] mt-1">
                {formik.errors.description}
              </div>
            )}
        </div>
        <button
          type="submit"
          className="mt-3 bg-blue-500 text-white px-10 py-2 rounded-lg transition"
        >
          {formik.isSubmitting ? <LoadingSave /> : 'Create Report'}
        </button>
      </form>
    </section>
  );
};
