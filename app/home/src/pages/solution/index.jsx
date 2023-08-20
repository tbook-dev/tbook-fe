import Banner from "@/partials/solution/banner";
import How from "@/partials/solution/how";
import Features from "@/partials/solution/features";
import Brands from "@/partials/solution/brands";
import Subscribe from "@/partials/subscribe";

export default function () {
  return (
    <div className="w-full text-[#202124] mb-4 lg:px-0">
      <Banner />
      <How />
      <Features />
      <Brands />
      <div className="px-4 bx mb-10 lg:mb-[144px] lg:px-0">
        <Subscribe />
      </div>
    </div>
  );
}
