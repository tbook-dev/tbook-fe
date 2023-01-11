import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Space,
  Form,
  Input,
  Select,
  InputNumber,
  Modal,
  Steps,
} from "antd";
import { useSelector } from "react-redux";
import {
  getGrantInfo,
  getGrantSignInfo,
  postGrantSignInfo,
  getTIPInfo,
  getGrantVestingScheduleInfo,
} from "@/api/incentive";
import { loadWeb3 } from "@/utils/web3";
import KV from "@/components/local/KV";
import Title from "@/components/local/Title";
import { useAsyncEffect } from "ahooks";
import { targetMap, grantType } from "@/utils/const";
import VestingSchedule from "./VestingSchedule";

function GrantSign() {
  const userStore = useSelector((state) => state.user);
  const { grantId } = useParams();
  const projectId = userStore?.projects?.[0]?.projectId;
  const userId = userStore?.user?.userId;
  const [signList, setSignList] = useState([]);
  const [grantInfo, setGrantInfo] = useState({});
  const [tipId, setTipId] = useState(null);
  const [tipInfo, setTipInfo] = useState({});
  const navigate = useNavigate();
  const [currentStep, setStep] = useState(0);

  const web3Ref = useRef();
  useEffect(() => {
    async function asyncloadWeb3() {
      const web3 = await loadWeb3();
      web3Ref.current = web3;
    }
    asyncloadWeb3();
  }, []);

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

  //   useAsyncEffect(async () => {
  //     const vestingSchedule = await getGrantVestingScheduleInfo(grantId)
  //     console.log('vestingSchedule', vestingSchedule)
  //   },[grantId])

  function handleSign(sign) {
    web3Ref?.current.eth.personal
      .sign(
        web3Ref.current.utils.fromUtf8(sign.signInfo),
        web3Ref?.current.currentProvider.selectedAddress
      )
      .then((s) => {
        return postGrantSignInfo(projectId, grantId, sign.grantSignId, s);
      })
      .then((r) => {
        alert(r.message);
        navigate(0);
      });
  }

  const Step1 = () => {
    return (
      <div className="text-[#1E293B] mb-[12px]">
        <h2 className="text-3xl	font-bold  mb-[18px]">Signing ...</h2>
        <div className="text-base">
          <p>1.请您完成签约。</p>
          <p>
            2.请复制如下链接后发送给被授予人并提醒被授予人签字（如您是被授予人请忽略）。
          </p>
          <p>3.管理员和被授予人完成签字后，本授予开始生效。</p>
        </div>
      </div>
    );
  };
  const Step2 = (props) => {
    return null;
  };
  const Step3 = (props) => {
    return null;
  };
  const steps = [
    {
      content: () => <Step1 />,
    },
    {
      content: () => <Step2 />,
    },
    {
      content: () => <Step3 />,
    },
  ];

  return (
    <main className="grid grid-cols-2 relative">
      <div className="pl-[45px] pt-[88px] pr-[65px]">
        <div className="w-[650px]">
          <section className="mb-[25px]">
            <Title title="Grantee Information" />
            <div className="grid grid-cols-2	gap-x-20">
              <KV label="Name" value={grantInfo.granteeName} />
              <KV label="Target Audience" value={targetMap[tipInfo.target]} />
              <KV label="Email Address" value={grantInfo.granteeEmail} />
              <KV
                label="Ethereum Address"
                value={grantInfo.granteeEthAddress}
              />
            </div>
          </section>
          <section className="mb-[25px]">
            <Title title="Grant Details" />
            <div className="grid grid-cols-2	gap-x-20">
              <KV label="Plan Name" value={tipInfo.incentivePlanName} />
              <KV label="Grant Type" value={targetMap[tipInfo.target]} />
              <KV
                label="Vesting by"
                value={
                  grantType.find((v) => v.value === grantInfo.grantType)?.name
                }
              />
              <KV
                label="Exercise Price"
                value={`${grantInfo.exercisePrice}USD`}
              />
            </div>
          </section>
          <section className="mb-[25px]">
            <div>
              <Title title="Vesting Schedule" />
            </div>
            <VestingSchedule dataList={[]} />
          </section>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-[440px] py-[160px]">
          <div className="">
            {React.createElement(steps[0].content)}
          </div>

          <div>
            {signList.map((sg) => {
              return (
                <div key={sg.grantSign.signId}>
                  <img width="50" src={sg.signer.avatar}></img>
                  <div>
                    <span>{sg.signer.name}</span>
                  </div>
                  <div>
                    <span>
                      Sign Status:{" "}
                      {sg.grantSign.signStatus == 2 ? "SIGNED" : "PENDING"}
                    </span>
                  </div>
                  <div>
                    {sg.grantSign.signStatus == 1 &&
                    sg.signer.userId == userId ? (
                      <button
                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
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
        </div>
      </div>
    </main>
  );
}

export default GrantSign;
