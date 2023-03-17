import "swiper/css";
import "swiper/css/navigation";

import Banner from "@/partials/home/banner";
import Features from "@/partials/home/features";
import Partners from "@/partials/home/partners";
import Product from "@/partials/home/product";
import Testimonial from "@/partials/home/testimonial";
import Subscribe from "@/partials/subscribe";

export default function Home() {
  return (
    <div className="w-full text-[#202124] mb-4 px-4 lg:px-0">
      <Banner />
      <Features />
      <Partners />
      <Product />
      <Testimonial />
      <Subscribe />
    </div>
  );
}
