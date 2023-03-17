import bgVideo from "./support.mp4";
import wVideo from "./wsupport.mp4";

import { useResponsive } from "ahooks";

const list = [
  {
    title: "AWARDED GRANTS",
    val: "10,000+",
  },
  {
    title: "COVERED FIELDS",
    val: "10+",
  },
  {
    title: "SERVED PROJECTS",
    val: "50+",
  },
  {
    title: "PROVIDED TEMPLATES",
    val: "30+",
  },
];
export default function () {
  const { pc } = useResponsive();

  return (
    <div className="px-4 bx mb-10 lg:mb-[144px] lg:px-0">
      <div className="lg:flex lg:items-center lg:h-[720px] relative overflow-hidden rounded-lg shadow-d6 lg:rounded-none lg:shadow-none pt-5 pb-[45px] lg:py-0">
        <div className="relative z-10 text-center text-white lg:text-left">
          <h3 className="font-medium lg:mb-3 text-colorful1 lg:text-black text-c14 lg:text-c13">SUPPORT FACTS</h3>
          <h2 className="font-bold text-ch1 lg:text-cwh6 lg:w-[344px] mb-3 lg:mb-12">Growing Numbers Of Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-20  gap-y-3 lg:gap-y-6  lg:w-[444px]">
            {list.map((conf) => (
              <div key={conf.title}>
                <p className="mb-1 font-medium lg:font-bold lg:mb-px text-c15 lg:text-cwh1">{conf.val}</p>
                <p className="font-medium lg:text-c6 text-c4 text-c-6">{conf.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute w-full lg:w-[628px] right-0 bottom-0 top-0">
          <video className="h-full rounded-2xl" loop autoPlay preload="auto" playsInline muted>
            <source src={pc ? wVideo : bgVideo} type="video/mp4"></source>
          </video>
          <div className="absolute inset-0 bg-[rgba(0,0,0,.6)] lg:hidden" />
        </div>
      </div>
    </div>
  );
}
