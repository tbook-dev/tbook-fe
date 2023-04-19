import { useState, lazy, Suspense, useMemo } from "react";
import AllocationPie from "./allocationPie";
import TokenDistribution from "./distributionPie";
import RecordTable from "./recordTable";
import { useCurrentProjectId, useUserInfoLoading, useCurrentProject } from "@tbook/hooks";
import { useAsyncEffect, useResponsive } from "ahooks";
import { useSelector } from "react-redux";
import { getTokenDist, getDilutedToken, getAllocatPlan, getGrantRecordList, getIncentiveList } from "@/api/incentive";
import { useNavigate } from "react-router-dom";
import { useFindAudience } from "@tbook/hooks";
import Loading from "@/components/loading";

const TemplateComponent = lazy(() => import("./template"));

export default function TokenTable() {
  const userLoading = useUserInfoLoading();
  const authUser = useSelector((state) => state.user.authUser);
  const projectId = useCurrentProjectId();
  const [tokenDist, setTokenDist] = useState([]);
  const [tokenDistLoading, setTokenDistLoading] = useState(true);
  const [dilutedToken, setDilutedToken] = useState([]);
  const [dilutedTokenloading, setDilutedTokenloading] = useState(true);
  const [recordList, setRecordList] = useState([]);
  const [recordListLoading, setRecordListLoading] = useState(true);
  const project = useCurrentProject();
  const navigate = useNavigate();
  const findAudience = useFindAudience();
  const [tipLoading, setTipLoading] = useState(false);
  const [hasTip, setHasTip] = useState(false);
  const tokenTotalAmount = project?.tokenInfo?.tokenTotalAmount || 100000000;
  const [versions, setVersions] = useState([]);

  const { pc } = useResponsive();

  const loading = useMemo(() => {
    if (userLoading) {
      return true;
    }
    if (tipLoading) {
      return true;
    }
    return false;
  }, [userLoading, tipLoading]);
  const showTemplate = useMemo(() => {
    if (!authUser) {
      // 没有登录
      return true;
    } else {
      if (!hasTip) {
        return true;
      }
    }
    return false;
  }, [authUser, projectId, hasTip]);

  useAsyncEffect(async () => {
    if (!projectId) return;
    setTipLoading(true);
    const list = await getIncentiveList(projectId);
    setHasTip(list.length > 0);
    setTipLoading(false);
  }, [projectId]);

  useAsyncEffect(async () => {
    if (!projectId) return;
    setTokenDistLoading(true);
    const list = await getTokenDist(projectId);
    setTokenDist(list.map((v) => ({ ...v, label: v.planName })));
    const info = await getAllocatPlan(projectId);
    setVersions([
      {
        versionName: "Version01",
        createDate: info.date,
        versionId: 1,
      },
    ]);
    setTokenDistLoading(false);
  }, [projectId]);

  useAsyncEffect(async () => {
    if (!projectId) return;
    setDilutedTokenloading(true);
    const list = await getDilutedToken(projectId);
    setDilutedToken(list);
    setDilutedTokenloading(false);
  }, [projectId]);
  useAsyncEffect(async () => {
    if (!projectId) return;
    setRecordListLoading(true);
    const list = await getGrantRecordList(projectId);
    setRecordList(list);
    setRecordListLoading(false);
  }, [projectId]);
  return loading ? (
    <Loading />
  ) : !authUser ? (
    <div className="text-white">
      <div> connect wallet</div>
      <Suspense fallback={<Loading h="h-[300px]" />}>
        <TemplateComponent />
      </Suspense>
    </div>
  ) : !hasTip ? (
    <div className="text-white">
      <div> project no tip</div>
      <Suspense fallback={<Loading h="h-[300px]" />}>
        <TemplateComponent />
      </Suspense>
    </div>
  ) : (
    <div className="dark:text-white bx py-[25px] lg:py-[58px]">
      <div className="mb-5 lg:mb-12">
        <AllocationPie
          loading={tokenDistLoading}
          pieList={tokenDist}
          totalToken={tokenTotalAmount}
          versions={versions}
        />
        <TokenDistribution loading={dilutedTokenloading} dilutedToken={dilutedToken} />
      </div>

      {/* {tipList.length === 0 ? <Template /> : <RecordTable />} */}
      {recordListLoading ? <Loading /> : <RecordTable list={recordList} />}
    </div>
  );
}
