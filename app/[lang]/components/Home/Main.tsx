'use client'
import AnimatedBox from "../../../../components/ui/AnimatedBox"

const Main = () => {
  return (
    <>
      <div className='relative w-full min-h-screen bg-[url(/images/tools-illustration.jpg)] bg-cover'>
        <div className="absolute inset-0 w-full h-full flex justify-center bg-linear-to-b from-white/90 via-white via-80% to-white backdrop-blur-[px] overflow-y-auto">
          <div className="absolute top-[40vh] -translate-y-full text-center w-full text-[4rem] max-md:text-[2.3rem] max-sm:text-[2rem] space-y-5 font-bold px-7">
            <h1 className="flex max-[370px]:flex-col justify-center gap-4">
              <span className="flex justify-center gap-4 text-(--theme)">
                <AnimatedBox animation="slideLeft" config={{delay: 0.1}} className="">تعمیرات</AnimatedBox>
                <AnimatedBox animation="slideLeft" config={{delay: 0.3}} className="">و</AnimatedBox>
                <AnimatedBox animation="slideLeft" config={{delay: 0.5}} className="">پیچی</AnimatedBox>
                <AnimatedBox animation="slideLeft" config={{delay: 0.8}} className="">سیم</AnimatedBox>
              </span>
            </h1>
            <h2 className="text-[1rem]">
              با بیش از 10 سال سابقه
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
