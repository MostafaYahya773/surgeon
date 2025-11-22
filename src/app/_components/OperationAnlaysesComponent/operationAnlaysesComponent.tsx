import React from 'react';
import { OperationAnalysesProps } from '../../../interfaces/index';
import { MySelect } from '../Select/Select';
import Title from '../Title/title';

const OperationAnalysesComponent = React.memo(
  ({
    name,
    initKey,
    data,
    years = [],
    description,
  }: OperationAnalysesProps) => {
    return (
      <div
        className={`${
          initKey === 'taskUi' ? 'h-full overflow-auto' : 'h-full'
        } rounded-md p-2 flex flex-col gap-y-2 relative `}
      >
        <div
          className={`${
            initKey === 'gender' && 'hidden'
          } flex justify-between items-center w-full border-b border-primary sticky z-30 bg-white dark:bg-slate-800`}
        >
          <Title title={name} description={description} />
          {name === 'Operation per Month' && (
            <MySelect data={years} placeholder="Years" />
          )}
        </div>
        <div className="chart h-full">{data}</div>
      </div>
    );
  }
);

export default OperationAnalysesComponent;
