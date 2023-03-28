import { useMemo } from "react";
import { conf } from "@tbook/utils";
import clsx from "clsx";

const { formatDollar } = conf;

export default function ({ dilutedToken = 1000000, holders = 134, totalSupply = 1000000000000 }) {
  const list = useMemo(() => {
    return [
      {
        title: "FULLY DILUTED TOKEN",
        value: formatDollar(dilutedToken),
      },
      {
        title: "HOLDERS",
        value: formatDollar(holders),
      },
      {
        title: "MAX TOTAL SUPPLY",
        value: formatDollar(totalSupply),
        className: "col-span-2 lg:col-span-1",
      },
    ];
  }, [dilutedToken, holders, totalSupply]);
  return (
    <div className="grid grid-cols-2 pt-[25px] gap-3 lg:gap-[14px]  lg:pt-[58px] lg:grid-cols-3 mb-4  lg:mb-6">
      {list.map((v) => (
        <div key={v.title} className={clsx(v.className, "py-4 px-3 rounded lg:rounded-lg shadow-d10")}>
          <p className="mb-3 text-xs font-medium">{v.title}</p>
          <p className="inline font-bold text-colorful1 text-cwh5">{v.value}</p>
        </div>
      ))}
    </div>
  );
}
