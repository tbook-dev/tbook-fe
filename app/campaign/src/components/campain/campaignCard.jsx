import { Link } from "react-router-dom";
import { incentiveAssetsTypeList } from "@/utils/conf";

export default function CampaignCard({
  campaignId,
  picUrl,
  name,
  project,
  users,
  points,
}) {
  return (
    <Link to={`/app/${campaignId}`} className="flex items-center gap-x-3">
      <img
        src={picUrl}
        className="rounded-2.5xl w-[100px] h-[100px] object-center object-cover"
      />

      <div>
        <div>
          <div className="flex items-center gap-x-2">
            <img src={project.avatarUrl} className="w-5 h-5 rounded-full" />
            <p className="text-sm font-medium truncate max-w-[calc(100%_-_40px)]">
              {project.projectName}
            </p>
          </div>
          <h2 className="font-bold text-lg line-clamp-2 h-14 mb-3">{name}</h2>
        </div>
        <div>
          <div className="flex flex-wrap text-xs font-medium space-x-3 text-lt-1">
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
      </div>
    </Link>
  );
}
