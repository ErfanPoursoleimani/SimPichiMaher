'use client';
import Lenis from 'lenis';
// import 'lenis/dist/lenis.css';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface ClientLayoutWrapperProps {
  children: ReactNode;
  lang: string;
}

export default function ClientLayoutWrapper({ children, lang }: ClientLayoutWrapperProps) {

  useEffect(() => {
    // Initialize Lenis with new autoRaf option
    const lenis = new Lenis({
      autoRaf: true, // 🆕 New feature - handles RAF automatically
      // lerp: 0.1,
      // duration: 1.2,
      // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 2,
      touchMultiplier: 2,
      infinite: false,
    });

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      {children}
    </main>
  );
}