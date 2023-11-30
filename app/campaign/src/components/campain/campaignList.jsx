import { Link } from "react-router-dom";
import { memo } from "react";
import { incentiveAssetsTypeList } from "@/utils/conf";

function Compaign({
  campaignId,
  picUrl,
  name,
  project,
  users,
  nfts = [],
  points,
}) {
  return (
    <Link
      to={`/app/${project?.projectId}/campaign/${campaignId}`}
      className="rounded-3xl overflow-hidden bg-white flex flex-col shadow-s2"
    >
      <img
        src={picUrl}
        className="w-full h-[160px] lg:h-[140px] object-cover object-center  hover:translate-y-2 hover:scale-105 transition-all transition-2000"
      />
      <div className="p-5 text-lt-1 flex flex-col">
        <div className="flex items-center gap-x-2">
          <img src={project.avatarUrl} className="w-5 h-5 rounded-full" />
          <p className="text-sm font-medium truncate max-w-[calc(100%_-_40px)]">
            {project.projectName}
          </p>
        </div>

        <h2 className="font-bold text-lg line-clamp-2 h-14 mb-3">{name}</h2>

        <div className="flex items-center gap-x-1 mb-3">
          <div className="flex items-center max-w-[calc(100%_-_20px)] flex-nowrap overflow-hidden -space-x-1.5">
            {users.map((v) => (
              <img
                src={v.avatar}
                key={v.userId}
                className="w-[18px] h-[18px] rounded-full"
              />
            ))}
          </div>
          <span className="text-sm">🔥</span>
        </div>

        <div className="flex flex-wrap text-xs font-medium space-x-3 text-lt-1">
          {nfts.length > 0 && (
            <div className="py-0.5 flex items-center gap-x-2  text-t-1">
              <img
                src={incentiveAssetsTypeList.find((v) => v.value === 2)?.icon}
                className="w-4 h-4"
              />
              NFT
            </div>
          )}
          {points.length > 0 && (
            <div className="py-0.5 flex items-center gap-x-2  text-t-1">
              <img
                src={incentiveAssetsTypeList.find((v) => v.value === 2)?.icon}
                className="w-4 h-4"
              />
              POINTS
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default memo(Compaign);
