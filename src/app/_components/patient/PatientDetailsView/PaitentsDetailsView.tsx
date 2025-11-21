'use client';
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '@/context/global';
import { useSelectDataById } from '@/hooks/useSelectDataById';
export default function PaitentsDetailsView() {
  const { id, endpoint, setEndpoint } = useContext(GlobalContext);
  const { data, isLoading } = useSelectDataById(id, endpoint);
  useEffect(() => setEndpoint('notes'), []);
  return (
    <section className="flex flex-col gap-2">
      {/* Personal Information */}
      <div className="personalInfo flex flex-col gap-2">
        <h3 className="title font-bold text-[20px] text-black dark:text-white">
          Personal Information
        </h3>
        <div className="details grid grid-cols-3 gap-y-2 px-2 border-b pb-3 border-secondary/50">
          <div className="flex gap-1 items-center">
            <span className="label font-medium text-blue-600">Name :</span>
            <p className="value text-[15px] text-black dark:text-white">
              {data?.patient_name}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <span className="label font-medium text-blue-600">Age :</span>
            <p className="value text-[15px] text-black dark:text-white pt-1">
              {data?.patient_age}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <span className="label font-medium text-blue-600">
              Birth Date :
            </span>
            <p className="value text-[15px] text-black dark:text-white pt-1">
              {data?.patient_berth_date}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <span className="label font-medium text-blue-600">Gender :</span>
            <span className="value text-[15px] text-black dark:text-white pt-1">
              {data?.gender}
            </span>
          </div>
        </div>
      </div>

      {/* Operation Information */}
      <div className="operationInfo flex flex-col gap-2">
        <h3 className="title font-bold text-[20px] text-black dark:text-white">
          Operation Information
        </h3>
        <div className="details grid grid-cols-3 gap-5 px-2 border-b pb-3 border-secondary/50 text-black dark:text-white">
          <div className="operation_Date flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Operation Date
            </span>
            <p className="text-[14px] px-1">{data?.created_at?.slice(0, 10)}</p>
          </div>
          <div className="Operation_time flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Operation Time
            </span>
            <p className="text-[14px] px-1">
              {data?.created_at.slice(11, 16) > '12:00'
                ? `${data?.created_at.slice(11, 16)} PM`
                : `${data?.created_at.slice(11, 16)} AM`}
            </p>
          </div>
          <div className="operation_name flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Operation Name
            </span>
            <p className="text-[14px] px-1">{data?.operation_name}</p>
          </div>
          <div className="operation_status flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Operation Status
            </span>
            <p className="text-[14px] px-1">{data?.operation_status}</p>
          </div>
          <div className="consuitant_name flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Consultant Name
            </span>
            <p className="text-[14px] px-1">{data?.consultant_name}</p>
          </div>
          <div className="surgeon_name flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Surgeon Name
            </span>
            <p className="text-[14px] px-1">{data?.surgeon_name}</p>
          </div>
          <div className="anaesthetist_name flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Anaesthetist Name
            </span>
            <p className="text-[14px] px-1">{data?.anaesthetist_name}</p>
          </div>
          <div className="assestant_name flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Assistant Name
            </span>
            <p className="text-[14px] px-1">{data?.assistant_name}</p>
          </div>
          <div className="assestant_sn flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Assistant SN
            </span>
            <p className="text-[14px] px-1">{data?.assistant_sn}</p>
          </div>
          <div className="anaesthesia flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Anaesthesia
            </span>
            <p className="text-[14px] px-1">{data?.anaesthesia}</p>
          </div>
        </div>
      </div>

      {/* Pre & During Operation */}
      <div className="Pre_During_Operation flex flex-col gap-2">
        <h3 className="title font-bold text-[20px] text-black dark:text-white">
          Pre & During Operation
        </h3>
        <div className="details grid grid-rows-5 px-2 gap-3 border-b pb-3 border-secondary/50 text-black dark:text-white">
          <div className="flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Patient Position
            </span>
            <p className="text-[14px] px-1">{data?.patient_position}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Indication
            </span>
            <p className="text-[14px] px-1">{data?.indication}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Pneumoperitoneum and Insufflation
            </span>
            <p className="text-[14px] px-1">
              {data?.pneumoperitoneum_and_insufflation}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Incisions
            </span>
            <p className="text-[14px] px-1">{data?.incisions}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-blue-600 font-medium text-[15px]">
              Operative Findings
            </span>
            <p className="text-[14px] px-1">{data?.operative_findings}</p>
          </div>
        </div>
      </div>

      {/* Procedure Details */}
      <div className="Procedure_Details flex flex-col gap-2">
        <h3 className="title font-bold text-[20px] text-black dark:text-white">
          Procedure Details
        </h3>
        <div className="details flex flex-col gap-y-5 px-2 border-b pb-3 border-secondary/50 text-black dark:text-white">
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-blue-600 font-medium text-[15px]">
                Tissue Removed
              </span>
              <p className="text-[14px] px-1">{data?.tissue_removed}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blue-600 font-medium text-[15px]">
                Antibiotic Type
              </span>
              <p className="text-[14px] px-1">{data?.antibiotic_type}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blue-600 font-medium text-[15px]">
                Estimated Blood Loss
              </span>
              <p className="text-[14px] px-1">{data?.estimated_blood_loss}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blue-600 font-medium text-[15px]">
                Abx Prophylaxis
              </span>
              <p className="text-[14px] px-1">{data?.abx_prophylaxis}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blue-600 font-medium text-[15px]">
                DVT Prophylaxis
              </span>
              <p className="text-[14px] px-1">{data?.dvt_prophylaxis}</p>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-5">
            <div className="flex flex-col gap-1">
              <span className="text-blue-600 font-medium text-[15px]">
                Operative Complications / Problems
              </span>
              <p className="text-[14px] px-1">
                {data?.operative_complications}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blue-600 font-medium text-[15px]">
                Procedure
              </span>
              <p className="text-[14px] px-1">{data?.procedure}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-blue-600 font-medium text-[15px]">
                Extra Procedure
              </span>
              <p className="text-[14px] px-1">{data?.extra_procedure}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Closure & Post Op */}
      <div className="Closure_PostOp flex flex-col gap-2">
        <h3 className="title font-bold text-[20px] text-black dark:text-white">
          Closure & Post Op
        </h3>
        <div className="details grid grid-rows-2 gap-5 border-b border-secondary/50 pb-3 px-2 text-black dark:text-white">
          <div className="flex flex-col gap-2">
            <span className="text-blue-600 font-medium text-[15px]">
              Closure
            </span>
            <p className="text-[14px] px-1">{data?.closure}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-blue-600 font-medium text-[15px]">
              Post Operation
            </span>
            <p className="text-[14px] px-1">{data?.post_op}</p>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="signture flex flex-col gap-1 w-full items-end px-5 text-black dark:text-white">
        <span className="text-blue-600 font-medium text-[15px]">Signature</span>
        <p className="text-[14px]">{data?.signature}</p>
      </div>
    </section>
  );
}
