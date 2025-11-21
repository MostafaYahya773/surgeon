'use client';
import {
  LayoutDashboard,
  User,
  Pen,
  Calendar,
  LogOut,
  Settings,
} from 'lucide-react';
import { Links } from '../../../interfaces/index';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
export default function Aside() {
  const [isHover, setIsHover] = useState<boolean>(false);
  const links: Links[] = [
    {
      name: 'Dashboard',
      path: '/home',
      icon: LayoutDashboard,
    },
    {
      name: 'Patients',
      path: '/home/Patients',
      icon: User,
    },

    {
      name: 'Manual Report',
      path: '/home/ManualReport',
      icon: Pen,
    },
    {
      name: 'Reminders',
      path: '/home/Reminders',
      icon: Calendar,
    },
    {
      name: 'Setting',
      path: '/home/Setting',
      icon: Settings,
    },
  ];
  const path = usePathname();
  const [isHovered, setIsHovered] = useState<string>('');
  // زر Logout
  const handleLogout = async () => {
    await createClient().auth.signOut();
    window.location.href = '/auth/Login';
  };
  return (
    <section className="fixed min-h-screen bg-blue-600 dark:bg-slate-800 w-fit pt-2 z-50">
      <div className="flex flex-col gap-y-5 h-screen justify-between">
        <div className="flex flex-col gap-y-5">
          <Link
            href="/home"
            className="icon flex items-center gap-x-2 w-fit lg:w-full px-3 "
          >
            <Image
              src="/nav/SurgeonLogo.png"
              alt="icon"
              className="pt-2"
              width={25}
              height={25}
            />
            <h2
              className={`${
                isHover ? 'block' : 'hidden'
              } text-white text-2xl mt-1`}
            >
              Surgeon
            </h2>
          </Link>

          <div className="links px-3 w-full">
            <ul className="link flex flex-col gap-y-5 justify-between h-full">
              {links.map((link, index) => (
                <li key={index} className="text-white relative z-50">
                  <Link
                    onMouseEnter={() => setIsHovered(link.name)}
                    onMouseLeave={() => setIsHovered('')}
                    aria-label="aside link"
                    className={`${
                      path.split('/home')[1] === link.path.split('/home')[1] &&
                      'bg-blue-600  text-white rounded-lg'
                    } text-[15px] flex items-center gap-x-3 px-2 py-2 hover:bg-blue-500/50 hover:rounded-lg `}
                    href={link.path}
                  >
                    <span>
                      <link.icon className="w-4 h-4" />
                    </span>
                    <p
                      className={`${
                        isHovered === link.name
                          ? 'block absolute top-0 left-12'
                          : 'hidden'
                      } bg-blue-100 text-blue-600 dark:text-white dark:bg-slate-700 rounded-lg py-1 w-[100px] text-center text-[14px] shadow-md`}
                    >
                      {link.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onMouseEnter={() => setIsHovered('Logout')}
          onMouseLeave={() => setIsHovered('')}
          onClick={handleLogout}
          className="relative icon  gap-x-2 w-fit  p-2 hover:bg-blue-500/50 hover:rounded-lg mb-5 mx-auto"
        >
          <LogOut className="w-5 h-5 text-blue-500 " />
          <p
            className={`${
              isHovered === 'Logout' ? 'block absolute top-1 left-12' : 'hidden'
            } bg-blue-100 text-blue-600 dark:text-white dark:bg-slate-700 rounded-lg py-1 w-[100px] text-center text-[14px] shadow-md`}
          >
            {isHovered === 'Logout' ? 'Logout' : ''}
          </p>
        </button>
      </div>
    </section>
  );
}
