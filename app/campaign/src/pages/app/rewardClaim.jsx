import pointIcon from "@/images/icon/point.svg";
import nftIcon from "@/images/icon/nft.svg";
import { credentialStatus, incentiveMethodList } from "@/utils/conf";

export default function RewardClaim({ group }) {
  console.log({ group });
  const hasNFT = group.nftList?.length > 0;
  const hasPoint = group.pointList?.length > 0;

  return (
    <div>
      {group.nftList?.map((nft) => {
         const itemStatus = credentialStatus.find(
          (v) => v.value === point.claimedType
        );
        const incentiveMethodItem = incentiveMethodList.find(
          (v) => v.value === point.methodType
        );
        return (
          <div key={nft.nftId}>
            <div className="flex items-center gap-x-0.5 mb-2">
              <img src={nftIcon} className="w-4 h-4" />
              <span className="text-c-6 text-sm">nft</span>
            </div>
            <div className="flex flex-col gap-y-1.5 text-c-9 text-sm mb-2.5">
              <p clas>{nft.name}</p>
              <div className="flex items-center gap-x-0.5 lowercase">
                <img src={incentiveMethodItem.icon} className="w-3 h-4"/>
                {incentiveMethodItem.title}
              </div>
            </div>
            <button
              className="w-full py-2.5 mb-1"
              style={{
                color: itemStatus.color,
                backgroundColor: itemStatus.bgColor,
              }}
              disabled={itemStatus.disabled}
            >
              {itemStatus.label}
            </button>
            <p className="text-xs text-c-9">{itemStatus.desc}</p>
          </div>
        );
      })}

      {group.pointList?.map((point) => {
        const itemStatus = credentialStatus.find(
          (v) => v.value === point.claimedType
        );
        const incentiveMethodItem = incentiveMethodList.find(
          (v) => v.value === point.methodType
        );
        return (
          <div key={point.pointId}>
            <div className="flex items-center gap-x-0.5 mb-2">
              <img src={pointIcon} className="w-4 h-4" />
              <span className="text-c-6 text-sm">point</span>
            </div>
            <div className="flex flex-col gap-y-1.5 text-c-9 text-sm mb-2.5">
              <p clas>{point.number} points</p>
              <div className="flex items-center gap-x-0.5 lowercase">
                <img src={incentiveMethodItem.icon} className="w-3 h-4"/>
                {incentiveMethodItem.title}
              </div>
            </div>
            <button
              className="w-full py-2.5 mb-1"
              style={{
                color: itemStatus.color,
                backgroundColor: itemStatus.bgColor,
              }}
              disabled={itemStatus.disabled}
            >
              {itemStatus.label}
            </button>
            <p className="text-xs text-c-9">{itemStatus.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
