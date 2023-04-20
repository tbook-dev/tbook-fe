import { Link, useNavigate } from "react-router-dom";
import { useHover, useResponsive } from "ahooks";
import { useRef } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";

export default function ({ tpl }) {
  const authUser = useSelector((state) => state.user.authUser);

  const ref = useRef(null);
  const isHovering = useHover(ref);
  const { pc } = useResponsive();
  const navigate = useNavigate();
  const link = `/allocation?id=${tpl.id}`;

  return (
    <div
      key={tpl.tplName}
      ref={ref}
      className="relative pt-1 rounded-lg  lg:pt-2 overflow-hidden lg:rounded-2xl lg:shadow-d6 shadow-d3 lg:hover:bg-cw2 dark:bg-bg-b bg-[#ECF5FE]"
      onClick={() => {
        authUser && !pc && navigate(link);
      }}
    >
      <div className="w-full h-[190px] px-3 lg:px-4"></div>
      <div
        className={clsx(
          pc && isHovering ? "invisible" : "visible",
          "bg-[#f6fafe] dark:bg-transparent pt-4 px-3 lg:px-4  pb-2 lg:pb-6"
        )}
      >
        <h3 className="truncate font-bold text-center lg:text-left text-c9 lg:text-cwh2 mb-1.5 lg:mb-2">
          {tpl.tplName}
        </h3>
        <div className="flex flex-wrap">
          {tpl.tags?.map((v) => (
            <div key={v} className="px-3 mr-2 rounded dark:bg-b-1 bg-l-1 text-c5">
              {v}
            </div>
          ))}
        </div>
      </div>

      {authUser && pc && (
        <Link to={link} className={clsx(isHovering ? "block absolute left-0 right-0 bottom-10 px-5" : "hidden")}>
          <button
            type="button"
            className={clsx(
              "w-full h-10 font-medium leading-normal rounded-md text-c9 hover:opacity-70",
              "bg-black text-white dark:bg-white dark:text-black"
            )}
          >
            Use as yours to incentive fast!
          </button>
        </Link>
      )}
    </div>
  );
}
