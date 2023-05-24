import clsx from "clsx";

export default function ({ filters, filterOpitons, dispatch }) {
  return (
    <div className="w-full px-4 py-6 space-y-4 rounded-lg shadow-l7 bg-[#f6fafe] dark:bg-transparent">
      {filterOpitons.map((conf) => {
        return (
          <div key={conf.group}>
            <h3 className="mb-3 font-bold dark:text-white text-c-3 text-c17">{conf.group}</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              {conf.list.map((v) => {
                const list = filters[v.key];
                const isSelected = !!list.find((i) => i.value === v.value);

                return (
                  <div
                    key={v.value}
                    onClick={() => {
                      if (v.disabled) return;
                      let res = [];
                      if (list?.find((i) => i.value === v.value)) {
                        // 反选
                        res = list.filter((i) => i.value !== v.value);
                      } else {
                        // 增加
                        res = [...list, v];
                      }

                      dispatch({
                        type: v.key,
                        payload: {
                          value: res,
                        },
                      });
                    }}
                    className={clsx(
                      "w-full text-c4 h-7 px-2  leading-[28px] text-center truncate text-ellipsis rounded hover:opacity-70",
                      isSelected
                        ? "bg-cw1 text-black font-bold cursor-pointer"
                        : v.disabled
                        ? "bg-white dark:bg-[#191919] text-l-1 dark:text-b-1 font-medium"
                        : "bg-white dark:bg-[#191919] text-c-9 dark:ext-c-6 font-medium cursor-pointer"
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
  );
}
