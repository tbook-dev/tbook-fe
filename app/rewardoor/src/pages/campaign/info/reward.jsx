import { getCampaignDetail } from "@/api/incentive";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { credentialStatus, incentiveMethodList } from "@/utils/conf";
import pointIcon from "@/images/icon/point.svg";
import nftIcon from "@/images/icon/nft.svg";

export default function Reward() {
  const { id } = useParams();
  const { data: pageInfo = {} } = useQuery(
    ["campaignDetail", id],
    () => getCampaignDetail(id),
    {
      staleTime: Infinity,
    }
  );

  console.log({ pageInfo });
  return (
    <div className="w-[520px]">
      {pageInfo.groups?.map((group) => {
        return (
          <div className="space-y-4" key={group.id}>
            {group.nftList?.map((nft) => {
              const itemStatus = credentialStatus.find(
                (v) => v.value === nft.claimedType
              );
              const incentiveMethodItem =
                incentiveMethodList.find((v) => v.value === nft.methodType) ||
                incentiveMethodList[0];

              return (
                <div key={nft.nftId} className="bg-[#161616] rounded-xl">
                  <div className="flex items-center gap-x-1 mb-2 px-5 py-4 border-b border-[rgb(30,30,30)]">
                    <img src={nftIcon} className="w-6 h-6" />
                    <span className="text-white text-lg font-medium">nft</span>
                  </div>
                  <div className="px-5 py-4">
                    <div className="space-y-3 mb-6">
                      <h2>{nft.name}</h2>
                      <div className="w-16 h-16 bg-[#272727] p-2 rounded-lg border border-[rgb(50,50,50)] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
                        <img src={nft.coverUrl} className="w-full h-full object-contain object-center" />
                      </div>
                      <div className="flex items-center gap-x-0.5 lowercase text-base">
                        <img
                          src={incentiveMethodItem?.icon}
                          className="w-6 h-6 object-contain object-center"
                        />
                        {incentiveMethodItem?.title}
                      </div>
                      <button
                        className="py-1 px-2 text-xs rounded-xl bg-[rgb(28,33,27)]"
                        style={{
                          color: 'green',
                        }}
                        disabled={itemStatus.disabled}
                      >
                        done
                      </button>
                    </div>

                    <p className="text-xs text-c-9">{itemStatus.desc}</p>
                  </div>
                </div>
              );
            })}

            {group.pointList?.map((point) => {
              const itemStatus = credentialStatus.find(
                (v) => v.value === point.claimedType
              );
              const incentiveMethodItem =
                incentiveMethodList.find((v) => v.value === point.methodType) ||
                incentiveMethodList[0];
              return (
                <div key={point.pointId}>
                  <div className="flex items-center gap-x-0.5 mb-2">
                    <img src={pointIcon} className="w-4 h-4" />
                    <span className="text-c-6 text-sm">point</span>
                  </div>
                  <div className="flex flex-col gap-y-1.5 text-c-9 text-sm mb-2.5">
                    <p>{point.number} points</p>
                    <div className="flex items-center gap-x-0.5 lowercase">
                      <img
                        src={incentiveMethodItem?.icon}
                        className="w-3 h-4"
                      />
                      {incentiveMethodItem?.title}
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
      })}
    </div>
  );
}
