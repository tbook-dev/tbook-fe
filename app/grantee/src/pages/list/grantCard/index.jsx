import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { conf } from "@tbook/utils";

const { grantStatusList, getLastVested, formatDollar } = conf;

export default function ({ grant }) {
  // console.log(grant.grant.vestingSchedule.vestingDetail,'grant')
  const theme = useSelector((state) => state.user.theme);
  const isDark = theme === "dark";

  const conf = useMemo(
    () => [
      {
        label: "Granted",
        render: () => formatDollar(grant?.grant?.grantNum),
      },
      {
        label: "Vested Value",
        render: () => "$" + formatDollar(grant?.vestedAmount * grant?.grant?.exercisePrice),
      },
      {
        label: "Total Value",
        render: () => "$" + formatDollar(grant?.grant?.grantNum * grant?.grant?.exercisePrice),
      },
      {
        label: "Latest Vesting",
        render: () => getLastVested(grant?.grant?.vestingSchedule?.vestingDetail)?.date || "-",
      },
    ],
    [grant]
  );

  const status = grantStatusList.find((item) => grant.grant?.grantStatus === item.value);
  // console.log({ status });

  return (
    <Link
      className="px-3 pt-3 pb-2.5 text-xs rounded-lg shadow-d3 text-b-8"
      to={`/grants/${grant?.grant?.grantId}/sign`}
    >
      <div className="flex items-center justify-between mb-2.5 text-c4">
        <span className="flex-none max-w-[50%] truncate">{grant?.grant?.grantId}</span>
        {status && (
          <span
            className="flex-none max-w-[50%] w-[73px] rounded h-5 flex justify-center items-center border"
            style={{
              color: isDark ? status?.darkColor : "",
              borderColor: isDark ? status?.darkColor : "",
            }}
          >
            {status?.text}
          </span>
        )}
      </div>

      <div className="grid items-center grid-cols-2 px-1 mb-5">
        <div className="truncate text-c8">Vested</div>
        <div className="font-bold text-right truncate text-c9 text-colorful1">{formatDollar(grant?.vestedAmount)}</div>
      </div>

      <div className="space-y-3">
        {conf.map((v) => {
          return (
            <div key={v.label} className="grid grid-cols-2 text-c4">
              <div className="truncate text-b-8">{v.label}</div>
              <div className="font-medium text-right text-white truncate">
                <v.render />
              </div>
            </div>
          );
        })}
      </div>
    </Link>
  );
}
