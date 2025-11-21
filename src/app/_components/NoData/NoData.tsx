import React from 'react';

export const NoData = React.memo(
  ({ title, icon }: { title: string; icon: any }) => {
    return (
      <div className="w-full h-full flex justify-center my-auto">
        <div className="flex flex-col gap-3 items-center justify-center">
          <span className="icon">{icon}</span>
          <h3 className="text-xl text-secondary">{title}</h3>
        </div>
      </div>
    );
  }
);
