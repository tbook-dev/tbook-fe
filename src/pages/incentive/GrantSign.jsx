import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { LeftCircleOutlined } from '@ant-design/icons'
import {
  getGrantInfo,
  getGrantSignInfo,
  postGrantSignInfo,
  getTIPInfo,
  getGrantVestingScheduleInfo,
} from "@/api/incentive";
import { loadWeb3 } from "@/utils/web3";
import KV from "@/components/local/KV2";
import Title from "@/components/local/Title2";
import { useAsyncEffect } from "ahooks";
import { targetMap, formatDollar, periodMap } from "@/utils/const";
import VestingSchedule from "./VestingSchedule";
import Done from "@/components/icon/Done";
import Loading from "@/components/icon/Loading";
import Eth from "@/components/local/Eth";
import Layout from "./LayoutV2";
import aircraft from "@/images/tbook/aircraft.png";
import { useSelector } from "react-redux";

const { Paragraph } = Typography;

function GrantSign() {
  const { grantId } = useParams();
  const [signList, setSignList] = useState([]);
  const [grantInfo, setGrantInfo] = useState({});
  const [tipId, setTipId] = useState(null);
  const [tipInfo, setTipInfo] = useState({});
  const navigate = useNavigate();
  const [scheduleInfo, setSchedule] = useState({});
  const userInfo = useSelector((state) => state.user.user);
  const projects = useSelector((state) => state.user.projects);
  console.log("scheduleInfo", scheduleInfo);

  // 签名状态
  useAsyncEffect(async () => {
    const list = await getGrantSignInfo(null, grantId);
    setSignList(list);
  }, [grantId]);

  // 获取grant信息
  useAsyncEffect(async () => {
    const info = await getGrantInfo(grantId);
    setGrantInfo(info);
    setTipId(info.incentivePlanId);
  }, [grantId]);

  // 获取tip信息
  useAsyncEffect(async () => {
    if (!tipId) return;
    const tipInfo = await getTIPInfo(tipId);
    setTipInfo(tipInfo);
  }, [tipId]);

  // vesting schedule信息

  useAsyncEffect(async () => {
    const vestingSchedule = await getGrantVestingScheduleInfo(grantId);
    // console.log("vestingSchedule->", vestingSchedule);
    setSchedule(vestingSchedule || {});
  }, [grantId]);

  async function handleSign(sign) {
    const web3 = await loadWeb3();
    web3?.eth.personal
      .sign(
        web3.utils.fromUtf8(sign.signInfo),
        web3.currentProvider.selectedAddress
      )
      .then((s) => {
        return postGrantSignInfo(null, grantId, sign.grantSignId, s);
      })
      .then((r) => {
        let link = "/incentive";
        const granteeProjects = projects.filter((v) => v.currentUserRole === 4);
        if (granteeProjects.length === projects.length) {
          // 只有grantee角色
          link = `/my-grants`;
        }
        navigate(link);
      });
  }

  const Tip = () => {
    return (
      <div className="text-[#1E293B] mb-[12px]">
        <h2 className="text-3xl	font-bold  mb-[18px]">Signing ...</h2>
        <div className="mb-3 text-base">
          <p>1.Please sign to complete the contract.</p>
          <p>
            2.Please copy the following link and send it to the grantee and remind the grantee to sign (if you are the grantee, please ignore it).
          </p>
          <p>3.After the administrator and the grantee complete the signature, this grant will come into effect.</p>
        </div>
        <div className="px-[18px] py-[2px] border mb-7">
          <a href={location.href} target="_blank">
            <Paragraph copyable className="flex justify-between my-4 underline">
              {location.href}
            </Paragraph>
          </a>
        </div>
      </div>
    );
  };

  const SignSucess = () => {
    return (
      <div className="flex flex-col items-center">
        <Done size="large" />
        <div className="text-3xl font-bold text-[#1E293B] pt-6 pb-8">
          Grant Effective! 🙌
        </div>
        <Link to="/">
          <button className="text-white bg-indigo-500 px-11 btn hover:bg-indigo-600 mb-11">
            View Details -{">"}
          </button>
        </Link>
      </div>
    );
  };
  // console.log("periodMap", periodMap, grantInfo.vestingTotalPeriod);
  return (
    <Layout>
      <main className="relative grid flex-auto grid-cols-2">
        <img
          width="218"
          height="224"
          src={aircraft}
          className="absolute left-1/2 translate-x-[-50%] top-1/4"
        />

        <div className="px-4 py-8 sm:px-6 lg:px-16 lg:pr-8 xl:pr-16">
          <section className="mb-8 mt-7">
            <Title title="Grantee Information" />
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              <KV label="Name" value={grantInfo.granteeName} />
              <KV label="Target Audience" value={targetMap[tipInfo.target]} />
              <KV label="Email Address" value={grantInfo.granteeEmail} />
              <KV
                label="Ethereum Address"
                value={grantInfo.granteeEthAddress}
              />
            </div>
          </section>
          <section className="mb-8">
            <Title title="Grant Details" />
            <div className="grid grid-cols-2 gap-x-12 gap-y-3">
              <KV label="Plan Name" value={tipInfo.incentivePlanName} />
              <KV label="Grant Type" value="token option" />
              <KV
                label="Total Amount"
                value={formatDollar(grantInfo?.grantNum)+" Token"}
              />
              <KV
                label="Exercise Price"
                value={`${formatDollar(grantInfo.exercisePrice)} USD`}
              />
            </div>
          </section>
          <section className="mb-8">
            <div className="mb-4">
              <Title title="Vesting Schedule" />
              <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                <KV
                  label="Vesting Start Date"
                  value={scheduleInfo.grantStartDate}
                />
                <KV
                  label="Vesting by"
                  value={grantInfo.grantType === 1 ? "Duration" : "Milestone"}
                />
                <KV
                  label="Length"
                  value={`${grantInfo.vestingTotalLength} ${
                    periodMap[grantInfo.vestingTotalPeriod]
                  }`}
                />
                <KV
                  label="Vesting Frequency"
                  value={`${grantInfo.vestingFrequency}  ${
                    periodMap[grantInfo.vestingPeriod]
                  }`}
                />

                {grantInfo.cliffTime !== 0 && (
                  <KV label="Cliff Duration" value={`${grantInfo.cliffTime} ${periodMap[grantInfo.cliffPeriod]}`} />
                )}
                {grantInfo.cliffAmount !== 0  && (
                  <KV
                    label="Cliff Amount"
                    value={`${grantInfo.cliffAmount}%`}
                  />
                )}

                <KV
                  label="Vesting Times"
                  value={scheduleInfo?.vestingSchedule?.vestingDetail?.length}
                />
              </div>
            </div>
            <VestingSchedule
              pagination={{defaultPageSize: 5}}
              dataList={scheduleInfo?.vestingSchedule?.vestingDetail || []}
            />
          </section>
        </div>

        <div className="flex items-center justify-center min-h-full bg-white">
          <div className="w-[440px]">
            <div className="">
              {signList.filter((item) => item.signStatus === 2).length === 2 ? (
                <SignSucess />
              ) : (
                <Tip />
              )}
            </div>

            <div className="flex justify-around mb-12">
              {signList.map((sg, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex items-center justify-center w-16 h-16 border-2 border-[#F1F5F9] rounded-full">
                      <img width="38" height="38" src={sg.signer.avatar}></img>
                    </div>

                    <div className="text-lg font-semibold text-[#1E293B] mb-2">
                      <p>{sg.signer.name}</p>
                      <Eth style={{ width: 115 }}>{sg.signer.mainWallet}</Eth>
                    </div>
                    <div>
                      {sg.grantSign.signStatus === 2 ? <Done /> : <Loading />}
                    </div>

                    <div className="mt-8">
                      {sg.grantSign.signStatus === 1 &&
                      sg.signer.userId == userInfo.userId ? (
                        <button
                          className="text-white bg-indigo-500 btn hover:bg-indigo-600"
                          onClick={() => handleSign(sg.grantSign)}
                        >
                          Sign
                        </button>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <Link to="/incentive" className="text-[#497EED] text-sm">
            <LeftCircleOutlined className="mr-2"/>Back to Incentive List
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default GrantSign;
