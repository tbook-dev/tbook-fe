import { useResponsive } from "ahooks";
import { useState, useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { twLogin, getTwLoginUrl, verifyCredential } from "@/api/incentive";
import { useParams } from "react-router-dom";
import { credentialStatus, incentiveMethodList } from "@/utils/conf";
import nftIcon from "@/images/icon/nft.svg";
import pointIcon from "@/images/icon/point.svg";
import rewardIcon from "@/images/icon/reward.svg";
// import verifiedIcon from '@/images/icon/verified.svg'
import Modal from "@/components/modal";
import useUserInfo from "@/hooks/useUserInfoQuery";
import useProjectQuery from "@/hooks/useProjectQuery";
import useCampaignQuery from "@/hooks/useCampaignQuery";
import TextMore from "@/components/textMore";
import { Spin, Statistic } from "antd";
import endCampaign from "@/images/end-campaign.png";
import { message } from "antd";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useWalletClient, useSignMessage } from "wagmi";
import useSignIn from "@/hooks/useSignIn";
import WithVerify from "@/components/withVerify";
import { getNonce } from "@/utils/web3";
import { host, verifyTbook } from "@/api/incentive";
import { getCrenditialType } from "@/utils/conf";
import RewardClaim from "./rewardClaim";
import dateIcon from "@/images/icon/date.svg";

const { Countdown } = Statistic;
const notStartList = [2, 0];
const endList = [3, 4, 5];
const endText = "The campaign has expired.";
const errorMsg = (
  <>
    Please click the link and finish the task first.
    <br /> If you have fulfilled the requirement, please try again in 30s.
  </>
);

const tgBotId = import.meta.env.VITE_TG_BOT_ID
const tgCallbackHost = import.meta.env.VITE_TG_CALLBACK_HOST
const tgCallbackUrl = `https://oauth.telegram.org/auth?bot_id=${tgBotId}&origin=https%3A%2F%2F${tgCallbackHost}&return_to=https%3A%2F%2F${tgCallbackHost}%2Ftg_callback.html`

const curHost = new URL(window.location.href).host;
const dcCallbackUrl = `https://discord.com/api/oauth2/authorize?client_id=1146414186566537288&redirect_uri=https%3A%2F%2F${curHost}%2Fdc_callback&response_type=code&scope=identify%20guilds%20guilds.members.read`;

