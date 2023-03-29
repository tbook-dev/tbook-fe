import { Link } from "react-router-dom";
import { useHover, useResponsive } from "ahooks";
import { useRef } from "react";
import clsx from "clsx";

export default function ({ tpl }) {
  const ref = useRef(null);
  const isHovering = useHover(ref);
  const { pc } = useResponsive();
  console.log(pc && isHovering);
  return (
    <div
      key={tpl.tplName}
      ref={ref}
      className="relative px-3 pt-1 pb-2 rounded-lg lg:px-4 lg:pt-2 lg:pb-6 lg:rounded-2xl lg:shadow-d6 shadow-d3"
    >
      <div className="h-[110px] w-[105px] mx-auto"></div>
      <h3 className="truncate font-bold text-center lg:text-left text-c9 lg:text-cwh2 mb-1.5 lg:mb-2">{tpl.tplName}</h3>
      <div className="mb-2 space-y-1 text-c4 lg:text-c16">
        <div className="flex justify-between">
          <p>Plans</p>
          <p>{tpl.plans.length}</p>
        </div>
        <div className="flex justify-between">
          <p>Holders</p>
          <p>{tpl.holders}</p>
        </div>
      </div>

      {pc ? (
        <Link
          to={`/allocation?id=${tpl.id}`}
          className={clsx(isHovering ? "block absolute left-0 right-0 bottom-0" : "hidden")}
        >
          <button
            type="button"
            className="w-full text-c9 flex items-center justify-center h-10  font-medium leading-normal  rounded-md  dark:disabled:bg-none	dark:bg-cw1 dark:text-black shadow-d3 dark:disabled:bg-[#141414] dark:disabled:text-b-2"
          >
            Use as yours
          </button>
        </Link>
      ) : (
        <Link to={`/allocation?id=${tpl.id}`}>
          <button
            type="button"
            className="w-full text-c9 flex items-center justify-center h-10  font-medium leading-normal  rounded-md  dark:disabled:bg-none	dark:bg-cw1 dark:text-black shadow-d3 dark:disabled:bg-[#141414] dark:disabled:text-b-2"
          >
            Use as yours
          </button>
        </Link>
      )}
    </div>
  );
}
