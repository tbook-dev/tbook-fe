import { Link } from "react-router-dom";
import { incentiveAssetsTypeList } from "@/utils/conf";

export default function CampaignCard({
  campaignId,
  picUrl,
  name,
  nfts,
  points,
  projectId,
}) {
  return (
    <Link
      to={`/app/${projectId}/campaign/${campaignId}`}
      target="__blank"
      className="block bg-white rounded-xl"
    >
      <img
        src={picUrl}
        className="rounded-2.5xl w-full object-center object-contain"
      />

      <div className="px-5 pb-5 pt-3">
        <h2 className="font-medium text-base text-black mb-6">{name}</h2>
        <div className="flex items-center gap-x-3">
          <div className="flex flex-wrap font-medium space-x-3 text-lt-1 text-sm">
            {nfts.length > 0 && (
              <div className="py-0.5 flex items-center gap-x-2  text-t-1">
                <img
                  src={incentiveAssetsTypeList.find((v) => v.value === 1)?.icon}
                  className="w-5 h-5"
                />
                NFT
              </div>
            )}
          </div>
          <div className="flex flex-wrap font-medium space-x-3 text-lt-1 text-sm">
            {points.length > 0 && (
              <div className="py-0.5 flex items-center gap-x-2  text-t-1">
                <img
                  src={incentiveAssetsTypeList.find((v) => v.value === 2)?.icon}
                  className="w-5 h-5"
                />
                POINT
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
