import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getGrantInfoWithPlan, getGrantSignInfo, getGrantVestingScheduleInfo } from "@/api/incentive";
import { useAsyncEffect } from "ahooks";
import { conf } from "@tbook/utils";
import VestingSchedule from "../vested/VestingSchedule";
import { useSelector } from "react-redux";
// import Header from "../component/Header";
import Card from "../card";
import clsx from "clsx";
import VestedCard from "../vested";
import Banner from "../../component/banner";
import signIcon from "@tbook/share/images/incentive/sign.svg";
import { Spin } from "antd";
import Action from "../action";
import NoProject from "./NoProject";
import { useUserInfoLoading } from "@tbook/hooks";

const { formatDollar, periodMap, shortAddress, findGrantType } = conf;

function GrantSign() {
  const { grantId } = useParams();
  const [signList, setSignList] = useState([]);
  const [grantInfo, setGrantInfo] = useState({});
  // const [tipId, setTipId] = useState(null);
  const [tipInfo, setTipInfo] = useState({});
  // const navigate = useNavigate();
  const [scheduleInfo, setSchedule] = useState({});
  const authUser = useSelector((state) => state.user.authUser);
  const userInfo = useSelector((state) => state.user.user);
  const [granteeAuth, setGranteeAuth] = useState(null);
  const userLoading = useUserInfoLoading();

  // const projects = useSelector((state) => state.user.projects);
  // console.log("scheduleInfo", scheduleInfo);
  // 签名状态
  const signStatus = useMemo(() => {
    // return "allDone";
    if (signList.length === 0) {
      return null;
    }
    const sg = signList.find((sg) => sg?.signer?.mainWallet === userInfo.mainWallet);
    if (sg?.grantSign.signStatus === 1) {
      return "notyet";
    } else {
      return "allDone";
      // return signList.filter((sg) => sg.grantSign.signStatus === 2).length === 2 ? "allDone" : "done";
    }
  }, [signList]);

  // console.log(signStatus);
  useAsyncEffect(async () => {
    if (!authUser) return;
    const list = await getGrantSignInfo(null, grantId);
    setSignList(list);
  }, [grantId, authUser]);

  // 获取grant信息
  useAsyncEffect(async () => {
    if (!authUser) return;

    try {
      const info = await getGrantInfoWithPlan(grantId);
      console.log(info);
      if (granteeAuth === null) {
        setGranteeAuth(true);
      }
      setGrantInfo(info.grant);
      setTipInfo(info.tip);
    } catch (error) {
      // 403 没有权限
      setGranteeAuth(false);
      console.log("getGrantInfoWithPlan-403", error, false);
    }
  }, [grantId, authUser]);

  // 获取tip信息
  // useAsyncEffect(async () => {
  //   if (!authUser || !tipId) return;
  //   const tipInfo = await getTIPInfo(tipId);
  //   setTipInfo(tipInfo);
  // }, [tipId, authUser]);

  // vesting schedule信息

  useAsyncEffect(async () => {
    if (!authUser) return;
    try {
      const vestingSchedule = await getGrantVestingScheduleInfo(grantId);
      // console.log("vestingSchedule->", vestingSchedule);
      if (granteeAuth === null) {
        setGranteeAuth(true);
      }
      setSchedule(vestingSchedule || {});
    } catch (error) {
      // 403 没有权限
      console.log("vestingSchedule-403", error);
      setGranteeAuth(false);
    }
  }, [grantId, authUser]);
  // console.log({grantInfo})

  const granteeConf = useMemo(() => {
    return [
      {
        label: "Name",
        value: grantInfo?.granteeName,
      },
      {
        label: "ETH Address",
        value: shortAddress(grantInfo?.granteeEthAddress),
      },
      {
        label: "Email Address",
        value: grantInfo?.granteeEmail,
      },
    ];
  }, [grantInfo]);

  const grantConf = useMemo(() => {
    const pendingConf = [
      {
        label: "Grant Type",
        value: "Token Option",
      },
      {
        label: "Total Amount",
        value: `${formatDollar(grantInfo?.grantNum)} Token`,
      },
      {
        label: "Exercise Price",
        value: `${formatDollar(grantInfo?.exercisePrice)} USD`,
      },
      {
        label: "Plan",
        value: tipInfo?.incentivePlanName,
      },
    ];
    const doneConf = [
      ...pendingConf,
      {
        label: "Grant ID",
        value: grantId,
      },
      {
        label: "Grantee",
        value: shortAddress(grantInfo?.granteeEthAddress),
      },
    ];
    return signStatus === "notyet" ? pendingConf : doneConf;
  }, [grantInfo, tipInfo, signStatus, grantId]);

  const vestingConf = useMemo(() => {
    return [
      {
        label: "Vesting Start Date",
        value: scheduleInfo?.grantStartDate,
      },
      {
        label: "Vesting Type",
        value: findGrantType(grantInfo.grantType),
      },
      ...(grantInfo.grantType == 1
        ? [
            {
              label: "Length",
              value: `${grantInfo.vestingTotalLength} ${periodMap[grantInfo.vestingTotalPeriod]}`,
            },
            {
              label: "Vesting Frequency",
              value: `${grantInfo.vestingFrequency}  ${periodMap[grantInfo.vestingPeriod]}`,
            },
            {
              label: "Cliff Duration",
              value: grantInfo.cliffTime ? `${grantInfo.cliffTime} ${periodMap[grantInfo.cliffPeriod]}` : null,
            },
            {
              label: "Cliff Amount",
              value: grantInfo.cliffAmount ? `${grantInfo.cliffAmount}%` : null,
            },
          ]
        : []),
      {
        label: "Vesting Times",
        value: scheduleInfo?.vestingSchedule?.vestingDetail?.length,
      },
    ];
  }, [scheduleInfo, grantInfo]);

  //
  // console.log("periodMap", periodMap, grantInfo.vestingTotalPeriod);

  if (userLoading || granteeAuth === null) {
    return (
      <div className="flex pt-[120px] items-center justify-center">
        <Spin />
      </div>
    );
  }
  if (granteeAuth === false) {
    // 失败没有权限
    return <NoProject />;
  }
  return (
    <main className="relative w-full pt-3 pb-10 lg:pb-0 lg:pt-12">
      {signStatus === null && (
        <div className="flex justify-center">
          <Spin />
        </div>
      )}
      {(signStatus === "notyet" || signStatus === "done") && (
        <Banner
          img={signIcon}
          title="Signing"
          description="Please confirm and sign this grant"
          className="lg:w-[640px] mx-auto mb-6 lg:mb-12"
        />
      )}
      {signStatus === "allDone" && (
        <div className="w-[600px] lg:mx-auto ml-[52px] mb-6 lg:mb-12">
          <h2 className="font-bold text-c11 lg:text-cwh3 dark:text-white mb-1 lg:mb-2.5">Grant Detail</h2>
          <span className="py-px px-3 lg:px-4 border border-[#69D0E5] rounded text-c4 lg:text-c5 text-colorful1">
            Effective
          </span>
        </div>
      )}

      <div
        className={clsx(
          "space-y-10 lg:w-[600px] lg:mx-auto mx-4",
          signStatus === "notyet" && "mb-[120px] lg:mb-[170px]",
          signStatus === "done" && " mb-[220px] lg:mb-[250px]",
          signStatus === "allDone" && "lg:mb-10"
        )}
      >
        {/* <Header title="Grant Detail" className="mb-0" /> */}

        {(signStatus === "notyet" || signStatus === "done") && <Card title="Grantee" list={granteeConf} />}
        {signStatus === "allDone" && <VestedCard scheduleInfo={scheduleInfo} />}

        <Card title="Grant" list={grantConf} />

        <Card title="Vesting" list={vestingConf}>
          <VestingSchedule dataList={scheduleInfo?.vestingSchedule?.vestingDetail || []} />
        </Card>
      </div>

      <Action {...{ signStatus, signList, setSignList }} />
    </main>
  );
}

export default GrantSign;
