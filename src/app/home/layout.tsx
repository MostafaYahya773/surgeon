import React from 'react';
import Aside from '../_components/Aside/aside';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[auto_1fr] ">
      <aside>
        <Aside />
      </aside>
      <div>{children}</div>
    </div>
  );
}
