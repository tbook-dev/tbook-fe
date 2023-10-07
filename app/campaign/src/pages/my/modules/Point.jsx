import { formatDollar } from "@tbook/utils/lib/conf";
import useAssetQuery from "@/hooks/useAssetQuery";
import { Spin } from "antd";
import _ from "lodash";
import { useParams } from "react-router-dom";

export default function Point() {
  const { projectId } = useParams();
  const { data: assets, isLoading } = useAssetQuery(projectId);
  const data = assets?.userPoints || [];
  const total = _.sum(data.map((v) => v.pointNum));
  return (
    <div className="space-y-2">
      {isLoading ? (
        <div className="pt-10 flex justify-center">
          <Spin spinning />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center text-black bg-white rounded-xl h-[124px]">
            <div className="font-bold text-4.2xl leading-[44px] mb-1">
              {formatDollar(total)}
            </div>
            <div className="font-medium text-base">points</div>
          </div>
          {data.map((v, idx) => {
            return (
              <div
                key={idx}
                className="flex items-center justify-between py-3 px-5 bg-white rounded-xl"
              >
                <span>+{formatDollar(v.pointNum)}</span>
                <span>{v.date}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
