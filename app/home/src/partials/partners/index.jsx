import { list1, list2 } from "./conf";
import { useResponsive } from "ahooks";

export default function Partners() {
  const { pc } = useResponsive();

  return (
    <div className="mb-10 lg:mb-[144px]">
      <div className="mb-8 text-center lg:mb-[50px]">
        <h2 className="text-c12 mb-0.5 lg:mb-3">
          <span className="font-medium text-colorful1">Partners</span>
        </h2>
        <h1 className="font-bold text-white text-c11 lg:text-cwh5">Be with builders </h1>
      </div>

      <div className="overflow-hidden">
        <div className="flex mb-8 lg:mb-16 loop-left hover:animation-paused">
          {list1.map((v) => (
            <img key={v.src} src={v.src} className="w-[123px] h-[48px] lg:w-[246px] lg:h-[96px] mr-10 lg:mr-20" />
          ))}
        </div>
        <div className="flex mb-8 lg:mb-16 loop-right hover:animation-paused">
          {list2.map((v) => (
            <img key={v.src} src={v.src} className="w-[123px] h-[48px] lg:w-[246px] lg:h-[96px]  mr-10 lg:mr-20" />
          ))}
        </div>
      </div>
    </div>
  );
}
