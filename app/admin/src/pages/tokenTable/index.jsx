import AllocationPie from "./allocationPie";
import TokenDistribution from "./distributionPie";
import RecordTable from "./recordTable";
import { useCurrentProjectId, useUserInfoLoading, useProjects } from "@tbook/hooks";
import { useAsyncEffect, useResponsive } from "ahooks";
import { Spin } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncentiveList, getTipGrantList } from "@/api/incentive";
import Template from "./template";
import { useNavigate } from "react-router-dom";

export default function TokenTable() {
  const userLoading = useUserInfoLoading();
  const projects = useProjects();
  const authUser = useSelector((state) => state.user.authUser);
  const projectId = useCurrentProjectId();
  const [tipList, setTipList] = useState([]);
  const [tipListLoading, setTiplistLoading] = useState(false);
  const navigate = useNavigate();

  const { pc } = useResponsive();

  useEffect(() => {
    if (!userLoading && !authUser) {
      navigate("/");
    }
    return () => {};
  }, [userLoading]);
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