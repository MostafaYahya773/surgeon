import React from 'react';
import { TitleProps } from '../../../interfaces/index';

const Title = React.memo(({ title, description }: TitleProps) => {
  return (
    <div className="flex flex-col p-2 ">
      <h2 className="font-medium dark:text-white">{title}</h2>
      <p className="text-[13px] text-secondary ">{description}</p>
    </div>
  );
});

export default Title;
