
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import useEmblaCarousel from "embla-carousel-react";

export type Testimonial = {
  id: number;
  text: string;
  name: string;
  title: string;
  image: string;
};

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export const TestimonialSlider = ({ testimonials }: TestimonialSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  
  const [textCarouselRef, textCarouselApi] = useEmblaCarousel({
    loop: true,
  });
  
  const [imageCarouselRef, imageCarouselApi] = useEmblaCarousel({
    loop: true,
  });
  
  React.useEffect(() => {
    if (!textCarouselApi || !imageCarouselApi) return;
    
    const onSelect = () => {
      setActiveIndex(textCarouselApi.selectedScrollSnap());
      imageCarouselApi.scrollTo(textCarouselApi.selectedScrollSnap());
    };
    
    textCarouselApi.on("select", onSelect);
    
    return () => {
      textCarouselApi.off("select", onSelect);
    };
  }, [textCarouselApi, imageCarouselApi]);
  
  const handleNext = () => {
    if (textCarouselApi) {
      textCarouselApi.scrollNext();
    }
  };
  
  const handlePrev = () => {
    if (textCarouselApi) {
      textCarouselApi.scrollPrev();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="testimonial-content">
        <h2 className="text-[2.5rem] sm:text-[3.25rem] font-bold text-[#1A2942] leading-tight">
          WHAT <span className="block">OUR</span>
        </h2>
        <h2 className="text-[2.5rem] sm:text-[3.25rem] font-bold text-[#1A2942] leading-tight tracking-wider" 
          style={{ WebkitTextStroke: '1px #1A2942', WebkitTextFillColor: 'transparent' }}>
          CUSTOMERS SAY
        </h2>
        
        <div className="mt-8 max-w-xl">
          <div className="overflow-hidden" ref={textCarouselRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-0 flex-grow-0 flex-shrink-0 basis-full"
                >
                  <div className="testimonial-quote pr-4">
                    <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
                      {testimonial.text}
                    </p>
                    <div className="testimonial-author">
                      <h4 className="font-bold text-[#1A2942]">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.title}</p>
                    </div>
                    
                    <div className="flex items-center mt-6">
                      <span className={cn("text-sm text-[#1A2942] font-medium", { "hidden": isMobile })}>
                        {String(testimonial.id).padStart(2, '0')}
                      </span>
                      <div className="flex-1 mx-2">
                        <div className="h-[1px] bg-gray-300 w-16"></div>
                      </div>
                      <div className="flex space-x-1 text-sm">
                        {testimonials.map((t) => (
                          <span 
                            key={t.id} 
                            className={t.id === testimonial.id ? "text-[#1A2942] font-bold" : "text-gray-300"}
                          >
                            {String(t.id).padStart(2, '0')}
                            {t.id !== testimonials.length && <span className="text-gray-300 mx-1"></span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="testimonial-images">
        <div className="overflow-hidden" ref={imageCarouselRef}>
          <div className="flex">
            {testimonials.map((testimonial, i) => (
              <div 
                key={testimonial.id} 
                className="min-w-0 flex-grow-0 flex-shrink-0 basis-full"
              >
                <div className="grid grid-cols-3 gap-4">
                  <Card className={cn("overflow-hidden rounded-xl", 
                    i === 0 ? "col-span-1" : "opacity-40")}>
                    <AspectRatio ratio={3/4}>
                      <img 
                        src={testimonials[0].image} 
                        alt={testimonials[0].name}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </Card>
                  <Card className={cn("overflow-hidden rounded-xl", 
                    i === 1 ? "col-span-1" : "opacity-40")}>
                    <AspectRatio ratio={3/4}>
                      <img 
                        src={testimonials.length > 1 ? testimonials[1].image : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"}
                        alt={testimonials.length > 1 ? testimonials[1].name : "Testimonial"}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </Card>
                  <Card className={cn("overflow-hidden rounded-xl", 
                    i === 2 ? "col-span-1" : "opacity-40")}>
                    <AspectRatio ratio={3/4}>
                      <img 
                        src={testimonials.length > 2 ? testimonials[2].image : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop"}
                        alt={testimonials.length > 2 ? testimonials[2].name : "Testimonial"}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2 mt-6">
          <button 
            onClick={handlePrev}
            className="h-10 w-10 rounded-full flex items-center justify-center text-[#1A2942] hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button 
            onClick={handleNext}
            className="h-10 w-10 rounded-full flex items-center justify-center text-[#1A2942] hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
