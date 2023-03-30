import AllocationPie from "./allocationPie";
import TokenDistribution from "./distributionPie";
import RecordTable from "./recordTable";
import { useCurrentProjectId, useUserInfoLoading, useProjects } from "@tbook/hooks";
import { useAsyncEffect, useResponsive } from "ahooks";
import { Spin } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlanTipNoConnect from "../incentive/planTip/NoConnect";
import PlanTipNoProject from "../incentive/planTip/NoProject";
import { getIncentiveList, getTipGrantList } from "@/api/incentive";
import Template from "./template";

export default function TokenTable() {
  const userLoading = useUserInfoLoading();
  const projects = useProjects();
  const authUser = useSelector((state) => state.user.authUser);
  const projectId = useCurrentProjectId();
  const [tipList, setTipList] = useState([]);
  const [tipListLoading, setTiplistLoading] = useState(false);

  const { pc } = useResponsive();
  useAsyncEffect(async () => {
    if (!projectId) return;
    setTiplistLoading(true);
    const list = await getIncentiveList(projectId);
    setTipList(list);
    setTiplistLoading(false);
  }, [projectId]);

  return (
    <div className="text-white bx py-[25px] lg:py-[58px]">
      {/* section  */}
      <div className="mb-5 lg:mb-12">
        {userLoading || tipListLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Spin />
          </div>
        ) : !authUser ? (
          <PlanTipNoConnect pc={pc} />
        ) : tipList.length === 0 ? (
          <PlanTipNoProject
            pc={pc}
            desc="Click to set up your incentive plan or select a template."
            link={projects.length === 0 ? "/create/project" : "/create/plan"}
          />
        ) : (
          <>
            <AllocationPie />
            <TokenDistribution />
          </>
        )}
      </div>

      {tipList.length === 0 ? <Template /> : <RecordTable />}
    </div>
  );
}
