import { useCarousel2 } from "@/hooks/useCarousel2";
import { ChevronLeft, ChevronRight} from "lucide-react";
import Image from "next/image";

export default function CarouselDemo({cardData}: {cardData: {id: number, cropedBg: string, fullBg: string, label: string, description: string}[]}) {

  const {
/*     activeIndex,
    isAutoPlaying,
    toggleAutoPlay, */
    getCarouselProps,
    getContainerProps,
    getItemProps,
    getNavigationProps,
    getDotProps,
  } = useCarousel2({
    itemCount: cardData.length,
    initialIndex: 2,
    visibleRange: 2,
    autoPlay: true,
    autoPlayInterval: 3000,
    dragThreshold: 50,
  });

  return (
    <div className="min-w-screen flex items-center justify-center p-2">
      <div className="w-full overflow-hidden">
        <div {...getCarouselProps()} className="relative h-[400px] md:h-[500px] outline-none">
          <div {...getContainerProps()}>
            <div className="absolute inset-0 flex items-center justify-center">
              {cardData.map((item, index) => (
                <div key={item.id} {...getItemProps(index)}>
                  <div className="relative w-[400px] h-[300px] max-md:w-[250px] max-md:h-[250px] rounded-2xl ">
                    <img
                      src={`${item.cropedBg}`}
                      alt={item.label}
                      className="object-cover"
                      draggable={false}
                    />
                    <div className="absolute -bottom-10 max-md:bottom-0 left-0 text-center right-0 bg-linear-to-t from-white/70 to-transparent p-4">
                      <h3 className="text-black text-2xl max-md:text-xl font-semibold">{item.label}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            {...getNavigationProps('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 max-md:hidden"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            {...getNavigationProps('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 max-md:hidden"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8">
          {/* Dots */}
          <div className="flex gap-2">
            {cardData.map((_, index) => (
              <button key={index} {...getDotProps(index)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}