'use client'
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useEffect, useRef, useState } from "react";
import DepthCarousel from "./components/DepthCarousel";
import AnimatedBox from "@/components/ui/AnimatedBox";
import { describe } from "node:test";
import useScrollModifier from "@/hooks/useScrollModifier";
import { useInView } from "@/hooks/useInView";


interface CardData {
  id: number;
  cropedBg: string;
  fullBg: string;
  label: string;
  description: string;
}

const cardData: CardData[] = [
  {
    id: 0,
    cropedBg: "/images/cinematic-motor-removebg-preview.png",
    fullBg: "/images/yellow-bg.jpg",
    label: "سیم پیچی موتور کولر آبی",
    description: "ارائه خدمات تخصصی سیم پیچی و تعمیر موتور کولرهای آبی با استفاده از بهترین مواد اولیه و تضمین کیفیت. بازگشت قدرت و کارایی اولیه موتور شما"
  },
  {
    id: 1,
    cropedBg: "/images/cinematic-motor-removebg-preview.png",
    fullBg: "/images/cinematic-motor.jpg",
    label: "سیم پیچی موتور یخچال",
    description: "تعمیر و سیم پیچی موتورهای یخچال و فریزر با تجهیزات پیشرفته. کاهش مصرف برق و افزایش عمر مفید دستگاه با خدمات حرفه‌ای ما"
  },
  {
    id: 2,
    cropedBg: "/images/motor2-removebg-preview.png",
    fullBg: "/images/motor2.jpg",
    label: "سیم پیچی موتور الکتریکی",
    description: "سیم پیچی انواع موتورهای الکتریکی صنعتی و خانگی با دقت بالا. تضمین عملکرد بهینه و افزایش راندمان موتور با استانداردهای روز دنیا"
  },
  {
    id: 3,
    cropedBg: "/images/cinematic-motor-removebg-preview.png",
    fullBg: "/images/cinematic-motor.jpg",
    label: "سیم پیچی موتور دستگاه چاپ",
    description: "خدمات تخصصی سیم پیچی موتورهای دستگاه‌های چاپ و اداری. حفظ دقت و سرعت دستگاه با تعمیرات اصولی و استفاده از قطعات مرغوب"
  },
  {
    id: 4,
    cropedBg: "/images/motor2-removebg-preview.png",
    fullBg: "/images/motor2.jpg",
    label: "تعمیرات لوازم خانگی",
    description: "ارائه کلیه خدمات تعمیر و نگهداری لوازم خانگی شامل ماشین لباسشویی، جاروبرقی، میکسر و سایر وسایل برقی با گارانتی معتبر"
  },
  {
    id: 5,
    cropedBg: "images/motor-removebg-preview.png",
    fullBg: "images/motor.jpg",
    label: "سیم پیچی موتور برق",
    description: "سیم پیچی و بازسازی موتورهای برق صنعتی و نیمه صنعتی. بهبود عملکرد و جلوگیری از اتلاف انرژی با استفاده از فناوری‌های نوین"
  },
];

