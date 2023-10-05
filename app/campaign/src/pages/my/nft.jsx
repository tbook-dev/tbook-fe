import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { shortAddress } from "@tbook/utils/lib/conf";
import clsx from "clsx";
import linkIcon from "@/images/icon/link.svg";
import { supportChains } from "@/utils/conf";
import backIcon from "@/images/icon/back.svg";
import useNftQuery from "@/hooks/useNftQuery";
import dayjs from "dayjs";
import { Spin } from "antd";


export default function NFT() {
  const { projectId, groupId, nftId } = useParams();
  const { data = {}, isLoading } = useNftQuery(groupId, nftId);
  const list = useMemo(() => {
    const chain = supportChains.find(
      (v) => v.value === data.chainId || v.value === 420
    );

    return [
      {
        title: "Contract",
        com: shortAddress(data.contract),
        col: 1,
      },
      {
        title: "Chain",
        com: (
          <div className="flex items-center gap-x-1">
            <img
              src={chain.icon}
              alt="network"
              className="w-4 h-4 object-center object-contain"
            />
            {chain?.label}
          </div>
        ),
        col: 1,
      },
      {
        title: "ID",
        com: `#${data.nftId}`,
        col: 2,
      },
      {
        title: "Campaign",
        com: (
          <Link
            to={`/app/${projectId}/${data.campaignId}`}
            className="flex items-center flex-wrap gap-x-1"
          >
            {data.campaignName}
            <img
              src={linkIcon}
              className="w-4 h-4 object-center object-contain"
              alt="link"
            />
          </Link>
        ),
        col: 2,
      },
      {
        title: "Mint Time",
        com: dayjs(data.claimedDate).format("MMM D, YYYY"),
        col: 2,
      },
    ];
  }, [data]);
  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spin spinning />
      </div>
    );
  }
  return (
    <div className="relative">
      <Link className="lg:hidden absolute left-2 top-3" to={`/app/${data.campaignId}`}>
        <img src={backIcon} alt="back" />
      </Link>

      <div className="w-page-content mx-auto mb-5">
        <img src={data.picUrl} className="w-full" />
      </div>
      <div className="w-page-content mx-auto px-6 lg:px-0">
        <h2 className="text-2xl font-bold mb-5">{data.campaignName}</h2>
        <div className="grid grid-cols-2 gap-y-4">
          {list.map((v) => {
            return (
              <div
                key={v.title}
                className={clsx({
                  "col-span-2": v.col === 2,
                  "col-span-1": v.col === 1,
                })}
              >
                <div className="text-[#717374] text-xs mb-1">{v.title}</div>
                <div className="text-black text-sm font-medium">{v.com}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
