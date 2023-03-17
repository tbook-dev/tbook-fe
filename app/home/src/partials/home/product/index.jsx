import { useState } from "react";
import list from "./conf";
import { useResponsive } from "ahooks";
import clsx from "clsx";
import bg from "@/images/product/bg.png";

export default function Partners() {
  const { pc } = useResponsive();
  const [swiperIdx, setSwiperIdx] = useState(0);
  const [clickedIdx, setClickedIdx] = useState(0);

  return pc ? (
    <div className="mb-10 lg:mb-[144px] h-[590px]">
      <div className="flex items-center bx">
        <div
          className="bg-cover w-[754px] flex-none h-[586px]"
          style={{ backgroundImage: `url(${bg})`, padding: "0px 0px 19px 12px" }}
        >
          <div className="relative w-full h-full">
            <img className={clsx("absolute insert-0 object-cover duration-500 transform")} src={list[clickedIdx]?.src} />
            {list.map((v, idx) => (
              <img
                className={clsx("absolute insert-0  object-cover duration-500 transform", swiperIdx !== idx ? "opacity-0" : "up")}
                src={v.src}
                key={v.src}
              />
            ))}
          </div>
        </div>

        <div className="w-[calc(100% - 755px)] pl-4">
          {list.map((product, idx) => {
            const isCurrent = swiperIdx === idx;
            return (
              <div
                className="mb-4 cursor-pointer"
                key={idx}
                onMouseEnter={() => {
                  setClickedIdx(swiperIdx);
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
