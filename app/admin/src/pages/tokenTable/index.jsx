import AllocationPie from "./allocationPie";
import TokenDistribution from "./distributionPie";
import RecordTable from "./recordTable";
import { useCurrentProjectId, useUserInfoLoading, useProjects } from "@tbook/hooks";
import { useAsyncEffect, useResponsive } from "ahooks";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTokenDist, getDilutedToken } from "@/api/incentive";
import Template from "./template";
import { useNavigate } from "react-router-dom";
import { useFindAudience } from "@tbook/hooks";
import Loading from "@/components/loading";

export default function TokenTable() {
  const userLoading = useUserInfoLoading();
  const authUser = useSelector((state) => state.user.authUser);
  const projectId = useCurrentProjectId();
  const [tokenDist, setTokenDist] = useState([]);
  const [tokenDistLoading, setTokenDistLoading] = useState(false);
  const [dilutedToken, setDilutedToken] = useState([]);
  const [dilutedTokenloading, setDilutedTokenloading] = useState(false);
  const navigate = useNavigate();
  const findAudience = useFindAudience();

  const { pc } = useResponsive();

  useEffect(() => {
    if (!userLoading && !authUser) {
      navigate("/");
    }
    return () => {};
  }, [userLoading]);
  useAsyncEffect(async () => {
    if (!projectId) return;
    setTokenDistLoading(true);
    const list = await getTokenDist(projectId);
    setTokenDist(list.map((v) => ({ ...v, label: findAudience(v.target) })));
    setTokenDistLoading(false);
  }, [projectId]);
  useAsyncEffect(async () => {
    if (!projectId) return;
    setDilutedTokenloading(true);
    const list = await getDilutedToken(projectId);
    setDilutedToken(list);
    setDilutedTokenloading(false);
  }, [projectId]);

  return (
    <div className="text-white bx py-[25px] lg:py-[58px]">
      {/* section  */}
      <div className="mb-5 lg:mb-12">
        {userLoading || tokenDistLoading ? (
          <Loading />
        ) : (
          <>
            <AllocationPie pieList={tokenDist} />
            <TokenDistribution dilutedToken={dilutedToken} dilutedTokenloading={dilutedTokenloading} />
          </>
        )}
      </div>

      {/* {tipList.length === 0 ? <Template /> : <RecordTable />} */}
      {userLoading || dilutedTokenloading ? (
        <Loading />
      ) : (
        <RecordTable list={dilutedToken.filter((v) => v.tipId === -1)} />
      )}
    </div>
  );
}
