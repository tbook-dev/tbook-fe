import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography } from "antd";
import {
  getGrantInfo,
  getGrantSignInfo,
  postGrantSignInfo,
  getTIPInfo,
  getGrantVestingScheduleInfo,
} from "@/api/incentive";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useAsyncEffect } from "ahooks";
import { formatDollar, periodMap, shortAddress } from "@/utils/const";
import VestingSchedule from "../incentive/VestingSchedule";
import { useSelector } from "react-redux";
// import Header from "../component/Header";
import Card from "./card";
import clsx from "clsx";
import VestedCard from "./vested";
import { useSignMessage, useConnect } from "wagmi";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import Banner from "../component/banner";
import signIcon from "@/images/incentive/sign.svg";
import ConfigProviderV2 from "@/theme/ConfigProviderV2";
import { Spin } from "antd";

const { Paragraph } = Typography;

function GrantSign() {
  const { grantId } = useParams();
  const [signList, setSignList] = useState([]);
  const [grantInfo, setGrantInfo] = useState({});
  const [tipId, setTipId] = useState(null);
  const [tipInfo, setTipInfo] = useState({});
  // const navigate = useNavigate();
  const [scheduleInfo, setSchedule] = useState({});
  const authUser = useSelector((state) => state.user.authUser);
  const userInfo = useSelector((state) => state.user.user);
  const { signMessageAsync } = useSignMessage();
  const { isDisconnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { open } = useWeb3Modal();

  // const projects = useSelector((state) => state.user.projects);
  // console.log("scheduleInfo", scheduleInfo);
  // 签名状态
  const signStatus = useMemo(() => {
    // return 'allDone';
    if (signList.length === 0) {
      return null;
    }
    const sg = signList.find(
      (sg) => sg?.signer?.mainWallet === userInfo.mainWallet
    );
    if (sg?.grantSign.signStatus === 1) {
      return "notyet";
    } else {
      return signList.filter((sg) => sg.grantSign.signStatus === 2).length === 2
        ? "allDone"
        : "done";
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
    const info = await getGrantInfo(grantId);
    setGrantInfo(info);
    setTipId(info.incentivePlanId);
  }, [grantId, authUser]);

  // 获取tip信息
  useAsyncEffect(async () => {
    if (!authUser || !tipId) return;
    const tipInfo = await getTIPInfo(tipId);
    setTipInfo(tipInfo);
  }, [tipId, authUser]);

  // vesting schedule信息

  useAsyncEffect(async () => {
    if (!authUser) return;
    const vestingSchedule = await getGrantVestingScheduleInfo(grantId);
    // console.log("vestingSchedule->", vestingSchedule);
    setSchedule(vestingSchedule || {});
  }, [grantId, authUser]);

  async function handleSign(sign) {
    if (isDisconnected) {
      if (window.ethereum) {
        await connectAsync({
          connector: connectors.find((c) => c.id == "injected"),
        });
      } else {
        await open("ConnectWallet");
      }
    }
    signMessageAsync({ message: sign.signInfo })
      .then((s) => {
        return postGrantSignInfo(null, grantId, sign.grantSignId, s);
      })
      .then(async (r) => {
        const list = await getGrantSignInfo(null, grantId);
        setSignList(list);
        // const list = await getGrantSignInfo(null, grantId);
        // const isAllSigned  = list.some(sg =>sg.grantSign.signStatus==1)
        // let link = "/incentive";
        // const granteeProjects = projects.filter((v) => v.currentUserRole === 4);
        // if (granteeProjects.length === projects.length) {
        //   // 只有grantee角色
        //   link = `/my-grants`;
        // }
        // navigate(link);
      });
  }

  const Sign = () => {
    const sg = signList.find(
      (sg) => sg?.signer?.mainWallet === userInfo.mainWallet
    );
    if (!sg)
      return (
        <div className="flex justify-center">
          <Spin />
        </div>
      );

    return (
      <div
        className={clsx(
          "lg:w-[600px] mx-auto lg:px-6 lg:py-4 lg:shadow-d3  rounded-lg",
          signStatus === "notyet" && "lg:h-[72px]",
          signStatus === "done" && "bg-cw1",
          signStatus === "allDone" && "lg:h-[72px]"
        )}
      >
        <div
          className={clsx(
            "flex h-full",
            signStatus === "notyet" && "items-center justify-between",
            signStatus === "done" && "flex-col",
            signStatus === "allDone" && "items-center justify-between flex-col"
          )}
        >
          {signStatus === "notyet" && (
            <>
              <div className="flex items-center ">
                <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-cw1 lg:w-8 lg:h-8">
                  <img src={sg.signer.avatar} className="w-5 h-5" />
                </div>
                <p className="text-c1 text-colorful1">
                  {shortAddress(sg.signer.mainWallet)}
                </p>
              </div>

              <Button type="primary" onClick={() => handleSign(sg.grantSign)}>
                Sign
              </Button>
            </>
          )}
          {signStatus === "done" && (
            <>
              <div className="flex items-center mb-2.5">
                <CheckCircleOutlined
                  style={{
                    fontSize: "32px",
                    marginRight: "8px",
                    color: "#69D0E5",
                  }}
                />
                <span className="font-medium text-black text-c1">
                  {shortAddress(sg.signer.mainWallet)}
                </span>
              </div>
              <p className="text-black text-c5 py-2.5">
                Please copy and send the following link to the grantee.
              </p>
              <Paragraph
                copyable={{ text: location.href }}
                className="flex justify-between rounded-md lg:py-0"
                style={{
                  marginBottom: 0,
                  backgroundColor: "#fff",
                  padding: "8px 16px",
                  boxShadow:
                    "0px 0px 8px rgba(38, 227, 194, 0.25), 0px 0px 6px rgba(69, 160, 245, 0.6)",
                }}
              >
                <span className="text-[rgba(153, 153, 153, 0.4)] text-c1">
                  {location.href}
                </span>
              </Paragraph>
            </>
          )}
          {signStatus === "allDone" && (
              <div className="flex items-center">
                <CheckCircleOutlined
                  style={{
                    fontSize: "32px",
                    marginRight: "8px",
                    color: "#69D0E5",
                  }}
                />
                <span className="font-medium text-c1 text-colorful1">
                  {shortAddress(sg.signer.mainWallet)}
                </span>
              </div>
          )}
        </div>
      </div>
    );
  };

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
        value: `${formatDollar(grantInfo.exercisePrice)} USD`,
      },
    ];
    const doneConf = [
      {
        label: "Grant ID",
        value: grantId,
      },
      ...pendingConf,
      {
        label: "Plan",
        value: tipInfo?.incentivePlanName,
      },
      {
        label: "Grantee",
        value: () => (
          <span className="text-[#0049FF]">
            {shortAddress(grantInfo?.granteeEthAddress)}
          </span>
        ),
      },
    ];

    return signStatus === "pending" ? pendingConf : doneConf;
  }, [grantInfo, tipInfo, signStatus, grantId]);

  const vestingConf = useMemo(() => {
    return [
      {
        label: "Vesting Start Date",
        value: scheduleInfo?.grantStartDate,
      },
      {
        label: "Vesting Type",
        value: grantInfo.grantType === 1 ? "Duration" : "Milestone",
      },
      {
        label: "Length",
        value: `${grantInfo.vestingTotalLength} ${
          periodMap[grantInfo.vestingTotalPeriod]
        }`,
      },
      {
        label: "Vesting Frequency",
        value: `${grantInfo.vestingFrequency}  ${
          periodMap[grantInfo.vestingPeriod]
        }`,
      },
      {
        label: "Cliff Duration",
        value:
          grantInfo.cliffTime !== 0
            ? `${grantInfo.cliffTime} ${periodMap[grantInfo.cliffPeriod]}`
            : null,
      },
      {
        label: "Cliff Amount",
        value: grantInfo.cliffAmount !== 0 ? `${grantInfo.cliffAmount}%` : null,
      },
      {
        label: "Vesting Times",
        value: scheduleInfo?.vestingSchedule?.vestingDetail?.length,
      },
    ];
  }, [scheduleInfo, grantInfo]);

  // console.log("periodMap", periodMap, grantInfo.vestingTotalPeriod);
  return (
    <main className="relative w-full pb-10 lg:pb-0 lg:pt-12">
      {signStatus === null && (
        <div className="flex justify-center">
          <Spin />
        </div>
      )}
      {signStatus === "notyet" && (
        <Banner
          img={signIcon}
          title="Signing"
          description="Please confirm and sign this grant"
          className="w-[640px] mx-auto mb-12"
        />
      )}
      {(signStatus === "done" || signStatus === "allDone") && (
        <div className="w-[600px] mx-auto mb-12">
          <h2 className="font-bold lg:text-cwh3 dark:text-white mb-2.5">
            Grant Detail
          </h2>
          <span className="py-px px-4 border border-[#69D0E5] rounded text-c5 text-colorful1">
            Effective
          </span>
        </div>
      )}

      <div
        className={clsx(
          "space-y-10 lg:w-[600px] mx-auto",
          (signStatus === "notyet" || signStatus === "allDone") &&
            "mb-[300px] lg:mb-[170px]",
          signStatus === "done" && " mb-[300px] lg:mb-[250px]"
        )}
      >
        {/* <Header title="Grant Detail" className="mb-0" /> */}

        {signStatus === "notyet" && <Card title="Grantee" list={granteeConf} />}
        {(signStatus === "done" || signStatus === "allDone") && (
          <VestedCard scheduleInfo={scheduleInfo} />
        )}

        <Card title="Grant" list={grantConf} />

        <Card title="Vesting" list={vestingConf}>
          <ConfigProviderV2
            conf={{
              components: {
                Table: {
                  colorBgContainer: "#000",
                  controlItemBgActive: "#000000",
                  colorPrimary: "#000",
                  colorBorderSecondary: "#000",
                },
              },
            }}
          >
            <VestingSchedule
              pagination={false}
              scroll={{ y: 275 }}
              dataList={scheduleInfo?.vestingSchedule?.vestingDetail || []}
            />
          </ConfigProviderV2>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:py-9 dark:bg-[#191919]">
        <Sign />
      </div>
    </main>
  );
}

export default GrantSign;