const Projects = () => {

    const [screenWidth, setScreenWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );
    
    const { ref: refSection1, inView: section1InView } = useInView({ threshold: 0.3, triggerOnce: false, rootMargin: "0px" });
    useScrollModifier(refSection1, section1InView)

    useEffect(() => {
        console.log(section1InView)
        console.log(refSection1)
    }, [section1InView, refSection1])
    
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    const { scale: mainScale, containerRef: containerRef1, progress } = useScrollProgress({
        container: "window",
        minScale: 0 ,
        maxScale: 6,
    });
    

  return (
    <div className="relative top-[100vh] w-full flex flex-col items-center">
        <div ref={refSection1} className="sticky top-0 min-h-screen bg-white flex flex-col items-center justify-center">
            <h2 className="text-[60px] font-extrabold text-(--theme)">نمونه کار ها</h2>
            <AnimatedBox animation="slideUp" config={{delay: 0.4}}>
                <DepthCarousel cardData={cardData}/>
            </AnimatedBox>
        </div>
        <div className="min-h-max w-full mt-70">
            <div className="sticky top-0 min-h-[300vh] max-md:min-h-[200vh] w-full">
                <div className="sticky top-0 w-full max-h-screen flex flex-col items-center justify-center overflow-hidden">
                    <div
                    className={`absolute inset-0 w-full h-screen object-center bg-(--theme) text-white`}
                    style={{scale: 1 + mainScale * 0.05}}
                    >
                        <div className="bg-white/0 min-w-full min-h-full absolute inset-0"></div>
                        <div className="text-center mb-16 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-5">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                خدمات تخصصی سیم پیچی و تعمیرات
                            </h1>
                            <p className="text-[1rem]">
                                با سال‌ها تجربه در خدمت شما هستیم
                            </p>
                        </div>
                    </div>
                    <div
                        className={`relative w-screen h-screen backdrop-blur-2xl bg-radial bg-(--theme)`}
                        style={{
                            WebkitMaskImage: `radial-gradient(circle at center, transparent ${1150*mainScale - 1270}px, black ${1150*mainScale - 1270}px)`,
                            maskImage: `radial-gradient(circle at center, transparent ${1150*mainScale - 1270}px, black ${1150*mainScale - 1270}px)`,
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat',
                        }}
                    >
                        <h2 className="text-9xl max-md:text-7xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-white">خدمات</h2>
                    </div>
                </div>
            </div>
            <div className="sticky bg-white top-[300vh] min-h-screen w-full flex flex-col items-center justify-center">
                {cardData.map((card, index) => (
                    <div
                    key={card.id}
                    className={`w-full h-screen sticky top-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} flex flex-col md:flex-row`}
                    >
                        {/* Image Side */}
                        <div className="w-full h-auto overflow-hidden">
                            <img
                            src={card.fullBg}
                            alt={card.label}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-white from-55% to-black/50"></div>
                        </div>
                        {/* Content Side */}
                        <AnimatedBox animation="slideLeft" config={{delay: 0.2}} className="flex flex-col max-md:w-full max-w-200 p-10 justify-center absolute top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            <div className={`text-center`}>
                                <h2 className="text-5xl max-md:text-3xl font-bold text-(--theme) mb-6">
                                    {card.label}
                                </h2>
                                <p className="text-xl max-md:text-lg text-gray-600 leading-relaxed mb-8">
                                    {card.description}
                                </p>
                                <button className="bg-(--theme) rounded-2xl hover:bg-cyan-500 text-white font-semibold py-3 px-8 transition-colors duration-300 shadow-md hover:shadow-lg">
                                    درخواست خدمات
                                </button>
                            </div>
                        </AnimatedBox>
                    </div>
                ))}
            </div>
        </div>
        <div className="min-h-max max-md:min-h-[550vh] w-full">
            <div className="sticky top-0 min-h-[300vh] max-md:min-h-[150vh] w-full">
                <div className="sticky top-0 w-full max-h-screen flex flex-col items-center justify-center overflow-hidden">
                    <div
                    className={`absolute inset-0 w-full h-screen object-center bg-cover bg-(--theme) text-white`}
                    style={{scale: 1 + mainScale * 0.05}}
                    >
                        <div className="bg-white/0 min-w-full min-h-full absolute inset-0"></div>
                        <div className="text-center mb-16 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-5">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                مهندس میلاد غضنفری
                            </h1>
                            <p className="text-[1rem]">
                                آدرس: دولت آباد، خیابان سید زاده، مجتمع آباده، پلاک 112
                            </p>
                        </div>
                    </div>
                    <div
                        className={`relative w-screen h-screen backdrop-blur-2xl bg-radial bg-(--theme)`}
                        style={{
                            WebkitMaskImage: `radial-gradient(circle at center, transparent ${1110*mainScale - 5300}px, black ${1110*mainScale - 5300}px)`,
                            maskImage: `radial-gradient(circle at center, transparent ${1110*mainScale - 5300}px, black ${1110*mainScale - 5300}px)`,
                            WebkitMaskRepeat: 'no-repeat',
                            maskRepeat: 'no-repeat',
                        }}
                    >
                        <h2 className="text-9xl max-md:text-7xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-extrabold text-white">درباره ما</h2>
                    </div>
                </div>
            </div>
            <div className="sticky bg-white top-[300vh] min-h-screen w-full flex flex-col items-center justify-center">

            </div>
        </div>
    </div>
  )
}

export default Projects
