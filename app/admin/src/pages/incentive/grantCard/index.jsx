import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { conf } from "@tbook/utils";

const { shortAddress, grantStatusList, grantType, getLastVested, formatDollar }  = conf;
// const v = [
//     {
//         "date": "2023-12-01",
//         "quantity": 8000,
//         "cumulative": 10000,
//         "isVested": false
//     },
//     {
//         "date": "2023-01-01",
//         "quantity": 2000,
//         "cumulative": 2000,
//         "isVested": true
//     },
//     {
//         "date": "2023-02-02",
//         "quantity": 3000,
//         "cumulative": 3000,
//         "isVested": true
//     }
// ]

export default function ({ grant }) {
  // console.log(grant.grant.vestingSchedule.vestingDetail,'grant')
  const theme = useSelector((state) => state.user.theme);
  const isDark = theme === "dark";

  const conf = useMemo(
    () => [
      {
        label: "Grant Type",
        render: () => "token option", //现在都是这个功能
      },
      {
        label: "Vested",
        render: () => formatDollar(grant?.vestedAmount),
      },
      {
        label: "Latest Vesting",
        render: () => getLastVested(grant?.grant?.vestingSchedule?.vestingDetail)?.date || "-",
      },
      {
        label: "Vesting Type",
        render: () => {
          const type = grantType.find((item) => item.value === grant?.grant?.grantType);
          return type?.label;
        },
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

      <div className="flex mb-3">
        <div className="flex items-center justify-center mr-2 rounded-full w-7 h-7 dark:bg-[#141414]">
          <img src={grant?.grantee?.avatar} className="w-[17px] h-[17px]" />
        </div>

        <div className="flex flex-col justify-center flex-none">
          <h3 className="w-full truncate text-c8 text-b-8">{grant?.grantee?.name}</h3>
          <p className="w-full truncate text-c4 text-b-8">{shortAddress(grant?.grantee?.mainWallet)}</p>
        </div>
      </div>

      <div className="grid items-center grid-cols-2 px-1 mb-5">
        <div className="truncate text-c8">Total</div>
        <div className="font-bold text-right truncate text-c9 text-colorful1">
          {formatDollar(grant?.grant?.grantNum)}
        </div>
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
