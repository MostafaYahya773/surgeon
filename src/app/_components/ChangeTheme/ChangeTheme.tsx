"use client";

import { useTheme } from "next-themes";
import React, { useState } from "react";

const ChangeTheme: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isDark ,setIsDark] = useState<boolean>(false)

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setIsDark(!isDark);
    console.log(isDark);
    
  };

  return (
    <div className="dark:bg-slate-800 rounded-md bg-white py-3 px-2 text-[14px] flex justify-between item-center">
        <h3 className="dark:text-white">Dark Mode</h3>
        <label htmlFor="toggle" className={`dark:bg-slate-600 bg-slate-300 w-10 h-4 rounded-full relative cursor-pointer  ${isDark ? 'before:bg-blue-400': 'before:bg-slate-600'}  before:absolute  before:w-4 before:h-4 before:rounded-full ${isDark ? "before:right-0 " : "before:left-0"} `}></label>
        <input 
          id="toggle"
          type="checkbox"
          className="hidden"
          onClick={handleToggle}
        />
    </div>
  );
};

export default ChangeTheme;
