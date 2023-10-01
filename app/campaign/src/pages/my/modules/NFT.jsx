import { shortAddress } from "@tbook/utils/lib/conf";
import Empty from "./Empty";

const list = [
  {
    id: 1,
    avator:
      "https://pic.quanjing.com/hs/rc/QJ6174266377.jpg?x-oss-process=style/794wsy",
    nftName: "lake-abcxx",
    creatorAddress: "0x63xc8...bf9b",
    createTime: "xxx",
  },
  {
    id: 2,
    avator:
      "https://pic.quanjing.com/hs/rc/QJ6174266377.jpg?x-oss-process=style/794wsy",
    nftName: "lake-abcxx",
    creatorAddress: "0x63xc8...bf9b",
    createTime: "xxx",
  },
];

export default function NFT() {
  return (
    <div className="space-y-2">
      {list.length > 0 ? (
        list.map((v) => {
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
