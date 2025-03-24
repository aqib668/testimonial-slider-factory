
import React, { useState, useEffect } from "react";
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
  
  useEffect(() => {
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
                    
                    <div className="mt-8 flex items-center">
                      <span className="text-sm text-[#1A2942] font-bold">
                        {String(activeIndex + 1).padStart(2, '0')}
                      </span>
                      <div className="w-12 mx-4">
                        <div className="h-[1px] bg-gray-300"></div>
                      </div>
                      <div className="flex space-x-4">
                        {testimonials.map((_, i) => (
                          <span
                            key={i}
                            className={cn(
                              "block h-[1px] w-8 bg-gray-300",
                              { "bg-[#1A2942]": i === activeIndex }
                            )}
                          />
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
      
      <div className="testimonial-images relative">
        <div className="overflow-hidden" ref={imageCarouselRef}>
          <div className="flex">
            {testimonials.map((_, i) => (
              <div 
                key={i} 
                className="min-w-0 flex-grow-0 flex-shrink-0 basis-full"
              >
                <div className="grid grid-cols-3 gap-4">
                  {testimonials.map((testimonial, index) => {
                    const isActive = (index === 0 && i === 0) || 
                                    (index === 1 && i === 1) || 
                                    (index === 2 && i === 2);
                    
                    return (
                      <Card 
                        key={testimonial.id} 
                        className={cn(
                          "overflow-hidden rounded-xl",
                          isActive ? "opacity-100" : "opacity-40"
                        )}
                      >
                        <AspectRatio ratio={3/4}>
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name}
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex absolute bottom-0 right-0 space-x-4 mt-8">
          <button 
            onClick={handlePrev}
            className="h-10 w-10 rounded-none flex items-center justify-center text-[#1A2942] border border-gray-200 hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button 
            onClick={handleNext}
            className="h-10 w-10 rounded-none flex items-center justify-center text-[#1A2942] border border-gray-200 hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};
