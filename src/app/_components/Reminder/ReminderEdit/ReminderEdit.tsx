'use client';
import React, { useContext, useEffect } from 'react';
import { MySelect } from '../../Select/Select';
import { SelectProps, Form } from '../../../../interfaces/index';
import { GlobalContext } from '@/context/global';
import { useFormik } from 'formik';
import { useSelectDataById } from '@/hooks/useSelectDataById';
import LoadingSave from '../../LoadingSave/LoadingSave';
import * as Yup from 'yup';
import { DateInput } from '../../../_components/Date/Date';

export default function ReminderEdit({
  setIsView,
}: {
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const priorityList: SelectProps[] = [
    { label: 'Very High', value: 'Very High' },
    { label: 'High', value: 'High' },
    { label: 'Normal', value: 'Normal' },
  ];
  const { endpoint, setEndpoint, id, handleEdit, isSubmitting } =
    useContext(GlobalContext);
  const { data: reminderData, isLoading } = useSelectDataById(id, endpoint);
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
  const formik = useFormik<Form>({
    initialValues: {
      title: reminderData?.title || '',
      description: reminderData?.description || '',
      priority: reminderData?.priority || '',
      remind_at: reminderData?.remind_at || '',
      start_date: reminderData?.start_date || '',
      end_date: reminderData?.end_date || '',
    },
    onSubmit: (updateData) => {
      handleEdit(id, updateData, setIsView);
    },
    enableReinitialize: true,
    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
  });
  useEffect(() => setEndpoint('reminders'), []);
  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-2 text-secondary">
          {/* Title & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <label
                htmlFor="signature"
                className="text-[14px] text-blue-600 px-1"
              >
                Title
              </label>
              <input
                aria-label="Title input"
                type="text"
                name={'title'}
                value={formik.values['title']}
                onChange={formik.handleChange}
                placeholder="Enter your title..."
                className="outline-none border border-secondary/30  focus:border-secondary/70 bg-white dark:bg-slate-800 dark:text-white duration-200 w-full rounded-md py-[4px] px-2 text-[15px]"
              />
              {formik.errors.title &&
                (formik.submitCount > 0 || formik.values.title !== '') && (
                  <div className="text-red-400 text-[14px] mt-1">
                    {formik.errors.title}
                  </div>
                )}
            </div>
            <div className="flex flex-col px-1">
              <span className="text-[14px] text-blue-600 px-1">Priority</span>
              <MySelect
                data={priorityList}
                value={formik.values['priority']}
                placeholder="Select Priority"
                onChange={(option) =>
                  formik.setFieldValue('priority', option.value)
                }
              />
              {formik.errors.priority &&
                (formik.submitCount > 0 || formik.values.priority !== '') && (
                  <div className="text-red-400 text-[14px] mt-1">
                    {formik.errors.priority}
                  </div>
                )}
            </div>
            <div className="start_date">
              <DateInput
                setDate={(value) => formik.setFieldValue('start_date', value)}
                date={formik.values['start_date']}
                label="Start Date"
              />
              {formik.errors.start_date &&
                (formik.submitCount > 0 || formik.values.start_date !== '') && (
                  <div className="text-red-400 text-[14px] mt-1">
                    {formik.errors.start_date}
                  </div>
                )}
            </div>
            <div className="end_date">
              <DateInput
                setDate={(value) => formik.setFieldValue('end_date', value)}
                date={formik.values['end_date']}
                label="End Date"
              />
              {formik.errors.end_date &&
                (formik.submitCount > 0 || formik.values.end_date !== '') && (
                  <div className="text-red-400 text-[14px] mt-1">
                    {formik.errors.end_date}
                  </div>
                )}
            </div>
            <div className="reminder_at">
              <DateInput
                setDate={(value) => formik.setFieldValue('remind_at', value)}
                date={formik.values['remind_at']}
                label="Remind At"
              />
              {formik.errors.remind_at &&
                (formik.submitCount > 0 || formik.values.remind_at !== '') && (
                  <div className="text-red-400 text-[14px] mt-1">
                    {formik.errors.remind_at}
                  </div>
                )}
            </div>
          </div>

          {/* Description */}
          <div>
            <textarea
              aria-label="input description"
              placeholder="Enter your description..."
              name={'description'}
              value={formik.values['description']}
              onChange={formik.handleChange}
              className="outline-none  border resize-none text-[15px] border-secondary/30 focus:border-secondary/70 bg-white dark:bg-slate-800 dark:text-white duration-200 w-full h-[300px] rounded-md p-3"
            ></textarea>
            {formik.errors.description &&
              (formik.submitCount > 0 || formik.values.description !== '') && (
                <div className="text-red-400 text-[14px] mt-1">
                  {formik.errors.description}
                </div>
              )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 duration-300 text-white rounded-md"
          >
            {isSubmitting ? <LoadingSave /> : 'Update Reminder'}
          </button>
        </div>
      </form>
    </section>
  );
}
