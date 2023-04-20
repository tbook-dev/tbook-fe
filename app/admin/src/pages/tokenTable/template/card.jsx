import { Link, useNavigate } from "react-router-dom";
import { useHover, useResponsive } from "ahooks";
import { useRef, memo, useMemo } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Chart from "../allocationPie/chart";

function TemplateCard({ tpl }) {
  const authUser = useSelector((state) => state.user.authUser);
  const ref = useRef(null);
  const isHovering = useHover(ref);
  const { pc } = useResponsive();
  const navigate = useNavigate();
  const link = `/allocation?id=${tpl.id}`;
  const list = useMemo(() => {
    return tpl.plans.map((v) => ({ id: v.id, name: v.name, value: v.tokens, percentage: v.percent }));
  }, [tpl]);

  return (
    <div
      key={tpl.tplName}
      ref={ref}
      className="relative pt-1 rounded-lg  lg:pt-2 lg:rounded-2xl lg:shadow-d6 shadow-d3 lg:hover:bg-cw2 dark:bg-bg-b bg-[#ECF5FE]"
      onClick={() => {
        authUser && !pc && navigate(link);
      }}
    >
      <div className="w-full px-3 lg:px-4" style={{ height: pc ? 190 : "calc(50vw - 12px)" }}>
        <Chart data={list} totalToken={tpl.maxTokenSupply} width="100%" height="100%" fontSize={8} />
      </div>
      <div
        className={clsx(
          pc && isHovering ? "invisible" : "visible",
          "bg-[#f6fafe] dark:bg-transparent pt-4 px-3 lg:px-4  pb-2 lg:pb-6 rounded-b-lg"
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

export default memo(TemplateCard);
