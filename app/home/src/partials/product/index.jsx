import { useState } from "react";
import list from "./conf";
import { useResponsive } from "ahooks";
import clsx from "clsx";

export default function Partners() {
  const { pc } = useResponsive();
  const [swiperIdx, setSwiperIdx] = useState(0);

  return pc ? (
    <div className="mb-10 lg:mb-[144px] h-[590px]">
      <div className="flex items-center bx">
        <div className="w-[755px] flex-none h-[590px] relative overflow-hidden">
          {list.map((v, idx) => (
            <img
              className={clsx(
                "absolute inset-0 object-cover transition-all duration-500 transform hover:-translate-y-1",
                swiperIdx !== idx && "-translate-y-full"
              )}
              src={v.src}
              key={v.src}
            />
          ))}
        </div>

        <div className="w-[calc(100% - 755px)] pl-4">
          {list.map((product, idx) => {
            const isCurrent = swiperIdx === idx;
            return (
              <div
                className="mb-4 cursor-pointer"
                key={idx}
                onClick={() => {
                  setSwiperIdx(idx);
                }}
              >
                <h2 className={clsx("font-extrabold text-cwh1 mb-2", isCurrent ? "text-colorful1" : "text-white")}>
                  {product.title}
                </h2>
                <p className="text-c6 text-c-9">{product.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <>
      {list.map((product, idx) => (
        <div key={product.title} className="mb-8 text-center">
          <h2 className="mb-2 font-extrabold text-white text-cwh1"> {product.title}</h2>
          <p className="mb-4 text-sm text-c-9">{product.desc}</p>
          <div className={idx % 2 === 0 ? "-ml-4" : "-mr-4"}>
            <img src={product.src1} />
          </div>
        </div>
      ))}
    </>
  );
}
