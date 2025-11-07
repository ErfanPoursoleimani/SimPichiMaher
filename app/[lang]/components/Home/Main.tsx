'use client'
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useState } from "react";
import AnimatedBox from "../../../../components/ui/AnimatedBox"
import { useSettingsStore } from "@/stores/settingsStore";

const Main = () => {
  const [screenWidth, setScreenWidth] = useState<number>(
      typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const {isRTL} = useSettingsStore()
  return (
    <>
      <div className='fixed top-0 left-0 min-w-full bg-[url(/images/mechanic.jpg)] bg-cover -z-10 min-h-screen'>
        <div className="absolute inset-0 -z-9 w-full h-full flex justify-center bg-linear-to-b from-white/50 via-white via-80% to-white backdrop-blur-[px] overflow-y-auto">
          <div className="absolute top-[40vh] max-[370px]: -translate-y-full text-center w-full text-[5rem] max-md:text-[2rem] space-y-5 font-bold px-7">
            <h1 className="flex max-[370px]:flex-col justify-center gap-4">
              <span className="flex justify-center gap-4 text-(--theme)">
                <AnimatedBox animation="slideLeft" config={{delay: 0.1}} className="">تعمیرات</AnimatedBox>
                <AnimatedBox animation="slideLeft" config={{delay: 0.3}} className="">و</AnimatedBox>
                <AnimatedBox animation="slideLeft" config={{delay: 0.5}} className="">پیچی</AnimatedBox>
                <AnimatedBox animation="slideLeft" config={{delay: 0.8}} className="">سیم</AnimatedBox>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
