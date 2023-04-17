import { Drawer } from "antd";
import clsx from "clsx";
import filterIcon from "@tbook/share/images/icon/filter.svg";
import closeIcon from "@tbook/share/images/icon/close3.svg";
import { useCallback, useEffect, useReducer } from "react";
import { filterReducer, initialFilters } from "@/store/parts";

export default function ({ open, filters: withPlanFilters, setOpen, filterOpitons, dispatch }) {
  const [filters, dispatchFilter] = useReducer(filterReducer, { ...initialFilters, ...withPlanFilters });
  // console.log({ withPlanFilters });
  useEffect(() => {
    // 设置默认选中的plan
    dispatchFilter({
      type: "cover",
      payload: {
        value: { ...initialFilters, ...withPlanFilters },
      },
    });
  }, [withPlanFilters]);

  const handleClearAll = () => {
    dispatchFilter({
      type: "clearAll",
      payload: {
        value: null,
      },
    });
  };

  const handleApply = useCallback(() => {
    dispatch({
      type: "cover",
      payload: {
        value: filters,
      },
    });
    setOpen(false);
  }, [filters, dispatch]);

  const Content = () => {
    return (
      <div className="relative px-4 -mx-6">
        <div className="sticky top-0 flex justify-end">
          <img src={closeIcon} className="object-contain w-4 h-4" onClick={() => setOpen(false)} />
        </div>

        <div className="mb-6 space-y-6">
          {filterOpitons.map((conf) => {
            return (
              <div key={conf.group}>
                <h3 className="mb-3 font-bold text-c-3 text-c17">{conf.group}</h3>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                  {conf.list.map((v) => {
                    const list = filters[v.key];
                    const isSelected =
                      v.key === "sortBy" ? v.value === filters.sortBy : !!list.find((i) => i.value === v.value);
                    return (
                      <div
                        key={v.value}
                        onClick={() => {
                          if (v.disabled) return;
                          let res = [];
                          if (v.key === "sortBy") {
                            res = v.value;
                          } else {
                            if (list?.find((i) => i.value === v.value)) {
                              // 反选
                              res = list.filter((i) => i.value !== v.value);
                            } else {
                              // 增加
                              res = [...list, v];
                            }
                          }

                          dispatchFilter({
                            type: v.key,
                            payload: {
                              value: res,
                            },
                          });
                        }}
                        className={clsx(
                          "w-full text-c4 h-7 leading-[28px] text-center text-ellipsis truncate rounded-md",
                          isSelected
                            ? "bg-cw1 text-black font-bold"
                            : v.disabled
                            ? "bg-[#f0f0f0] text-[#B8B8B8]"
                            : "bg-[#F0F0F0] text-c-6"
                        )}
                      >
                        {v.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 px-8 text-base font-medium text-black gap-x-5">
          <div className="flex items-center justify-center w-full rounded-md h-9 shadow-l1" onClick={handleClearAll}>
            Clear All
          </div>
          <div className="flex items-center justify-center w-full rounded-md h-9 bg-cw1" onClick={handleApply}>
            Apply
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <img src={filterIcon} onClick={() => setOpen(true)} className="object-contain w-9 h-9" />
      <Drawer
        placement="bottom"
        open={open}
        closable={false}
        maskStyle={{ backdropFilter: "blur(7px)" }}
        contentWrapperStyle={{
          height: "80vh",
          borderRadius: "18px 18px 0px 0px",
          overflow: "hidden",
        }}
        onClose={() => setOpen(false)}
      >
        <Content />
      </Drawer>
    </>
  );
}
