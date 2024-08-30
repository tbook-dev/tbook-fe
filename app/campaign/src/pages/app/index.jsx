import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import pointIcon from '@/images/icon/point-modal.svg';
import arrow3Icon from '@/images/icon/arrow3.svg';
import useUserInfo from '@/hooks/useUserInfoQuery';
import useCampaignQuery from '@/hooks/useCampaignQuery';
import RichMore from '@/components/textMore/rich';
import { Skeleton, Statistic } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoginModal, setShowWalletConnectModal } from '@/store/global';
import LazyImage from '@/components/lazyImage';
import { formatImpact } from '@tbook/utils/lib/conf';
import { formatStandard } from '@tbook/utils/lib/conf';
import ViewReward from './viewReward';
import { useLoaderData } from 'react-router-dom';
import usePageFooterTip from '@/hooks/usePageFooterTip';
import TMAShare from '@/components/TMAShare';
import Unavailable from './unavailable';
import ParticipantIcon from '@/images/icon/svgr/participant.svg?react';
import Timeline from '@/components/timeline';
import AppCountDown from './AppCountDown';
import GroupCard from './groupCard';

const prompt =
  'You may get the rewards once you have accomplished all tasks in the group!';
const defiTip =
  'On-chain tasks will take some time to track your transaction. After completing the tasks, you can retry to verify later.';

