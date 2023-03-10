import Banner from "@/partials/banner";
import Features from "@/partials/features";
import Partners from "@/partials/partners";
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  return (
    <div className="w-full text-[#202124] mb-4 px-4 lg:px-0">
      <Banner />
      <Features />
      <Partners />
    </div>
  );
}
