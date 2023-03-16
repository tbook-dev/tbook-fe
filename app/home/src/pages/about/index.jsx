import Banner from "@/partials/about/banner";
import Mission from "@/partials/about/mission";
import Strength from "@/partials/about/strength";
import Support from "@/partials/about/support";

export default function About() {
  return (
    <div className="w-full text-[#202124] mb-4 lg:px-0">
      <Banner />
      <Mission />
      <Strength />
      <Support />
    </div>
  );
}
