import React from 'react';
import { Phone, MapPin, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { FaTelegram } from 'react-icons/fa';
import { BsTelegram } from 'react-icons/bs';
import { PiTelegramLogo, PiTelegramLogoBold } from 'react-icons/pi';

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

export default function Footer() {
  return (
    <footer className="w-full min-h-max bg-(--theme) text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">سیم پیچی ماهر</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              ارائه خدمات تخصصی سیم‌پیچی و تعمیر انواع موتورهای الکتریکی با بیش از 20 سال تجربه و تضمین کیفیت
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-10 h-10 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors duration-300">
                <PiTelegramLogoBold size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">خدمات ما</h4>
            <ul className="space-y-2">
              {cardData.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">لینک‌های سریع</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block">
                  نمونه کارها
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block">
                  تماس با ما
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block">
                  سوالات متداول
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block">
                  شرایط و قوانین
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block">
                  حریم خصوصی
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">تماس با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-white mt-1 shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">021-12345678</p>
                  <p className="text-gray-300 text-sm">0912-3456789</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-white mt-1 shrink-0" />
                <a href="mailto:info@motorrepair.com" className="text-gray-300 hover:text-white text-sm transition-colors">
                  info@motorrepair.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-white mt-1 shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  تهران، خیابان آزادی، نرسیده به میدان آزادی، پلاک 123
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-white mt-1 shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">شنبه تا پنج‌شنبه</p>
                  <p className="text-gray-300 text-sm">8 صبح تا 8 شب</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white text-sm text-center md:text-right">
              © {new Date().getFullYear()} سیم پیچی ماهر. تمامی حقوق محفوظ است
            </p>
            <p className="text-white text-sm text-center md:text-left">
              طراحی و توسعه با عرفان پورسلیمانی
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}