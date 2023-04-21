import { useState, lazy, Suspense, useMemo } from "react";
import AllocationPie from "./allocationPie";
import TokenDistribution from "./distributionPie";
import RecordTable from "./recordTable";
import { useCurrentProjectId, useUserInfoLoading, useCurrentProject } from "@tbook/hooks";
import { useAsyncEffect, useResponsive } from "ahooks";
import { useSelector } from "react-redux";
import { getTokenDist, getDilutedToken, getGrantRecordList, getIncentiveList } from "@/api/incentive";
import { useProjects } from "@tbook/hooks";
import Loading from "@/components/loading";
import NoConnect from "../incentive/planTip/NoConnect";
import Notip from "../incentive/planTip/NoTip";
import { conf } from "@tbook/utils";

const TemplateComponent = lazy(() => import("./template"));
const { defaultMaxAmount } = conf;

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
  const projects = useProjects();
  const [tipLoading, setTipLoading] = useState(null);
  const [hasTip, setHasTip] = useState(false);
  const tokenTotalAmount = project?.tokenInfo?.tokenTotalAmount || defaultMaxAmount;

  const { pc } = useResponsive();

  const loading = useMemo(() => {
    if (userLoading === false && tipLoading === false) {
      return false;
    }
    return true;
  }, [userLoading, tipLoading]);
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

  return (
    <div className="dark:text-white bx py-[25px] lg:py-[58px]">
      {loading ? (
        <Loading h="h-[300px]" />
      ) : !authUser ? (
        <>
          <NoConnect pc={pc} title="New Token Allocation" paragraph="Connect wallet to incentivize on TBOOK." />
          <Suspense fallback={<Loading h="h-[300px]" />}>
            <TemplateComponent />
          </Suspense>
        </>
      ) : projects.length === 0 || !hasTip ? (
        <>
          <div className="mb-5 lg:my-12">
            <Notip
              link={projects.length === 0 ? "/create/project" : "/create/plan"}
              desc="Click to set up your token allocation or select an open template to incentivize on TBOOK."
            />
          </div>

          <Suspense fallback={<Loading h="h-[300px]" />}>
            <TemplateComponent />
          </Suspense>
        </>
      ) : (
        <>
          <div className="mb-5 lg:mb-12">
            <AllocationPie loading={tokenDistLoading} pieList={tokenDist} totalToken={tokenTotalAmount} />
            <TokenDistribution loading={dilutedTokenloading} dilutedToken={dilutedToken} />
          </div>

          {recordListLoading ? <Loading /> : <RecordTable list={recordList} />}
        </>
      )}
    </div>
  );
}
