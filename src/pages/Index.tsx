
import { TestimonialSlider } from "@/components/TestimonialSlider";

const TESTIMONIALS = [
  {
    id: 1,
    text: "I was definitely thrilled to visit your store and would love to take time and visit it again. I was fascinated with the large collection of women's clothing that you have in store, and the various kinds of dresses are really lucrative and affordable on my pockets.",
    name: "Olive Yew",
    title: "Fashion Model",
    image: "/lovable-uploads/5d666cfc-89b7-4fb9-bdbe-d9e4fa483022.png"
  },
  {
    id: 2,
    text: "The selection of clothing is outstanding. The staff was incredibly helpful and made my shopping experience so pleasant. I'll definitely be returning and recommending your store to all my friends.",
    name: "Maya Johnson",
    title: "Interior Designer",
    image: "/lovable-uploads/39441fa8-0ac3-4417-935b-864df7f9c617.png"
  },
  {
    id: 3,
    text: "What impressed me most was the quality of the materials and craftsmanship. Each piece feels luxurious yet the prices are surprisingly reasonable. The store atmosphere is also very inviting.",
    name: "Leila Chen",
    title: "Marketing Executive",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1587&auto=format&fit=crop"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <TestimonialSlider testimonials={TESTIMONIALS} />
      </div>
    </div>
  );
};

export default Index;
