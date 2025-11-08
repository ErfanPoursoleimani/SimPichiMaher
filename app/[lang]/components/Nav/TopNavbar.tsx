"use client"
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useSettingsStore } from '@/stores/settingsStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaBookmark, FaUser } from 'react-icons/fa';
import { FaTreeCity } from 'react-icons/fa6';
import { MdTravelExplore } from 'react-icons/md';
import { TiHome } from 'react-icons/ti';
import LanguageDropdown from './components/LanguageDropdown';

const TopNavbar: React.FC = () => {
  
  const {isRTL, dict, lang} = useSettingsStore()
  const current = usePathname()

  const navLinks = [
    {id: 1, label: "خانه", selectedIcon: <TiHome className='text-[1rem]' />, href: `/${lang}/`},
    {id: 2, label: "نمونه کار", selectedIcon: <FaTreeCity className='text-[1rem]' />, href: `/${lang}/samples`},
    {id: 3, label: "خدمات", selectedIcon: <FaBookmark className='text-[1rem]' />, href: `/${lang}/services`},
    {id: 4, label: "درباره ما", selectedIcon: <MdTravelExplore className='text-[1rem]' />, href: `/${lang}/about` },
    {id: 5, label: "ارتباط با ما", selectedIcon: <FaUser className='text-[1rem]' />, href: `/${lang}/contact` },
  ]

  const { scale, progress } = useScrollProgress({
      container: "window",
      minScale: 0 ,
      maxScale: 6,
  });

  return (
    <>
      {/* Desktop view */}
      <div className="fixed top-0 z-2 backdrop-blur-3xl min-h-17 flex justify-center items-stretch px-3 w-full bg-white">
        <div className={`flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""} w-full max-w-[1300px]`}>
          <h1 className='flex items-center text-3xl text-(--theme) font-extrabold max-md:text-xl'>سیم پیچی ماهر</h1>
          <ul className='flex items-center gap-4 max-md:hidden'>
            {navLinks.map((navLink) => (
              <Link href={navLink.href} className='flex items-center' key={navLink.id}>
                <p className={`${current === navLink.href ? "text-(--theme)" : "text-neutral-600"} text-[0.9rem] font-medium`}>{navLink.label}</p>
              </Link>
            ))}
          </ul>
          <div className="w-full absolute bottom-0 left-0 flex items-center justify-center">
              <span 
              className={`h-0.5 bg-(--theme)`}
              style={{ width: `${progress*40}%` }}
              ></span>
          </div>
          <div className={`flex gap-5 ${isRTL ? "flex-row-reverse" : ""}`}>
            <div className='flex items-center'>
              <LanguageDropdown />
            </div>
            <div className='flex items-center gap-4'>
              <button className="text-[0.8rem] px-3 py-1.5 bg-(--theme) text-white rounded-[7px]">تماس بگیرید</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;