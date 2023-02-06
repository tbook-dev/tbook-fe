import { shortAddress, grantStatusList, grantType } from "@/utils/const";
import { useMemo } from "react";
import { formatThousands } from "@/utils/Utils";

export default function ({ grant }) {
  const conf = useMemo(
    () => [
      {
        label: "Grant Type",
        render: () => "token option", //现在都是这个功能
      },
      {
        label: "Vested",
        render: () => formatThousands(grant?.vestedAmount),
      },
      {
        label: "Latest Vesting",
        render: () => grant?.grant?.grantDate,
      },
      {
        label: "Vesting Type",
        render: () => {
          const type = grantType.find(
            (item) => item.value === grant?.grant?.grantType
          );
          return (
            <div className="flex justify-end">
              <img src={type?.icon} className="ml-2" />
              {type?.label}
            </div>
          );
        },
      },
    ],
    [grant]
  );

  const status = grantStatusList.find(
    (item) => grant.grant?.grantStatus === item.value
  );

  return (
    <div className="p-2 text-sm bg-white rounded-2xl">
      <div className="flex justify-between mb-2">
        <span className="block px-2 border rounded text-[#8C8C8C]">
          {grant.grant.granteeId}
        </span>
        <span className="text-right" style={{ color: status?.color }}>
          {status?.text}
        </span>
      </div>

      <div className="flex">
        <img
          src={grant?.grantee?.avatar}
          className="w-[40px] h-[40px] rounded-full mr-1.5"
        />
        <div className="flex flex-col justify-center flex-none">
          <h3 className="text-ellipsis w-max-[130px truncate font-bold text-[#202124] text-base">
            {grant?.grantee?.name}
          </h3>
          <p className="text-ellipsis	truncate text-[#45484F] text-sm">
            {shortAddress(grant?.grantee?.mainWallet)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 text-[26px] bg-[#ECF1FF] rounded px-1">
        <div className="truncate">Total</div>
        <div className="text-right truncate text-[#0049FF]">
          {formatThousands(grant?.grant?.grantNum)}
        </div>
      </div>

      <div className="space-y-2">
        {conf.map((v) => {
          return (
            <div key={v.label} className="grid grid-cols-2">
              <div className="truncate">{v.label}</div>
              <div className="text-right truncate">
                <v.render />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
