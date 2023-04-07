import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { conf } from "@tbook/utils";

const { shortAddress, grantStatusList, grantType, getLastVested, formatDollar } = conf;

//   pc版本的card, card本身有多种风格，不应当为同一个组件，会很乱。
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

  return (
    <Link
      className="p-1 overflow-hidden rounded-lg dark:bg-black hover:bg-cw3 dark:text-b-8 bg-[#f6fafe]"
      to={`/grants/${grant?.grant?.grantId}/sign`}
    >
      <div className="px-2 py-3 rounded-lg text-c5 shadow-d6 hover:shadow-d7">
        <div className="flex items-center justify-between mb-6">
          <span className="block px-2">{grant?.grant?.grantId}</span>
          {status && (
            <span
              className="text-center max-w-[100px] w-20 truncate border rounded"
              style={{
                color: isDark ? status?.darkColor : "",
                borderColor: isDark ? status?.darkColor : "",
              }}
            >
              {status?.text}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 p-2 mb-6">
          <div className="truncate text-c3">Vested</div>
          <span className="font-bold text-right truncate text-cwh2 text-colorful1">
            {formatDollar(grant?.vestedAmount)}
          </span>
        </div>

        <div className="px-2 space-y-3">
          {conf.map((v) => {
            return (
              <div key={v.label} className="grid grid-cols-2 text-[14px] leading-[22px]">
                <div className="truncate">{v.label}</div>
                <div className="text-right text-white truncate">
                  <v.render />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
