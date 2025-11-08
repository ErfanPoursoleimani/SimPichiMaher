"use client"
import { useSettingsStore } from '@/stores/settingsStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FaBookmark, FaRegUser, FaUser } from 'react-icons/fa';
import { FaTreeCity } from 'react-icons/fa6';
import { MdTravelExplore } from 'react-icons/md';
import { TiHome, TiHomeOutline } from 'react-icons/ti';

const MobileNavbar: React.FC = () => {

  const current = usePathname()
  const { lang, dict } = useSettingsStore()


  const navLinks = [
      {id: 1, label: "خانه", selectedIcon: <TiHome className='text-2xl' />, unselectedIcon: <TiHomeOutline className='text-2xl' />, href: `/${lang}/`},
      {id: 2, label: "نمونه کار", selectedIcon: <FaTreeCity className='text-2xl' />, unselectedIcon: <FaTreeCity className='text-2xl' />, href: `/${lang}/samples`},
      {id: 3, label: "خدمات", selectedIcon: <FaBookmark className='text-xl' />, unselectedIcon: <FaBookmark className='text-xl' />, href: `/${lang}/services`},
      {id: 4, label: "درباره ما", selectedIcon: <MdTravelExplore className='text-2xl' />, unselectedIcon: <MdTravelExplore className='text-2xl' />, href: `/${lang}/about` },
      {id: 5, label: "ارتباط با ما", selectedIcon: <FaUser className='text-xl' />, unselectedIcon: <FaRegUser className='text-xl' />, href: `/${lang}/contact` },
  ]

  return (
    <div className="bg-white md:hidden shadow-lg py-1 flex justify-evenly items-stretch w-screen fixed bottom-0 z-50">
      {navLinks.map((navLink) => (
        <Link key={navLink.id} className={`${current === navLink.href ? "text-(--theme)" : "text-gray-600"} flex flex-col justify-evenly items-center`} href={navLink.href}>
          {current === navLink.href ? navLink.selectedIcon : navLink.unselectedIcon}
          <p className='text-[0.7rem]'>{navLink.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default MobileNavbar;