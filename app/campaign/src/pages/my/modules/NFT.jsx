import { shortAddress } from "@tbook/utils/lib/conf";
import Empty from "./Empty";
import useAssetQuery from "@/hooks/useAssetQuery";
import clsx from "clsx";
import { Spin } from "antd";

export default function NFT() {
  const { data: assets, isLoading } = useAssetQuery();
  const data = assets?.nfts || [];
  return (
    <div className={clsx("space-y-2", isLoading && "flex justify-center pt-10")}>
      {isLoading ? (
        <Spin spinning />
      ) : data.length > 0 ? (
        data.map((v) => {
          return (
            <div className="bg-white rounded-xl p-5 flex gap-x-6" key={v.id}>
              <img
                src={v.avator}
                alt="nft"
                className="w-[84px] h-[84px] rounded-lg object-contain object-center flex-none"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-black text-base font-medium mb-1">
                    {v.nftName}
                  </h2>
                  <p className="text-sm text-black">
                    <span className="mr-1 text-[#717374]">by</span>
                    {shortAddress(v.creatorAddress)}
                  </p>
                </div>

                <p className="text-[#717374] text-sm">{v.createTime}</p>
              </div>
            </div>
          );
        })
      ) : (
        <Empty text="There's no nft yet." />
      )}
    </div>
  );
}
