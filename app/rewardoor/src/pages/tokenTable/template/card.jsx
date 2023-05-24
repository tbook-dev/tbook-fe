import { Link, useNavigate } from "react-router-dom";
import { useResponsive } from "ahooks";
import { memo, useMemo, useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import Chart from "../allocationPie/chart";
import Arrow from "@tbook/share/images/icon/arrow2.svg";
import Arrow3 from "@tbook/share/images/icon/arrow3.svg";
import { Modal } from "antd";
import ThemeProvider from "@/theme/ThemeProvider";
import { conf } from "@tbook/utils";
import { useTheme } from "@tbook/hooks";

const { colorsBg, colors, hexToRgba, defaultMaxAmount } = conf;

function TemplateCard({ tpl }) {
  const authUser = useSelector((state) => state.user.authUser);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
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
      value: (defaultMaxAmount * v.percentage) / 100,
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
    <>
      <div
        onClick={() => pc && setOpen(true)}
        className={clsx(
          "relative pt-1 rounded-lg  lg:pt-2 lg:rounded-2xl lg:shadow-d6 shadow-d3  dark:bg-bg-b bg-[#ECF5FE]",
          "lg:hover:bg-cw2 cursor-pointer"
        )}
      >
        <div className="w-full px-3 lg:px-4" style={{ height: pc ? 190 : "calc(50vw - 12px)" }}>
          <Chart data={list} totalToken={tpl.maxTotalSupply} width="100%" height="100%" fontSize={8} />
        </div>
        <div
          className={clsx(
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

          {!pc && (
            <img
              src={theme === "dark" ? Arrow : Arrow3}
              className={clsx("flex-none object-contain w-9 h-9", open && "rotate-180")}
              onClick={() => {
                setOpen(!open);
              }}
            />
          )}
        </div>
        {!pc && open && (
          <div className="px-3 mb-5 space-y-4">
            {list.map((v, idx) => {
              const c = colors[idx % colors.length];
              const bg = colorsBg[idx % colorsBg.length];

              return (
                <div
                  key={v.id}
                  className="flex items-center justify-center h-10 px-4 py-1 font-medium border-l-4 rounded bg-b-1"
                  style={{ borderColor: c, backgroundColor: hexToRgba(bg, 0.04) }}
                >
                  <div className="flex-none max-w-full">
                    <p className="font-semibold truncate text-c14 text-ellipsis">
                      <span className="mr-1 " style={{ color: c }}>
                        {v.percentage}%
                      </span>
                      {v.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!pc && open && (
          <button
            disabled={!authUser}
            onClick={() => navigate(link)}
            className={clsx(
              "block mb-5 h-10 w-[80vw] mx-auto text-black font-medium text-c6 bg-cw1 rounded-md",
              "disabled:bg-l-1 disabled:bg-none disabled:text-l-1",
              "dark:disabled:bg-b-1 dark:disabled:text-b-1"
            )}
          >
            Apply
          </button>
        )}
      </div>

      {pc && (
        <ThemeProvider>
          <Modal
            open={open}
            footer={null}
            destroyOnClose
            maskClosable
            width={936}
            maskStyle={{ backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.6)" }}
            onCancel={() => {
              setOpen(false);
            }}
            closable={false}
            centered
          >
            <div className="flex items-center justify-between px-4">
              <div>
                <h2 className="mb-2 mr-4 font-bold text-cwh3">{tpl.name}</h2>
                <div className="flex flex-wrap">
                  {tags.map((v) => (
                    <div key={v} className="px-3 mb-2 mr-2 rounded dark:bg-b-1 bg-l-1 text-c5">
                      {v}
                    </div>
                  ))}
                </div>
              </div>

              <button
                disabled={!authUser}
                onClick={() => navigate(link)}
                type="button"
                className={clsx(
                  "w-[120px] h-10 font-medium rounded-lg text-c2 hover:opacity-70",
                  "bg-black text-white dark:bg-white dark:text-black",
                  "disabled:bg-l-1 disabled:hover:opacity-100 disabled:text-l-1",
                  "dark:disabled:bg-b-1 dark:disabled:text-b-1"
                )}
              >
                Apply
              </button>
            </div>

            <div className="grid items-center lg:grid-cols-2 lg:gap-x-12">
              <div className="w-full h-[320px]">
                <Chart data={list} totalToken={tpl.maxTotalSupply} width="100%" height="100%" />
              </div>
              <div className="space-y-4">
                {list.map((v, idx) => {
                  const c = colors[idx % colors.length];
                  const bg = colorsBg[idx % colorsBg.length];

                  return (
                    <div
                      key={v.id}
                      className="flex items-center justify-center h-10 px-4 py-1 font-medium border-l-4 rounded bg-b-1"
                      style={{ borderColor: c, backgroundColor: hexToRgba(bg, 0.04) }}
                    >
                      <div className="flex-none max-w-full">
                        <p className="font-semibold truncate text-c14 text-ellipsis">
                          <span className="mr-1 " style={{ color: c }}>
                            {v.percentage}%
                          </span>
                          {v.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Modal>
        </ThemeProvider>
      )}
    </>
  );
}

export default memo(TemplateCard);
