import { useState, useRef, useCallback, useEffect } from "react";

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
    easing = (t: number) => t // Linear by default
  } = options || {};

  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(minScale);
  const containerRef = useRef<HTMLDivElement>(null!);

  const calculateProgress = useCallback(() => {
    if (container === 'window') {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      return window.scrollY / totalHeight;
    } else if (containerRef.current) {
      const element = containerRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      return scrollTop / scrollHeight;
    }
    return 0;
  }, [container]);

  useEffect(() => {
    const handleScroll = () => {
      const rawProgress = calculateProgress();
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
      handleScroll();
    }

    return () => {
      if (target) {
        target.removeEventListener('scroll', handleScroll);
      }
    };
  }, [container, minScale, maxScale, easing, calculateProgress]);

  return { 
    progress, 
    containerRef,
    scale, 
    ref: container === 'element' ? containerRef : null 
  };
};