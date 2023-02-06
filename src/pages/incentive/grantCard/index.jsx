import { Tag } from "antd";
import { shortAddress } from "@/utils/const";
import { useMemo } from "react";

export default function ({ grant }) {
  const conf = useMemo(
    () => [
      {
        label: "Grant Type",
        render: () => "token option", //现在都是这个功能
      },
      {
        label: "Vested",
        render: () => "token option", //现在都是这个功能
      },
      {
        label: "Latest Vesting",
        render: () => "token option", //现在都是这个功能
      },
      {
        label: "Vesting Type",
        render: () => "token option", //现在都是这个功能
      },
    ],
    [grant]
  );

  console.log(grant, conf);

  return (
    <div className="p-2 bg-white rounded-2xl">
      <div className="flex justify-between mb-2">
        <Tag>{grant.grant.granteeId}</Tag>
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

      <div>
        {conf.map((v) => {
          return (
            <div key={v.label} className="flex justify-between">
              <div className="">{v.label}</div>
              <div className="">
                <v.render />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
