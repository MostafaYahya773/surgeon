'use client';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  User,
  Mars,
  Venus,
  SquareActivity,
  BookOpenCheck,
  Plus,
} from 'lucide-react';
import PatientsTable from '../../_components/patient/patientsTable/PatentsTable';
import { CustomAnlayses } from '../../_components/customAnlayses/PatientAnlayses';
import { GlobalContext } from '@/context/global';
import { CustomDetails } from '../../_components/CustomDetails/CustomDetails';
import { SearchAndFilter } from '../../_components/SearchAndFilter/SearchAndFilter';
import { useFetchData } from '@/hooks/useFetchData';
import { SelectProps } from '@/interfaces';
const Patients = () => {
  //usecontext
  const { searchInput, listValue, setDataInCustom, endpoint, setEndpoint } =
    useContext(GlobalContext);
  const [isView, setIsView] = useState<boolean>(false);
  //get data from api
  const { data: patientList } = useFetchData(endpoint);

  const SelectValues: SelectProps[] = [
    { value: 'Name', label: 'Name' },
    { value: 'Age', label: 'Age' },
    { value: 'Gender', label: 'Gender' },
    { value: 'UnNumber', label: 'UnNumber' },
    { value: 'Operation', label: 'Operation' },
    { value: 'Status', label: 'Status' },
  ];

  const {
    TotalPatients,
    TotalMale,
    TotalFemale,
    TotalElective,
    TotalEmergency,
  } = useMemo(() => {
    const TotalPatients = patientList?.length;
    const TotalMale = patientList?.filter(
      (patient) => patient.gender === 'Male'
    ).length;
    const TotalFemale = patientList?.filter(
      (patient) => patient.gender === 'Female'
    ).length;
    const TotalElective = patientList?.filter(
      (patient) => patient.operation_status === 'Elective'
    ).length;
    const TotalEmergency = patientList?.filter(
      (patient) => patient.operation_status === 'Emergency'
    ).length;
    return {
      TotalPatients,
      TotalMale,
      TotalFemale,
      TotalElective,
      TotalEmergency,
    };
  }, [patientList]);

  // sorting function
  const sortPatients = (patientList: any, patientValue: string) => {
    switch (patientValue) {
      case 'Name':
        return [...patientList].sort((a, b) =>
          a.patient_name.localeCompare(b.patient_name)
        );
      case 'Age':
        return [...patientList].sort((a, b) => a.patient_age - b.patient_age);
      case 'Gender':
        return [...patientList].sort((a, b) =>
          a.gender.localeCompare(b.gender)
        );
      case 'UnNumber':
        return [...patientList].sort((a, b) => a.un_number - b.un_number);
      case 'Operation':
        return [...patientList].sort((a, b) =>
          a.operation_name.localeCompare(b.operation_name)
        );
      case 'Status':
        return [...patientList].sort((a, b) =>
          a.operation_status.localeCompare(b.operation_status)
        );
      default:
        return patientList;
    }
  };
  // apply sort
  const sortedPatients = sortPatients(patientList, listValue);
  // apply search after sorting
  const patientsSearch = sortedPatients?.filter((item: string | any) =>
    item?.patient_name?.toLowerCase().includes(searchInput.toLowerCase())
  );
  useEffect(() => setEndpoint('notes'), []);
  return (
    <section className="flex flex-col gap-5 w-full p-2">
      <div className="bg-therd dark:bg-slate-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-3 rounded-md">
        <CustomAnlayses
          number={TotalPatients}
          color="#2563eb"
          name="Total"
          icon={User}
        />
        <CustomAnlayses
          number={TotalMale}
          color="#F97316"
          name="Male"
          icon={Mars}
        />
        <CustomAnlayses
          number={TotalFemale}
          color="#EC4899"
          name="Female"
          icon={Venus}
        />
        <CustomAnlayses
          number={TotalElective}
          color="#16A34A"
          name="Elective"
          icon={BookOpenCheck}
        />
        <CustomAnlayses
          number={TotalEmergency}
          color="#DC2626"
          name="Emergency"
          icon={SquareActivity}
        />
      </div>
      <SearchAndFilter data={SelectValues} />

      <div className="results flex flex-col gap-5">
        <div className="flex items-center gap-2 w-full justify-between">
          <h3 className="font-normal text-[18px] px-2 dark:text-white">
            Patient Directory
          </h3>
          <button
            onClick={() => {
              setIsView(true), setDataInCustom('add Patients');
            }}
            className="px-3 py-1 text-[15px] flex items-center gap-1 rounded-md bg-gradient-to-tr from-[#1e40af] to-[#0284c7] text-white hover:scale-105 transition-all duration-300 border-none outline-none"
          >
            Add Report
            <Plus className="w-4 h-4 font-bold" />
          </button>
        </div>
        <div>
          <PatientsTable paitents={patientsSearch} setIsView={setIsView} />
        </div>
      </div>

      <div className={`${isView ? 'block' : 'hidden'}`}>
        <CustomDetails setIsView={setIsView} />
      </div>
    </section>
  );
};

export default Patients;
