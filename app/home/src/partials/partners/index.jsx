import { useMemo } from "react";
import { list1, list2 } from "./conf";
import { useResponsive } from "ahooks";

export default function Partners() {
  const { pc } = useResponsive();
  const w1 = useMemo(() => {
    return {
      pc: (246 + 80) * list1.length,
      m: (123 + 40) * list1.length,
    };
  }, []);
  const w2 = useMemo(() => {
    return {
      pc: (246 + 80) * list2.length,
      m: (123 + 40) * list2.length,
    };
  }, []);
  console.log({ list1, list2 });

  return (
    <div className="mb-10 lg:mb-[144px]">
      <div className="mb-8 text-center lg:mb-[50px]">
        <h2 className="text-c12 mb-0.5 lg:mb-3">
          <span className="font-medium text-colorful1">Partners</span>
        </h2>
        <h1 className="font-bold text-white text-c11 lg:text-cwh5">Be with builders </h1>
      </div>

      <div className="overflow-hidden bx">
        <div className="flex" style={{ width: 2 * (pc ? w1.pc : w1.m) }}>
          <div
            className="flex mb-8 flex-nowrap lg:mb-16 loop-left hover:animation-paused"
            style={{ width: pc ? w1.pc : w1.m }}
          >
            {list1.map((v) => (
              <img
                key={v.src}
                src={v.src}
                className="flex-none w-[123px] h-[48px] lg:w-[246px] lg:h-[96px] mr-10 lg:mr-20"
              />
            ))}
            {list1.map((v) => (
              <img
                key={v.src}
                src={v.src}
                className="flex-none w-[123px] h-[48px] lg:w-[246px] lg:h-[96px] mr-10 lg:mr-20"
              />
            ))}
          </div>
        </div>
        <div className="flex" style={{ width: 2 * (pc ? w2.pc : w2.m) }}>
          <div
            className="flex mb-8 flex-nowrap lg:mb-16 loop-right hover:animation-paused"
            style={{ width: pc ? w2.pc : w2.m }}
          >
            {list2.map((v) => (
              <img
                key={v.src}
                src={v.src}
                className="flex-none w-[123px] h-[48px] lg:w-[246px] lg:h-[96px] mr-10 lg:mr-20"
              />
            ))}
            {list2.map((v) => (
              <img
                key={v.src}
                src={v.src}
                className="flex-none w-[123px] h-[48px] lg:w-[246px] lg:h-[96px] mr-10 lg:mr-20"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
