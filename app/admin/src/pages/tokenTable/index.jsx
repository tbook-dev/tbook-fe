import Pie from "./pie";
import RecordTable from "./recordTable";
import { useCurrentProjectId, useUserInfoLoading, useProjects } from "@tbook/hooks";
import { useAsyncEffect, useResponsive } from "ahooks";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import PlanTipNoConnect from "../incentive/planTip/NoConnect";
import PlanTipNoProject from "../incentive/planTip/NoProject";

export default function TokenTable() {
  const userLoading = useUserInfoLoading();
  const projects = useProjects();
  const authUser = useSelector((state) => state.user.authUser);
  const { pc } = useResponsive();

  return (
    <div className="text-white bx py-[25px] lg:py-[58px]">
      <div className="mb-5 lg:mb-12">
        {userLoading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Spin />
          </div>
        ) : !authUser ? (
          <PlanTipNoConnect pc={pc} />
        ) : projects.length === 0 ? (
          <PlanTipNoProject
            pc={pc}
            desc="Click to set up your incentive plan or select a template."
            link={projects.length === 0 ? "/create/project" : "/create/plan"}
          />
        ) : (
          <Pie />
        )}
      </div>

      <RecordTable />
    </div>
  );
}