export default function () {
  const [messageApi, contextHolder] = message.useMessage();
  const { pc } = useResponsive();
  const { open } = useWeb3Modal();
  const { handleSignIn } = useSignIn();
  const { campaignId } = useParams();
  const queryClient = useQueryClient();
  const { data: page, firstLoad } = useCampaignQuery(campaignId);
  const { data: project } = useProjectQuery(page?.campaign?.projectId);
  const { twitterConnected, userLogined, discordConnected, telegramConnected } =
    useUserInfo();
  const [rewardModalIdx, setRewardModalIdx] = useState(-1);
  const { signMessageAsync } = useSignMessage();
  const twLinkRef = useRef(null);
  const [twLink, setTwLink] = useState("");

  const [nonce, setNonce] = useState("");

  const { data: walletClient, isError, isLoading } = useWalletClient();

  const { address, isConnected, isDisconnected } = useAccount();

  const [rawDatas, setRawDatas] = useState({});
  const [signed, setSigned] = useState({});

  useEffect(() => {
    if (isConnected) {
      getNonce(address).then((r) => {
        setNonce(() => r);
      });
    }
  }, [isConnected, address]);

  const twLoginCurrent = async () => {
    const res = await getTwLoginUrl();
    localStorage.setItem("redirect_url", location.href);
    setTwLink(() => res["url"]);
  };
  const discardLogin = async () => {};

  useEffect(() => {
    if (twLink) {
      twLinkRef.current.click();
    }
  }, [twLink]);

  const signIn = async () => {
    const sign = await signMessageAsync({ message: nonce });
    const d = new URLSearchParams();
    d.append("address", address);
    d.append("sign", sign);
    const response = await fetch(`${host}/authenticate`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: d,
    });
    console.log("status:", response.status);
    response.text().then((b) => console.log("body", b));
    response.headers.forEach((value, key) => {
      console.log(key, value);
    });
    console.log(document.cookie);
    await queryClient.refetchQueries("userInfo");
  };

  const handleCancel = useCallback(() => {
    setRewardModalIdx(-1);
  }, []);
  const handleVerify = useCallback(async (redential) => {
    try {
      const res = await verifyCredential(redential.credentialId);
      if (res.isVerified) {
        await queryClient.refetchQueries(["campaignDetail", campaignId]);
      } else {
        messageApi.error(errorMsg);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const gs = page?.groups;
    if (gs && gs.length > 0) {
      const signs = gs
        .flatMap((g) => g.credentialList)
        .filter((c) => c.labelType == 10);
      signs.forEach((c) => {
        fetch(`${host}/campaignSign/${c.credentialId}`, {
          method: "GET",
          credentials: "include",
        })
          .then((r) => r.json())
          .then((d) => {
            if (d["code"] == 0) {
              setRawDatas(() => {
                const nd = {};
                nd[c.credentialId] = d["data"];
                return { ...rawDatas, ...nd };
              });
            } else {
              setSigned(() => {
                return { ...signed, [c.credentialId]: true };
              });
            }
          });
      });
    }
  }, [page]);

  if (!firstLoad) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spin spinning />
      </div>
    );
  }
  const campaignNotStart = notStartList.includes(page?.campaign?.status);
  const campaignEnd = endList.includes(page?.campaign?.status);

  const signCredential = async (credential) => {
    if (signed[credential.credentialId]) {
      messageApi.warning("Already signed, verify please");
      return;
    }
    const m = rawDatas[credential.credentialId];
    const sign = await signMessageAsync({ message: m });
    const d = new URLSearchParams();
    d.append("sign", sign);
    fetch(`${host}/campaignSign/${credential.credentialId}/verify`, {
      method: "POST",
      "content-type": "application/x-www-form-urlencoded",
      body: d,
      credentials: "include",
    })
      .then((r) => r.json())
      .then((d) => {
        if (!d["success"]) {
          alert(d["error"]);
        }
      });
  };

  return (
    <div className="space-y-2.5 px-2.5 lg:px-0 lg:w-[880px] mx-auto pb-16 lg:py-2  text-t-1">
      <section className="rounded-lg overflow-hidden bg-white lg:rounded-2xl">
        <img
          src={page?.campaign?.picUrl}
          className="w-full  h-[172px] lg:h-[294px] object-cover object-center"
        />

        <div className="p-2.5">
          <div className="mb-3">
            <h2 className="text-2xl  leading-7 font-bold text-[#131517] mb-1.5 truncate">
              {page?.campaign?.name}
            </h2>
            <h4 className="flex items-center gap-x-1.5">
              <img
                src={project?.avatarUrl}
                className="w-6 h-6 object-contain mr-2 rounded-full"
              />
              <span className="text-[#131517] text-sm font-normal">
                {project?.projectName}
              </span>
            </h4>
          </div>

          <div className="text-sm font-normal text-c-6 mb-6">
            <TextMore text={page?.campaign?.description} />
          </div>

          <div className="flex items-center gap-x-2">
            <img
              src={dateIcon}
              className="w-6 h-6 object-contain object-center"
            />
            <div className="flex items-center gap-x-1">
              <div className="text-sm text-[#68696B]">End in</div>
              <Countdown
                value={page?.campaign?.endAt}
                format='D[d] H[h] m[m] s[s]'
                valueStyle={{
                  color: "#131517",
                  fontSize: "14px",
                  lineHeight: "20px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {campaignEnd ? (
        <div className="flex justify-center items-center">
          <div className="pt-14">
            <img src={endCampaign} className="w-[150px] mx-auto mb-2" />
            <p className="text-c-9 text-base">{endText}</p>
          </div>
        </div>
      ) : (
        <section className="space-y-2.5 lg:space-y-5 tetx-t-1">
          {page?.groups?.map((group, index) => {
            return (
              <div
                key={index}
                className="rounded-lg lg:rounded-2xl flex flex-col bg-white"
              >
                <h3 className="text-base text-[#131517] lg:text-[20px] font-medium px-5 py-3 border-b border-[rgb(236,236,236)]">
                  Tasks and Rewards
                </h3>
                <div className="px-5 py-3">
                  {group.credentialList?.map((redential, index) => {
                    const credentialType = getCrenditialType(
                      redential.labelType
                    );
                    const sysConnectedMap = {
                      twitter: twitterConnected,
                      discord: discordConnected,
                      telegram: telegramConnected,
                      tbook: true,
                    };
                    const sycLoginFnMap = {
                      twitter: twLoginCurrent,
                      discord: () => {
                        localStorage.setItem("redirect_url", location.href);
                        location.href = dcCallbackUrl;
                      },
                      telegram: () => {
                        localStorage.setItem("redirect_url", location.href);
                        location.href = tgCallbackUrl;
                      },
                    };
                    const taskMap = {
                      8: async () => {
                        await verifyTbook(redential.credentialId);
                        await handleVerify(redential);
                      },
                      10: () => signCredential(redential),
                    };

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between h-10 w-full"
                      >
                        <div className="flex items-center gap-x-1 flex-auto w-[calc(100%_-_45px)]">
                          <img
                            src={redential.picUrl}
                            className="w-5 h-5 object-contain"
                          />
                          <div
                            onClick={
                              typeof taskMap[redential.labelType] === "function"
                                ? userLogined
                                  ? taskMap[redential.labelType]
                                  : signIn
                                : null
                            }
                            className="truncate text-sm text-[#131517] max-w-[calc(100%_-_30px)]"
                            dangerouslySetInnerHTML={{
                              __html: redential.displayExp,
                            }}
                          />
                        </div>
                        {campaignNotStart ? null : redential.isVerified ? (
                          <span className="text-base whitespace-nowrap text-c-9">
                            Verified
                          </span>
                        ) : (
                          <WithVerify
                            className="text-base text-blue-1 whitespace-nowrap"
                            handleFn={
                              isConnected
                                ? userLogined
                                  ? sysConnectedMap[credentialType]
                                    ? () => handleVerify(redential)
                                    : sycLoginFnMap[credentialType]
                                  : signIn
                                : open
                            }
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="h-px bg-[rgb(236,236,236)] mx-5 mb-4" />
                <div className="px-5 pb-4">
                  <img
                    src={rewardIcon}
                    className="w-[64px] h-[64px] object-center object-contain mb-2"
                  />
                  <p className="text-xs text-[#131517] mb-6">
                    You may get following rewards once you have accomplished all
                    tasks in the group!
                  </p>
                  <div className="space-y-6 mb-6">
                    {group.nftList?.map((nft) => {
                      const incentiveMethodItem =
                        incentiveMethodList.find(
                          (v) => v.value === nft.methodType
                        ) || incentiveMethodList[0];

                      return (
                        <div key={nft.nftId}>
                          <div className="flex items-center gap-x-0.5 mb-2">
                            <img src={nftIcon} className="w-4 h-4" />
                            <span className="text-[#131517] text-sm">nft</span>
                          </div>
                          <div className="flex mb-2.5">
                            <div className="flex flex-col gap-y-1.5 text-[#717374] text-sm flex-auto">
                              <p>{nft.name}</p>
                              <div className="flex items-center gap-x-0.5 lowercase">
                                <img
                                  src={incentiveMethodItem?.icon}
                                  className="w-3 h-4"
                                />
                                {incentiveMethodItem?.title}
                              </div>
                            </div>
                            <div className="w-12 h-12 rounded">
                              <img
                                src={nft.coverUrl}
                                className="w-full h-full"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {group.pointList?.map((point) => {
                      const incentiveMethodItem =
                        incentiveMethodList.find(
                          (v) => v.value === point.methodType
                        ) || incentiveMethodList[0];
                      return (
                        <div key={point.pointId}>
                          <div className="flex items-center gap-x-0.5 mb-2">
                            <img src={pointIcon} className="w-4 h-4" />
                            <span className="text-[#131517] text-sm">point</span>
                          </div>
                          <div className="flex flex-col gap-y-1.5 text-[#717374] text-sm">
                            <p>{point.number} points</p>
                            <div className="flex items-center gap-x-0.5 lowercase">
                              <img
                                src={incentiveMethodItem?.icon}
                                className="w-3 h-4"
                              />
                              {incentiveMethodItem?.title}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-x-2.5 text-sm">
                    <div
                      className="text-blue-1 bg-[#f5f8fd] px-2.5 py-1 cursor-pointer rounded"
                      onClick={() => {
                        setRewardModalIdx(index);
                      }}
                    >
                      View Rewards
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      <Modal open={rewardModalIdx >= 0} onCancel={handleCancel}>
        <img
          src={rewardIcon}
          className="w-[88px] h-[88px] absolute left-1/2 -translate-x-1/2 top-[-50px] z-10"
        />
        {rewardModalIdx >= 0 && (
          <div className="text-t-1 -mx-2 max-h-[345px] overflow-y-scroll">
            <h2 className="text-base lg:text-4xl mb-1.5 font-medium text-[#131517]">Rewards</h2>
            <p className="text-xs text-[#131517] mb-8">
              You may get following rewards once you have accomplished all tasks
              in the group!
            </p>
            <div className="text-base">
              <RewardClaim group={page?.groups?.[rewardModalIdx]} />
            </div>
          </div>
        )}
      </Modal>
      {contextHolder}
      <a
        href={twLink}
        ref={twLinkRef}
        mc-deep-link="false"
        style={{ visibility: "hidden" }}
      ></a>
    </div>
  );
}
