import React from 'react';

export interface GlobalState {
  listValue: string;
  searchInput: string;
  id: string;
  dataInCustom: string;
  isSubmitting: boolean;
  date: Date | undefined;
  dataNow: string;
  reminderNow: string;
  setReminderNow: (value: string) => void;
  setDataNow: (value: string) => void;
  setDate: (value: Date | undefined) => void;
  setIsSubmitting?: (value: boolean) => void;
  handleEdit: (
    id: string,
    data: any,
    setIsView: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  handleDelete: (id: string) => void;
  setDataInCustom: (value: string) => void;
  setId: (value: string) => void;
  setSearchInput: (value: string) => void;
  setListValue(value: string): void;
  endpoint: string;
  setEndpoint: (value: string) => void;
}

export interface Links {
  name: string;
  path: string;
  icon: any;
}

export interface PatientsAnlayses {
  name: string;
  NumOFpatients: number;
  icon: any;
  color: string;
}

export interface TitleProps {
  title: string | undefined;
  description?: string | undefined;
  icon?: any;
}
export interface ComposedChartData {
  name: string;
  operations?: number;
  age?: number;
}

export interface AreaChartData {
  name: string;
  operations: number;
}

export interface ComposedChartsProps {
  data: ComposedChartData[];
  height?: number;
  colSize?: number;
  chartKey: string;
  color?: string[];
}

export interface PieChartData {
  name: string;
  value: number;
}

export interface PieChartProps {
  data: PieChartData[];
  colors?: string[];
  width?: number;
  height?: number;
  showTooltip?: boolean;
  showLabel?: boolean;
}

export interface LineChartData {
  name: string;
  operations: number;
}

export interface LineChartsProps {
  data: LineChartData[];
  width?: number;
  height?: number;
  showTooltip?: boolean;
}

export interface OperationAnalysesProps {
  name?: string;
  data?: React.ReactNode;
  description?: string | undefined;
  initKey?: string;
  years?: { label: string; value: string }[];
}

export interface Patient {
  name: string;
  age: number;
  gender: string;
  UnNumber: number;
  operation: string;
  dateIn: string;
  Status: string;
}

export interface FetchData {
  title: string;
  description: string;
  created_at?: string;
  id: string;
  updated_at?: string;
  user_id?: string;
}

export interface SelectProps {
  label: string;
  value: string;
}

export interface ReminderList {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: string;
}

export interface RemniderSettingProps {
  label: string;
  color: string;
  icon: any;
  border: boolean;
  onClick: () => void;
}

export interface patentAddInfo {
  type?: string;
  label?: string;
  name?: string;
  placeHolder?: string;
  gender?: { label: string; value: string }[];
  Anaesthesia?: { label: string; value: string }[];
  OperationStatus?: { label: string; value: string }[];
  OperativeDiagnosis?: { label: string; value: string }[];
  AbxProphylaxis?: { label: string; value: string }[];
  DVTProphylaxis?: { label: string; value: string }[];
}

export interface ReportData {
  auth_id?: string;
  title?: string;
  description?: string;
  report_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OperationRecord {
  id: string;
  patient_name: string;
  patient_age: string;
  patient_berth_date: string;
  gender: string | '';
  un_number: string;

  operation_date: string;
  operation_name: string;
  consultant_name: string;
  surgeon_name: string;
  anaesthetist_name: string;
  assistant_name: string;
  assistant_sn: string;
  anaesthesia: string;
  operation_status: string | '';

  patient_position: string;
  indication: string;
  pneumoperitoneum_and_insufflation: string;
  incisions: string;
  operative_findings: string;

  tissue_removed: string;
  antibiotic_type: string;
  estimated_blood_loss: string;
  procedure: string;
  operative_complications: string;
  extra_procedure: string;
  abx_prophylaxis: string;
  dvt_prophylaxis: string;

  closure: string;
  post_op: string;

  signature: string;
  user_id: string;
  created_at: string;
}

export interface Form {
  id?: string;
  title?: string;
  description?: string;
  priority?: string;
  start_date?: string;
  end_date?: string;
  remind_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ShowReport {
  id: string;
  title: string;
  description: string;
  report_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface auth {
  name?: string;
  placeHolder?: string;
  type?: string;
  age?: string;
  dateOfBirth?: string;
  icon?: any;
}

export interface Auth {
  type?: string;
  label?: string;
  name?: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  specialization?: string;
}

export interface OperationReportFormValues {
  patient_name: string;
  patient_age: string;
  patient_berth_date: string;
  gender: string;
  un_number: string;

  // Operation Info
  operation_date: string;
  operation_name: string;
  consultant_name: string;
  surgeon_name: string;
  anaesthetist_name: string;
  assistant_name: string;
  assistant_sn: string;
  anaesthesia: string;
  operation_status: string;

  // Pre & During Operation
  patient_position: string;
  indication: string;
  pneumoperitoneum_and_insufflation: string;
  incisions: string;
  operative_findings: string;

  // Procedure Details
  tissue_removed: string;
  antibiotic_type: string;
  estimated_blood_loss: string;
  procedure: string;
  operative_complications: string;
  extra_procedure: string;
  abx_prophylaxis: string;
  dvt_prophylaxis: string;

  // Closure & Post Op
  closure: string;
  post_op: string;

  // Signature
  signature: string;
}

export interface ConfirmmEmail {
  email: string;
}
export interface ConfirmmPassword {
  password: string;
  confirmPassword?: string;
  access_token?: string;
}
