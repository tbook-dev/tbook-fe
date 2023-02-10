import {
  shortAddress,
  grantStatusList,
  grantType,
  dateFormat,
} from "@/utils/const";
import { useMemo } from "react";
import { formatThousands } from "@/utils/Utils";
import { getLastVested } from "@/utils/const";
import { Link } from "react-router-dom";

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
        render: () =>
          getLastVested(grant?.grant?.vestingSchedule?.vestingDetail)?.date ||
          "-",
      },
      {
        label: "Vesting Type",
        render: () => {
          const type = grantType.find(
            (item) => item.value === grant?.grant?.grantType
          );
          return (
            <div className="flex justify-end">
              <img src={type?.icon} className="mr-1" />
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
    <Link
      className="p-2 text-xs bg-white rounded-lg text-[#202124]"
      to={`/incentive/grant/${grant?.grant?.incentivePlanId}/${grant?.grant?.grantId}/detail`}
    >
      <div className="flex justify-between mb-2.5">
        <span className="block px-2 border rounded text-[#8C8C8C]">
          {grant.grant.granteeId}
        </span>
        <span className="text-right" style={{ color: status?.color }}>
          {status?.text}
        </span>
      </div>

      <div className="flex mb-[13px]">
        <div className="w-[28px] h-[28px] rounded-full bg-[#F0F0F0] flex justify-center items-center mr-1.5">
          <img src={grant?.grantee?.avatar} className="w-[17px] h-[17px]" />
        </div>

        <div className="flex flex-col justify-center flex-none">
          <h3 className="text-ellipsis w-max-[130px truncate font-bold text-[#202124] text-base">
            {grant?.grantee?.name}
          </h3>
          <p className="text-ellipsis	truncate text-[#8C8C8C] text-sm">
            {shortAddress(grant?.grantee?.mainWallet)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 text-[13px] bg-[#ECF1FF] rounded -mx-1 px-1 mb-3">
        <div className="truncate text-[#8C8C8C]">Total</div>
        <div className="text-right truncate text-[#0049FF]">
          {formatThousands(grant?.grant?.grantNum)}
        </div>
      </div>

      <div className="space-y-2">
        {conf.map((v) => {
          return (
            <div key={v.label} className="grid grid-cols-2">
              <div className="truncate text-[#8C8C8C]">{v.label}</div>
              <div className="text-right truncate">
                <v.render />
              </div>
            </div>
          );
        })}
      </div>
    </Link>
  );
}
