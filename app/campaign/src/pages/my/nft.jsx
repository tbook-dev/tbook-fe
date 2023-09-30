import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { shortAddress } from "@tbook/utils/lib/conf";
import clsx from "clsx";

const data = {
  picUrl:
    "https://pic.quanjing.com/hs/rc/QJ6174266377.jpg?x-oss-process=style/794wsy",
  contract: "0x330...8b7c",
  chainId: 10,
  id: "#12",
  campaignId: "251862450558",
  campaignName: "Firefly pass membership recruiting",
  mintTime: "Sep 3, 2023",
};

export default function NFT() {
  const { campaignId, nftId } = useParams();
  const list = useMemo(() => {
    return [
      {
        title: "Contract",
        com: shortAddress(data.contract),
        col: 2,
      },
      {
        title: "Chain",
        com: <div className="flex items-center gap-x-1">Chain</div>,
        col: 2,
      },
    ];
  }, [data]);

  console.log({ campaignId, nftId });

  return (
    <div>
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
                // className={clsx({
                //   "col-span-2": v.col === 2,
                //   "col-span-1": v.col === 1,
                // })}
              >
                <div>{v.title}</div>
                <div>{v.com}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
