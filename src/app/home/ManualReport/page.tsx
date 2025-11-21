'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { CustomDetails } from '../../_components/CustomDetails/CustomDetails';
import ManualRebortTable from '../../_components/ManualReports/ManualreportTable/ManualReportTabel';
import { GlobalContext } from '@/context/global';
import { useFetchData } from '../../../hooks/useFetchData';

export default function ManualReport() {
  const { setDataInCustom, endpoint, setEndpoint } = useContext(GlobalContext);
  const { data: patientManualReports } = useFetchData(endpoint);
  const [isView, setIsView] = useState<boolean>(false);
  const [searchInputReport, setSearchInputReport] = useState<string>('');
  // handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputReport(e.target.value);
  };
  // filter data by name
  const FilterByName = patientManualReports?.filter((item) =>
    item?.title?.toLowerCase().includes(searchInputReport.toLowerCase())
  );
  // to send the end point to the context after the component is mounted
  useEffect(() => setEndpoint('manual_reports'), []);

  return (
    <section className="flex flex-col gap-5 p-2">
      <div className="title__addButton flex justify-between items-center">
        <h2 className="text-[20px] font-medium flex gap-2 items-center text-black dark:text-white">
          Manual Reports
        </h2>
        <button
          onClick={() => {
            setIsView(true), setDataInCustom('add ManualReport');
          }}
          className="px-3 py-1 text-[15px] flex items-center gap-1 rounded-md bg-gradient-to-tr from-[#1e40af] to-[#0284c7] text-white hover:scale-105 transition-all duration-300 border-none outline-none"
        >
          Add Report
          <Plus className="w-4 h-4 font-bold" />
        </button>
      </div>

      <div className="search__Input w-full relative">
        <Search className="w-4 h-4 text-secondary absolute top-3 left-2" />
        <input
          className="w-full p-2 outline-none px-7 bg-therd dark:bg-slate-800 border border-secondary/20 text-[15px] rounded-lg text-secondary"
          type="text"
          value={searchInputReport}
          onChange={handleSearch}
          placeholder="Search reports by Name"
        />
      </div>

      <div className={`${isView ? 'block' : 'hidden'}`}>
        <CustomDetails setIsView={setIsView} />
      </div>

      <ManualRebortTable
        setIsView={setIsView}
        paitentReports={FilterByName || []}
      />
    </section>
  );
}
