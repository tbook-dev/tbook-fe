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
//   pc版本的card, card本身有多种风格，不应当为同一个组件，会很乱。
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
      className="px-3 py-4 text-[12px] leading-[20px] bg-white rounded-xl shadow-c13 text-[#202124]"
      to={`/grants/${grant?.grant?.grantId}/sign`}
    >
      <div className="flex justify-between mb-6">
        <span className="block px-2 border rounded text-[#8C8C8C]">
          {grant.grant.granteeId}
        </span>
        <span className="text-right text-[16px] leading-[20px] font-medium" style={{ color: status?.color }}>
          {status?.text}
        </span>
      </div>

      <div className="flex mb-4">
        <div className="w-10 h-10 rounded-full bg-[#e6e6e6] flex justify-center items-center mr-4">
          <img src={grant?.grantee?.avatar} className="w-6 h-6 ml-0.5" />
        </div>

        <div className="flex flex-col justify-center flex-none">
          <h3 className="text-ellipsis text-[16px] leading-[24px] max-w-[130px] truncate text-[#333] text-base">
            {grant?.grantee?.name}
          </h3>
          <p className="text-ellipsis text-[14px] leading-[22px] truncate text-[#8C8C8C] text-sm">
            {shortAddress(grant?.grantee?.mainWallet)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2  bg-[#ECF1FF] rounded -mx-1 p-2 mb-6">
        <div className="truncate text-[#666] text-[20px] leading-[28px]">Total</div>
        <div className="text-right truncate text-[24px] leading-[32px] text-[#0049FF]">
          {formatThousands(grant?.grant?.grantNum)}
        </div>
      </div>

      <div className="space-y-3">
        {conf.map((v) => {
          return (
            <div key={v.label} className="grid grid-cols-2 text-[14px] leading-[22px]">
              <div className="truncate text-[#666]">{v.label}</div>
              <div className="text-right truncate text-[#333]">
                <v.render />
              </div>
            </div>
          );
        })}
      </div>
    </Link>
  );
}
