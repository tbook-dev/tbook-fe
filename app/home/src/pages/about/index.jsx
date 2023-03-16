import Banner from "@/partials/about/banner";
import Mission from "@/partials/about/mission";
import Strength from "@/partials/about/strength";
import Support from "@/partials/about/support";
import Goal from "@/partials/about/goal";
import Subscribe from "@/partials/subscribe";

export default function About() {
  return (
    <div className="w-full text-[#202124] mb-4 lg:px-0">
      <Banner />
      <Mission />
      <Strength />
      <Support />
      <Goal />
      <div className="px-4 bx mb-10 lg:mb-[144px] lg:px-0">
        <Subscribe />
      </div>
    </div>
  );
}
