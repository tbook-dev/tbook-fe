import { Link, useNavigate } from "react-router-dom";
import { useHover, useResponsive } from "ahooks";
import { useRef, memo, useMemo } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Chart from "../allocationPie/chart";
import Arrow from "@tbook/share/images/icon/arrow2.svg";

function TemplateCard({ tpl }) {
  const authUser = useSelector((state) => state.user.authUser);
  const ref = useRef(null);
  const isHovering = useHover(ref);
  const { pc } = useResponsive();
  const navigate = useNavigate();
  const link = `/allocation?id=${tpl.templateId}`;
  const list = useMemo(() => {
    let plans = [];
    try {
      plans = JSON.parse(tpl.distributionDetail);
    } catch (error) {
      console.log(error);
    }
    return plans.map((v, idx) => ({
      id: idx,
      name: v.targetName,
      value: (tpl.maxTotalSupply * v.percentage) / 100,
      percentage: v.percentage,
    }));
  }, [tpl]);
  const tags = useMemo(() => {
    let t = [];
    try {
      t = JSON.parse(tpl.tags);
    } catch (error) {}
    return t;
  }, [tpl]);

  return (
    <div
      ref={ref}
      className={clsx(
        "relative pt-1 rounded-lg  lg:pt-2 lg:rounded-2xl lg:shadow-d6 shadow-d3  dark:bg-bg-b bg-[#ECF5FE]",
        authUser && "lg:hover:bg-cw2"
      )}
    >
      <div className="w-full px-3 lg:px-4" style={{ height: pc ? 190 : "calc(50vw - 12px)" }}>
        <Chart data={list} totalToken={tpl.maxTotalSupply} width="100%" height="100%" fontSize={8} />
      </div>
      <div
        className={clsx(
          isHovering && authUser && pc ? "invisible" : "visible",
          "bg-[#f6fafe] dark:bg-transparent flex flex-wrap justify-between items-center pt-4 px-3 lg:px-4  pb-2 lg:pb-6 rounded-b-lg"
        )}
      >
        <div className="w-[70vw] lg:w-full">
          <h3 className="truncate font-bold text-left text-c9 lg:text-cwh2 mb-1.5 lg:mb-2">{tpl.name}</h3>
          <div className="flex flex-wrap">
            {tags.map((v) => (
              <div key={v} className="px-3 mb-2 mr-2 rounded dark:bg-b-1 bg-l-1 text-c5">
                {v}
              </div>
            ))}
          </div>
        </div>

        {!pc && authUser && (
          <img
            src={Arrow}
            className="flex-none object-contain w-9 h-9"
            onClick={() => {
              navigate(link);
            }}
          />
        )}
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
            Apply
          </button>
        </Link>
      )}
    </div>
  );
}

export default memo(TemplateCard);
