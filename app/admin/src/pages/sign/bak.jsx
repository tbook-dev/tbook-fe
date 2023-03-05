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
import { loadWeb3 } from "@/utils/web3";
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
import signIcon from "@tbook/share/images/incentive/sign.svg";
import ConfigProviderV2 from "@/theme/ConfigProviderV2";

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
    if (signList.length === 0) {
      return "pending";
    }
    return signList.filter((sg) => sg.grantSign.signStatus === 1).length !== 0
      ? "pending"
      : "others";
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
    return (
      <div className="lg:w-[600px] mx-auto">
        <div className=" lg:bg-white lg:-mx-[310px] lg:py-8 lg:rounded-t-lg lg:shadow-c10">
          <div className="lg:w-[600px] mx-auto">
            <div className="px-2 rounded-lg mb-2 lg:mb-4 lg:px-6 lg:py-2.5 shadow-c8">
              <a href={location.href} target="_blank">
                <Paragraph
                  copyable={{ text: location.href }}
                  className="flex justify-between py-3 lg:py-0"
                  style={{ marginBottom: 0 }}
                >
                  <span className="text-[#7CA2FF] underline decoration-[#7CA2FF]">
                    {location.href}
                  </span>
                </Paragraph>
              </a>
            </div>

            <div className="grid grid-cols-1 gap-y-2 lg:gap-y-4">
              {signList.map((sg, idx) => {
                return (
                  <div
                    key={idx}
                    className={clsx(
                      "flex justify-between items-center py-1 px-2 lg:pr-6 lg:pl-0 lg:h-14 rounded-md",
                      sg.signer.userId == userInfo.userId
                        ? "bg-[#ECF1FF]"
                        : "bg-[#f2f2f2]"
                    )}
                  >
                    <div className="flex items-center ">
                      <div className="w-6 h-6 bg-[#0049FF] lg:w-10 lg:h-10 lg:mx-4 mr-2 rounded-full flex justify-center items-center">
                        <img src={sg.signer.avatar} className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-[12px] leading-[16px] text-[#1C1B1F]">
                          {sg.signer.name}
                        </h3>

                        <p className="text-xxs leading-[15px] text-[#999] lg:text-[14px] lg:leading-[20px]">
                          {shortAddress(sg.signer.mainWallet)}
                        </p>
                      </div>
                    </div>

                    <div>
                      {sg.grantSign.signStatus === 1 &&
                      sg.signer.userId == userInfo.userId ? (
                        <Button
                          type="primary"
                          onClick={() => handleSign(sg.grantSign)}
                        >
                          Sign
                        </Button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
      {signStatus === "pending" ? (
        <Banner
          img={signIcon}
          title="Signing"
          description="Please confirm and sign this grant"
          className="w-[640px] mx-auto mb-12"
        />
      ) : (
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
          "pt-3 space-y-6 lg:w-[600px] mx-auto lg:pt-6 lg:mb-4",
          signStatus === "pending" && " mb-[300px] lg:mb-[440px]"
        )}
      >
        {/* <Header title="Grant Detail" className="mb-0" /> */}

        {signStatus === "pending" ? (
          <Card title="Grantee" list={granteeConf} />
        ) : (
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

      {signStatus === "pending" && (
        <div className="fixed bottom-0 left-0 right-0 rounded-t-lg lg:py-9 dark:bg-b-1">
          <Sign />
        </div>
      )}
    </main>
  );
}

export default GrantSign;
