import { useMemo } from "react";
import { Link } from "react-router-dom";
import { conf } from "@tbook/utils";

const { shortAddress, grantStatusList, grantType, getLastVested, formatDollar } = conf;

export default function ({ grant }) {
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
          return (
            <div className="flex items-center justify-end">
              <img src={type?.icon} className="mr-px" />
              {type?.label}
            </div>
          );
        },
      },
    ],
    [grant]
  );

  const status = grantStatusList.find((item) => grant.grant?.grantStatus === item.value);

  return (
    <Link
      className="p-1 overflow-hidden bg-[#f6fafe]  rounded-lg dark:bg-black hover:bg-cw3 text-l-8 dark:text-b-8"
      to={`/grants/${grant?.grant?.grantId}/sign`}
    >
      <div className="px-2 py-3 rounded-lg text-c5 shadow-d6 hover:shadow-d7">
        <div className="flex items-center justify-between mb-6">
          <span className="block px-2">{grant?.grant?.grantId}</span>
          {status && (
            <span
              className="text-center max-w-[100px] w-20 truncate border rounded"
              style={{
                color: status?.darkColor,
                borderColor: status?.darkColor,
              }}
            >
              {status?.text}
            </span>
          )}
        </div>

        <div className="flex mb-4 h-[46px] items-center">
          <div className="w-10 h-10 rounded-full dark:bg-[#141414] flex justify-center items-center mr-4">
            <img src={grant?.grantee?.avatar} className="w-6 h-6" />
          </div>

          <div className="flex flex-col justify-center flex-none">
            <h3 className="text-ellipsis text-c6 max-w-[130px] truncate">{grant?.grantee?.name}</h3>
            <p className="truncate text-ellipsis text-c1">{shortAddress(grant?.grantee?.mainWallet)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 p-2 mb-6">
          <div className="truncate text-c3">Total</div>
          <span className="font-bold text-right truncate text-cwh2 text-colorful1">
            {formatDollar(grant?.grant?.grantNum)}
          </span>
        </div>

        <div className="px-2 space-y-3">
          {conf.map((v) => {
            return (
              <div key={v.label} className="grid grid-cols-2 text-[14px] leading-[22px]">
                <div className="truncate">{v.label}</div>
                <div className="text-right text-black truncate dark:text-white">
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