export default function () {
  const dispath = useDispatch();
  const { campaignId } = useParams();
  const { userLogined, isUsingWallet } = useUserInfo();
  const {
    data: page,
    isLoading,
    campaignNotStart,
    campaignEnd,
    campaignOngoing,
    campaignUnavailable,
    isDefi,
  } = useCampaignQuery(campaignId);

  const { projectUrl } = useLoaderData();
  const [viewIdx, setViewIdx] = useState(null);
  const [subIdx, setSubIdx] = useState(null);
  const [viewType, setViewType] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [searchParams] = useSearchParams();
  usePageFooterTip();
  const signIn = useCallback(() => {
    dispath(setLoginModal(true));
  }, []);

  const handleCancel = useCallback(() => {
    setViewModalOpen(false);
    setViewIdx(null);
    setSubIdx(null);
    setViewType(null);
  }, []);
  const viewModalData = useMemo(() => {
    if (viewIdx !== null && viewType !== null && subIdx !== null && page) {
      try {
        const group = page?.groups?.[viewIdx];
        let data = {};
        if (viewType === 'nft') {
          data = group.nftList[subIdx];
        } else {
          data = group.pointList[subIdx];
        }
        return { ...data, type: viewType };
      } catch (e) {
        console.log(e);
        return null;
      }
    } else {
      return null;
    }
  }, [viewIdx, subIdx, viewType, page]);
  const setViewModalDataCallbcak = useCallback(
    (idx, subIdx, type) => {
      if (userLogined) {
        setViewIdx(idx);
        setSubIdx(subIdx);
        setViewType(type);
        setViewModalOpen(true);
      } else {
        signIn();
      }
    },
    [userLogined]
  );

  const refBackLink = useMemo(() => {
    const refUnsafeUrl = searchParams && searchParams.get('ref');
    try {
      return new URL(decodeURIComponent(refUnsafeUrl)).href;
    } catch (error) {
      return null;
    }
  }, [searchParams]);

  if (campaignUnavailable) {
    return <Unavailable projectUrl={projectUrl} />;
  }
  return (
    <div className="space-y-2.5 lg:pt-5 lg:w-[1200px] mx-auto pb-16 lg:py-2  text-white font-sf">
      {refBackLink && (
        <a
          href={refBackLink}
          className="pl-4 lg:pl-0 flex items-center gap-x-1 text-sm font-semibold py-2.5 text-[#717374] group hover:text-white"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5.25H2.8725L7.065 1.0575L6 0L0 6L6 12L7.0575 10.9425L2.8725 6.75H12V5.25Z"
                className="fill-[#717374] group-hover:fill-white"
              />
            </svg>
          </div>
          Back
        </a>
      )}

      <section className="overflow-hidden mb-16 lg:flex lg:justify-between lg:gap-x-[80px]">
        <div className="relative w-full h-[172px] lg:w-[566px] lg:h-[275px] lg:flex-none lg:order-last object-cover object-center">
          <TMAShare data={[1, projectUrl, campaignId]} />

          <LazyImage
            src={page?.campaign?.picUrl}
            alt="main banner"
            className="w-full h-full object-cover object-center"
            fetchpriority="high"
          />
        </div>

        <div className="p-4 lg:p-0 lg:flex-auto flex flex-col justify-between">
          {isLoading ? (
            <Skeleton active />
          ) : (
            <>
              <div className="space-y-3 lg:space-y-8">
                <h2 className="text-2xl lg:text-4xl font-sf-bold">
                  {page?.campaign?.name}
                </h2>

                <div className="text-sm lg:text-base font-sf mb-5 lg:mb-8 text-white/60">
                  <RichMore value={page?.campaign?.description} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-x-1 text-sm font-sf">
                  <ParticipantIcon />
                  <span className="me-0.5">
                    {formatStandard(page?.participantNum)}
                  </span>
                  participant{page?.participantNum > 1 ? 's' : ''}
                </div>

                <AppCountDown
                  status={
                    campaignNotStart
                      ? 'notStart'
                      : campaignOngoing
                      ? 'ongoing'
                      : 'end'
                  }
                  value={
                    campaignNotStart
                      ? page?.campaign?.startAt
                      : campaignOngoing
                      ? page?.campaign?.endAt
                      : null
                  }
                />
              </div>
            </>
          )}
        </div>
      </section>

      {isLoading && (
        <div className="px-5 lg:px-0 rounded-lg lg:rounded-2xl py-3">
          <Skeleton />
        </div>
      )}
      {isDefi && (
        <div className="text-sm text-white/60 px-4 lg:px-0">{defiTip}</div>
      )}
      <section className="px-4 lg:px-0 space-y-2">
        <Timeline
          steps={page?.groups?.map((group, idx) => {
            return {
              name: group.name,
              children: (
                <GroupCard
                  index={idx}
                  group={group}
                  showVerify={campaignOngoing}
                  isDefi={isDefi}
                />
              ),
              isFinished: group.credentialList.every((c) => c.isVerified),
            };
          })}
        />
        {/* {page?.groups?.map((group, index) => {
          console.log({ group });
          return (
            <div
              key={index}
              className="rounded-lg flex flex-col lg:flex-row  lg:overflow-hidden lg:items-stretch"
            >
              <div className="lg:w-[634px] lg:bg-[#160b25] lg:px-8 lg:py-5 lg:flex lg:flex-col">
                <p className="hidden lg:block text-sm mb-4">{prompt}</p>
                <div className="space-y-4 mb-8">
                  {group.credentialList?.map((credential) => (
                    <Credential
                      credential={credential}
                      key={credential.credentialId}
                      showVerify={!(campaignNotStart || campaignEnd)}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:w-[566px] pb-4  lg:bg-[#1c0e2f] lg:px-8 lg:pb-0 lg:flex lg:flex-col lg:justify-center">
                <p className="text-xs mb-4 lg:hidden">{prompt}</p>
                <div className="space-y-4 lg:space-y-0 lg:divide-y lg:divide-[#281545]">
                  {group.nftList?.map((nft, idx) => {
                    return (
                      <div
                        key={nft.nftId}
                        className="p-5 rounded-lg bg-linear1 lg:bg-none lg:px-0 lg:py-8 flex lg:flex-row-reverse lg:gap-x-8 lg:rounded-none"
                      >
                        <div className="flex-auto flex flex-col justify-between">
                          <div>
                            <h2 className="text-sm lg:text-base text-[#A1A1A2]">
                              nft
                            </h2>
                            <h3 className="text-base lg:text-lg font-medium">
                              {nft.name}
                            </h3>
                          </div>
                          <button
                            className="flex items-center w-max text-sm font-medium"
                            onClick={() => {
                              if (isUsingWallet) {
                                setViewModalDataCallbcak(index, idx, 'nft');
                              } else {
                                dispath(setShowWalletConnectModal(true));
                              }
                            }}
                          >
                            <span className="text-color1">View Rewards</span>
                            <img src={arrow3Icon} alt="view reward" />
                          </button>
                        </div>
                        <img
                          src={nft.picUrl}
                          className="w-20 h-20 lg:w-[120px] lg:h-[120px] object-center rounded-lg flex-none"
                          alt="nft reward"
                        />
                      </div>
                    );
                  })}

                  {group.pointList?.map((point) => {
                    return (
                      <div
                        key={point.pointId}
                        className="p-5 rounded-lg  bg-linear1 lg:bg-none lg:px-0 lg:py-8 flex lg:flex-row-reverse lg:gap-x-8 lg:rounded-none"
                      >
                        <div className="flex-auto flex flex-col justify-between">
                          <div>
                            <h2 className="text-sm lg:text-base text-[#A1A1A2]">
                              points
                            </h2>
                            <h3 className="text-base lg:text-lg font-medium">
                              {formatImpact(point.number)}
                              <span className="ml-1">points</span>
                            </h3>
                          </div>
                          <button
                            className="flex items-center w-max text-sm font-medium"
                            onClick={() => {
                              if (isUsingWallet) {
                                setViewModalDataCallbcak(index, 0, 'point');
                              } else {
                                dispath(setShowWalletConnectModal(true));
                              }
                            }}
                          >
                            <span className="text-color1">View Rewards</span>
                            <img src={arrow3Icon} alt="view reward" />
                          </button>
                        </div>
                        <img
                          src={pointIcon}
                          className="w-20 h-20 lg:w-[120px] lg:h-[120px] object-center rounded-lg flex-none"
                          alt="point reward"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })} */}
      </section>

      {viewModalData && (
        <ViewReward
          data={viewModalData}
          open={viewModalOpen}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
