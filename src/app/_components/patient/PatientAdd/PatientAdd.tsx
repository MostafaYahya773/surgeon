'use client';
import React, { useContext, useEffect } from 'react';
import {
  patentAddInfo,
  SelectProps,
  OperationReportFormValues,
} from '../../../../interfaces/index';
import {
  SquareUserRound,
  Info,
  Target,
  ReceiptText,
  SquareRadical,
  Signature,
} from 'lucide-react';
import Title from '../../Title/title';
import { MySelect } from '../../Select/Select';
import { useFormik } from 'formik';
import { GlobalContext } from '@/context/global';
import { useAddData } from '@/hooks/useAddData';
import toast from 'react-hot-toast';
import LoadingSave from '../../LoadingSave/LoadingSave';
import * as Yup from 'yup';
export const PatientAdd = ({
  setIsView,
}: {
  setIsView: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { endpoint, setEndpoint } = useContext(GlobalContext);
  const { mutate, isPending } = useAddData(endpoint);
  const safeText = /^(?!.*(http|www|<|>|script|&|%|\$|\{|\}|\/|\\|"|')).+$/;
  const validationSchema = Yup.object().shape({
    patient_name: Yup.string()
      .required('Patient Name is required')
      .matches(safeText, 'Invalid characters or links are not allowed'),

    patient_age: Yup.number()
      .required('Patient Age is required')
      .min(0, 'Age cannot be negative'),

    patient_berth_date: Yup.string().required('Birth Date is required'),
    gender: Yup.string().required('Gender is required'),

    un_number: Yup.string()
      .required('UN Number is required')
      .matches(/^[A-Za-z0-9\s]+$/, 'Invalid characters'),

    operation_date: Yup.string().required('Operation Date is required'),

    operation_name: Yup.string()
      .required('Operation Name is required')
      .matches(safeText, 'Invalid characters or links are not allowed'),

    consultant_name: Yup.string()
      .required('Consultant Name is required')
      .matches(safeText, 'Invalid characters or links are not allowed'),

    surgeon_name: Yup.string()
      .required('Surgeon Name is required')
      .matches(safeText, 'Invalid characters or links are not allowed'),

    anaesthetist_name: Yup.string()
      .required('Anaesthetist Name is required')
      .matches(safeText, 'Invalid characters or links are not allowed'),

    assistant_name: Yup.string()
      .required('Assistant Name is required')
      .matches(safeText, 'Invalid characters or links are not allowed'),

    assistant_sn: Yup.string()
      .required('Assistant SN is required')
      .matches(/^[A-Za-z0-9\s]+$/, 'Invalid characters'),

    anaesthesia: Yup.string().required('Anaesthesia is required'),
    operation_status: Yup.string().required('Operation Status is required'),

    patient_position: Yup.string()
      .required('Patient Position is required')
      .matches(safeText, 'Invalid characters'),

    indication: Yup.string()
      .required('Indication is required')
      .matches(safeText, 'Invalid characters'),

    pneumoperitoneum_and_insufflation: Yup.string()
      .required('Pneumoperitoneum & Insufflation is required')
      .matches(safeText, 'Invalid characters'),

    incisions: Yup.string()
      .required('Incisions is required')
      .matches(safeText, 'Invalid characters'),

    operative_findings: Yup.string()
      .required('Operative Findings is required')
      .matches(safeText, 'Invalid characters'),

    tissue_removed: Yup.string()
      .required('Tissue Removed is required')
      .matches(safeText, 'Invalid characters'),

    antibiotic_type: Yup.string()
      .required('Antibiotic Type is required')
      .matches(safeText, 'Invalid characters'),

    estimated_blood_loss: Yup.string()
      .required('Estimated Blood Loss is required')
      .matches(safeText, 'Invalid characters'),

    procedure: Yup.string()
      .required('Procedure is required')
      .matches(safeText, 'Invalid characters'),

    operative_complications: Yup.string()
      .required('Operative Complications is required')
      .matches(safeText, 'Invalid characters'),

    extra_procedure: Yup.string()
      .required('Extra Procedure is required')
      .matches(safeText, 'Invalid characters'),

    abx_prophylaxis: Yup.string().required('ABX Prophylaxis is required'),
    dvt_prophylaxis: Yup.string().required('DVT Prophylaxis is required'),

    closure: Yup.string()
      .required('Closure is required')
      .matches(safeText, 'Invalid characters'),

    post_op: Yup.string()
      .required('Post Op is required')
      .matches(safeText, 'Invalid characters'),

    signature: Yup.string()
      .required('Signature is required')
      .matches(safeText, 'Invalid characters'),
  });
  const formik = useFormik<OperationReportFormValues>({
    initialValues: {
      patient_name: '',
      patient_age: '',
      patient_berth_date: '',
      gender: '',
      un_number: '',
      // Operation Info
      operation_date: '',
      operation_name: '',
      consultant_name: '',
      surgeon_name: '',
      anaesthetist_name: '',
      assistant_name: '',
      assistant_sn: '',
      anaesthesia: '',
      operation_status: '',

      // Pre & During Operation
      patient_position: '',
      indication: '',
      pneumoperitoneum_and_insufflation: '',
      incisions: '',
      operative_findings: '',

      // Procedure Details
      tissue_removed: '',
      antibiotic_type: '',
      estimated_blood_loss: '',
      procedure: '',
      operative_complications: '',
      extra_procedure: '',
      abx_prophylaxis: '',
      dvt_prophylaxis: '',

      // Closure & Post Op
      closure: '',
      post_op: '',

      // Signature
      signature: '',
    },

    onSubmit: (values, { resetForm, setSubmitting }) => {
      mutate(values, {
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

    validationSchema,
    validateOnChange: true,
    validateOnBlur: false,
  });

  const patentInfo: patentAddInfo[] = [
    {
      label: 'Patient Name',
      type: 'text',
      placeHolder: 'Enter Patient Name',
      name: 'patient_name',
    },
    {
      label: 'Patient Age',
      type: 'text',
      placeHolder: 'Enter Patient Age',
      name: 'patient_age',
    },
    {
      label: 'Patient Berth Date',
      type: 'date',
      placeHolder: 'Enter Patient Berth Date',
      name: 'patient_berth_date',
    },
    {
      label: 'UN Number',
      type: 'text',
      placeHolder: 'Enter UN Number',
      name: 'un_number',
    },
  ];

  const operationInfo: patentAddInfo[] = [
    { label: 'Operation Date', type: 'date', name: 'operation_date' },
    { label: 'Operation Name', type: 'text', name: 'operation_name' },
    { label: 'Consultant Name', type: 'text', name: 'consultant_name' },
    { label: 'Surgeon Name', type: 'text', name: 'surgeon_name' },
    { label: 'Anaesthetist Name', type: 'text', name: 'anaesthetist_name' },
    { label: 'Assistant Name', type: 'text', name: 'assistant_name' },
    { label: 'Assistant SN', type: 'text', name: 'assistant_sn' },
  ];

  const preDuringOperation: patentAddInfo[] = [
    { label: 'Patient Position', type: 'textarea', name: 'patient_position' },
    { label: 'Indication', type: 'textarea', name: 'indication' },
    {
      label: 'Pneumoperitoneum and Insufflation',
      type: 'textarea',
      name: 'pneumoperitoneum_and_insufflation',
    },
    { label: 'Incisions', type: 'textarea', name: 'incisions' },
    {
      label: 'Operative Findings',
      type: 'textarea',
      name: 'operative_findings',
    },
  ];

  const procedureDetails: patentAddInfo[] = [
    { label: 'Tissue Removed', type: 'text', name: 'tissue_removed' },
    { label: 'Antibiotic Type', type: 'text', name: 'antibiotic_type' },
    {
      label: 'Estimated Blood Loss',
      type: 'text',
      name: 'estimated_blood_loss',
    },
    { label: 'Procedure', type: 'textarea', name: 'procedure' },
    {
      label: 'Operative Complications / Problems',
      type: 'textarea',
      name: 'operative_complications',
    },
    { label: 'Extra Procedure', type: 'textarea', name: 'extra_procedure' },
  ];

  const closureAndPostOperation: patentAddInfo[] = [
    { label: 'Closure', type: 'textarea', name: 'closure' },
    { label: 'Post Op', type: 'textarea', name: 'post_op' },
  ];

  const anaesthesiaOptions: SelectProps[] = [
    { label: 'General', value: 'General' },
    { label: 'Semi', value: 'Semi' },
    { label: 'Local', value: 'Local' },
  ];

  const operationStatusOptions: SelectProps[] = [
    { label: 'Elective', value: 'Elective' },
    { label: 'Emergency', value: 'Emergency' },
  ];

  const abxOptions: SelectProps[] = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

  const dvtOptions: SelectProps[] = [
    { value: 'TEDS', label: 'TEDS' },
    { value: 'Flowtrons', label: 'Flowtrons' },
  ];

  const gender: SelectProps[] = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  useEffect(() => {
    setEndpoint('notes');
  }, []);

  return (
    <section className="flex flex-col gap-2">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        {/* Patient Info */}
        <div>
          <Title
            title="Patient Information"
            icon={<SquareUserRound className="w-6 h-6 text-blue-500" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {patentInfo?.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label className="text-[14px] text-blue-600 px-1">
                  {item.label}
                </label>
                <input
                  type={item.type}
                  name={item.name}
                  value={
                    formik.values[item?.name as keyof OperationReportFormValues]
                  }
                  onChange={formik.handleChange}
                  placeholder={item.placeHolder}
                  className="border rounded-lg p-2 text-[14px] text-black dark:text-white outline-none bg-therd dark:bg-slate-800 focus:border-secondary/50"
                />
                {formik.errors[item?.name as keyof OperationReportFormValues] &&
                  (formik.submitCount > 0 ||
                    formik.values[
                      item?.name as keyof OperationReportFormValues
                    ] !== '') && (
                    <div className="text-red-400 text-[14px] mt-1">
                      {
                        formik.errors[
                          item?.name as keyof OperationReportFormValues
                        ]
                      }
                    </div>
                  )}
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-blue-600 px-1">Gender</label>
              <MySelect
                data={gender}
                placeholder="Gender"
                value={formik.values['gender']}
                onChange={(option) =>
                  formik.setFieldValue('gender', option.value)
                }
              />
              {formik.errors['gender'] && formik.submitCount > 0 && (
                <div className="text-red-400 text-[14px] mt-1">
                  {formik.errors['gender']}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Operation Info */}
        <div>
          <Title
            title="Operation Information"
            icon={<Info className="w-6 h-6 text-blue-500" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {operationInfo.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label className="text-[14px] text-blue-600 px-1">
                  {item.label}
                </label>
                <input
                  type={item.type}
                  name={item.name}
                  value={
                    formik.values[item.name as keyof OperationReportFormValues]
                  }
                  onChange={formik.handleChange}
                  placeholder={`Enter ${item.label}`}
                  className="border rounded-lg p-2 text-[14px] text-black dark:text-white outline-none bg-therd dark:bg-slate-800 focus:border-secondary/50"
                />
                {formik.errors[item?.name as keyof OperationReportFormValues] &&
                  (formik.submitCount > 0 ||
                    formik.values[
                      item?.name as keyof OperationReportFormValues
                    ] !== '') && (
                    <div className="text-red-400 text-[14px] mt-1">
                      {
                        formik.errors[
                          item?.name as keyof OperationReportFormValues
                        ]
                      }
                    </div>
                  )}
              </div>
            ))}

            {/* Anaesthesia */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-blue-600 px-1">
                Anaesthesia
              </label>
              <MySelect
                data={anaesthesiaOptions}
                placeholder="Anaesthesia"
                value={formik.values['anaesthesia']}
                onChange={(option) =>
                  formik.setFieldValue('anaesthesia', option.value)
                }
              />
              {formik.errors['anaesthesia'] && formik.submitCount > 0 && (
                <div className="text-red-400 text-[14px] mt-1">
                  {formik.errors['anaesthesia']}
                </div>
              )}
            </div>

            {/* Operation Status */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-blue-600 px-1">
                Operation Status
              </label>
              <MySelect
                data={operationStatusOptions}
                placeholder="Operation Status"
                value={formik.values['operation_status']}
                onChange={(option) =>
                  formik.setFieldValue('operation_status', option.value)
                }
              />
              {formik.errors['operation_status'] && formik.submitCount > 0 && (
                <div className="text-red-400 text-[14px] mt-1">
                  {formik.errors['operation_status']}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pre & During Operation */}
        <div>
          <Title
            title="Pre & During Operation"
            icon={<Target className="w-6 h-6 text-blue-500" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {preDuringOperation?.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label className="text-[14px] text-blue-600 px-1">
                  {item.label}
                </label>
                {item.type === 'textarea' ? (
                  <textarea
                    name={item.name}
                    value={
                      formik.values[
                        item?.name as keyof OperationReportFormValues
                      ]
                    }
                    onChange={formik.handleChange}
                    placeholder={`Enter ${item.label}`}
                    className="border text-[14px] rounded-lg p-2 outline-none bg-therd dark:bg-slate-800 text-black dark:text-white focus:border-secondary/50 h-[160px] resize-none"
                  />
                ) : (
                  <input
                    type={item?.type}
                    name={item?.name}
                    value={
                      formik.values[
                        item?.name as keyof OperationReportFormValues
                      ]
                    }
                    onChange={formik.handleChange}
                    placeholder={`Enter ${item.label}`}
                    className="border text-[14px] rounded-lg p-2 outline-none bg-therd dark:bg-slate-800 text-black dark:text-white focus:border-secondary/50"
                  />
                )}
                {formik.errors[item?.name as keyof OperationReportFormValues] &&
                  (formik.submitCount > 0 ||
                    formik.values[
                      item?.name as keyof OperationReportFormValues
                    ] !== '') && (
                    <div className="text-red-400 text-[14px] mt-1">
                      {
                        formik.errors[
                          item?.name as keyof OperationReportFormValues
                        ]
                      }
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Procedure Details */}
        <div>
          <Title
            title="Procedure Details"
            icon={<ReceiptText className="w-6 h-6 text-blue-500" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {procedureDetails.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label className="text-[14px] text-blue-600 px-1">
                  {item.label}
                </label>
                {item.type === 'textarea' ? (
                  <textarea
                    name={item.name}
                    value={
                      formik.values[
                        item.name as keyof OperationReportFormValues
                      ]
                    }
                    onChange={formik.handleChange}
                    placeholder={`Enter ${item.label}`}
                    className="border text-[14px] rounded-lg p-2 outline-none bg-therd dark:bg-slate-800 text-black dark:text-white focus:border-secondary/50 h-[160px] resize-none"
                  />
                ) : (
                  <input
                    type={item.type}
                    name={item.name}
                    value={
                      formik.values[
                        item.name as keyof OperationReportFormValues
                      ]
                    }
                    onChange={formik.handleChange}
                    placeholder={`Enter ${item.label}`}
                    className="border text-[14px] rounded-lg p-2 outline-none bg-therd dark:bg-slate-800 text-black dark:text-white focus:border-secondary/50"
                  />
                )}
                {formik.errors[item.name as keyof OperationReportFormValues] &&
                  (formik.submitCount > 0 ||
                    formik.values[
                      item.name as keyof OperationReportFormValues
                    ] !== '') && (
                    <div className="text-red-400 text-[14px] mt-1">
                      {
                        formik.errors[
                          item.name as keyof OperationReportFormValues
                        ]
                      }
                    </div>
                  )}
              </div>
            ))}

            {/* DVT */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-blue-600 px-1">
                DVT Prophylaxis
              </label>
              <MySelect
                data={dvtOptions}
                placeholder="DVT Prophylaxis"
                value={formik.values['dvt_prophylaxis']}
                onChange={(option) =>
                  formik.setFieldValue('dvt_prophylaxis', option.value)
                }
              />
              {formik.errors['dvt_prophylaxis'] &&
                (formik.submitCount > 0 ||
                  formik.values['dvt_prophylaxis'] !== '') && (
                  <div className="text-red-400 text-[14px] mt-1">
                    {formik.errors['dvt_prophylaxis']}
                  </div>
                )}
            </div>

            {/* ABX */}
            <div className="flex flex-col gap-1">
              <label className="text-[14px] text-blue-600 px-1">
                Abx Prophylaxis
              </label>
              <MySelect
                data={abxOptions}
                placeholder="abx_prophylaxis"
                value={formik.values['abx_prophylaxis']}
                onChange={(option) =>
                  formik.setFieldValue('abx_prophylaxis', option.value)
                }
              />
              {formik.errors['abx_prophylaxis'] &&
                (formik.submitCount > 0 ||
                  formik.values['abx_prophylaxis'] !== '') && (
                  <div className="text-red-400 text-[14px] mt-1">
                    {formik.errors['abx_prophylaxis']}
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Closure & Post Op */}
        <div>
          <Title
            title="Closure & Post Op"
            icon={<SquareRadical className="w-6 h-6 text-blue-500" />}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {closureAndPostOperation.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label className="text-[14px] text-blue-600 px-1">
                  {item.label}
                </label>
                <textarea
                  name={item.name}
                  value={
                    formik.values[item.name as keyof OperationReportFormValues]
                  }
                  onChange={formik.handleChange}
                  placeholder={`Enter ${item.label}`}
                  className="border text-[14px] rounded-lg p-2 outline-none bg-therd dark:bg-slate-800 text-black dark:text-white focus:border-secondary/50 h-[160px] resize-none"
                />
                {formik.errors[item.name as keyof OperationReportFormValues] &&
                  (formik.submitCount > 0 ||
                    formik.values[
                      item.name as keyof OperationReportFormValues
                    ] !== '') && (
                    <div className="text-red-400 text-[14px] mt-1">
                      {
                        formik.errors[
                          item.name as keyof OperationReportFormValues
                        ]
                      }
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {/* Signature */}
        <div>
          <Title
            title="Surgeon Signature"
            icon={<Signature className="w-6 h-6 text-blue-500" />}
          />
          <div className="flex flex-col gap-2 px-2">
            <label className="text-[14px] text-blue-600 px-1">Signature</label>
            <input
              type="text"
              name="signature"
              value={formik.values['signature']}
              onChange={formik.handleChange}
              placeholder="Enter Signature"
              className="border text-[14px] w-fit  rounded-lg p-2 outline-none bg-therd dark:bg-slate-800 text-black dark:text-white focus:border-secondary/50"
            />
            {formik.errors['signature'] &&
              (formik.submitCount > 0 || formik.values['signature'] !== '') && (
                <div className="text-red-400 text-[14px] mt-1">
                  {formik.errors['signature']}
                </div>
              )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-8 py-2 rounded-lg mt-4"
        >
          {isPending ? <LoadingSave /> : 'Create Report'}
        </button>
      </form>
    </section>
  );
};
