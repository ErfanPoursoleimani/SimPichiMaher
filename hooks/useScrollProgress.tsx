import { useState, useRef, useEffect } from "react";

export const useScrollProgress = (options?: {
  container?: 'window' | 'element';
  minScale?: number;
  maxScale?: number;
  easing?: (t: number) => number;
}) => {
  const { 
    container = 'window',
    minScale = 0.8,
    maxScale = 1.2,
    easing = (t: number) => t
  } = options || {};

  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(minScale);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      let rawProgress = 0;
      
      if (container === 'window') {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        rawProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      } else if (containerRef.current) {
        const element = containerRef.current;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        rawProgress = scrollHeight > 0 ? element.scrollTop / scrollHeight : 0;
      }
      
      const clampedProgress = Math.min(1, Math.max(0, rawProgress));
      const easedProgress = easing(clampedProgress);
      
      setProgress(clampedProgress);
      
      const scaleRange = maxScale - minScale;
      const newScale = minScale + (easedProgress * scaleRange);
      setScale(newScale);
    };

    const target = container === 'window' ? window : containerRef.current;
    if (target) {
      target.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial calculation
    }

    return () => {
      if (target) {
        target.removeEventListener('scroll', handleScroll);
      }
    };
  }, [container, minScale, maxScale, easing]);

  return { 
    progress, 
    containerRef,
    scale, 
    ref: container === 'element' ? containerRef : null 
  };
};