import { useState } from 'react';
import Credential from './credential';
import { cn, credentialStatus, getRewardGroupName } from '@/utils/conf';
import { motion } from 'framer-motion';
import GiftIcon from '@/images/icon/svgr/gift.svg?react';
import GiftOpen from '@/images/icon/svgr/gift-open.svg?react';
import ArrowIcon from '@/images/icon/svgr/arrow3.svg?react';
import TonSocietyIcon from '@/images/icon/svgr/ton-society.svg?react';
import Button from '@/pages/ton-wise/components/button';
import ViewReward from './viewReward';
import RewardSwiper from './rewardSwiper';
import RewardLabels from './rewardLabels';
import { getCampaignStatus } from '@/hooks/useCampaignQuery';
import { useResponsive } from 'ahooks';
import CheckIcon from '@/images/icon/svgr/checked3.svg?react';

const getSchema = (isGroupVerified, rewardList) => {
  const isIssued = rewardList.some((reward) => reward.claimedType > 2);
  const status = isGroupVerified
    ? isIssued
      ? 'claim'
      : 'eligible'
    : 'unverified';
  // 已经完成，全部领取，没有全部领取
  // 没有完成
  const schema = {
    eligible: {
      color: '#F4E357',
    }, // 可以领取奖励，但是还没有领取
    unverified: {
      color: '#D8FAFF',
    }, //还不能领取奖励，没有全部完成
    claim: {
      color: '#ABEDBB',
    }, // 领取了奖励,不管结果是什么，missed,pending,
  };
  return {
    status,
    color: schema[status].color,
    title: rewardList
      .map((reward) => {
        const t = credentialStatus.find((c) => reward.claimedType === c.value);
        return t.group(getRewardGroupName(reward), reward.dispaly);
      })
      .join(','),
  };
};
const Arraw = ({ onClick, className }) => (
  <button onClick={onClick}>
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.75146 17L14.0744 12.4609L18.3973 17"
        stroke="#12172F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const GroupCard = ({ group, showVerify, endAt, status }) => {
  const { pc } = useResponsive();
  const { campaignNotStart, campaignEnd, campaignOngoing } =
    getCampaignStatus(status);
  const verifyCnt =
    group.credentialList?.filter((c) => c.isVerified === 1).length ?? 0;
  const totalCnt = group.credentialList?.length ?? 1;
  const isGroupVerified = verifyCnt === totalCnt;
  const [showCredential, setShowCredential] = useState(false);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const rewardList = [
    ...group.nftList.map((v) => ({
      ...v,
      id: v.nftId,
      type: 'nft',
      dispaly: 'NFT',
    })),
    ...group.sbtList.map((v) => ({
      ...v,
      id: v.sbtId,
      type: 'sbt',
      dispaly: 'SBT',
    })),
    ...group.pointList.map((v) => ({
      ...v,
      id: v.pointId,
      type: 'point',
      dispaly: '',
    })),
  ];
  const {
    color,
    title,
    status: groupsStatus,
  } = getSchema(isGroupVerified, rewardList);
  const reward = rewardList[displayIdx];
  const hasSbt = rewardList.some((v) => v.type === 'sbt');
  const [expand, setExpand] = useState(group.expand);
  
  return (
    <>
      <div
        className={cn(
          'rounded-2xl overflow-hidden relative shadow-xl lg:flex lg:items-stretch lg:justify-between'
        )}
        style={{ backgroundColor: color }}
      >
        <div
          className={cn(
            'relative p-4 rounded-2xl lg:w-[420px] lg:space-y-5',
            'text-[#12172F]'
          )}
        >
          <div className="flex items-center justify-between gap-x-3 lg:items-start">
            <div
              className={cn(
                'flex items-center justify-between gap-x-1 text-left flex-auto',
                'text-[#12172F]'
              )}
            >
              <div className="space-y-0.5 flex-auto">
                <p className="text-xs">
                  {title ?? 'Complete Tasks'}{' '}
                  {groupsStatus === 'claim' && (
                    <CheckIcon className="size-2.5 inline ml-0.5" />
                  )}
                </p>
                <div
                  className={cn('bg-black/10', 'h-2 relative rounded-l-full')}
                >
                  <motion.div
                    className={cn(
                      'h-2 absolute inset-y-0 left-0  rounded-l-full',
                      'bg-[#12172F]'
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${(verifyCnt * 100) / totalCnt}%` }}
                  />
                </div>
              </div>

              {isGroupVerified ? (
                <RewardSwiper
                  className="flex-none translate-y-1"
                  displayIdx={displayIdx}
                  setDisplayIdx={setDisplayIdx}
                  rewardList={rewardList}
                  size="small"
                />
              ) : (
                <GiftIcon className="size-7 translate-y-1" fill={'#12172F'} />
              )}
            </div>
            {pc ? null : (
              <Arraw
                onClick={() => setExpand(v=>!v)}
                className={expand ? '' : 'rotate-180'}
              />
            )}
          </div>
          <div className="rounded-xl p-3 bg-[#12162F]/15 lg:flex gap-x-5 justify-start w-max hidden">
            <RewardSwiper
              size="default"
              displayIdx={displayIdx}
              setDisplayIdx={setDisplayIdx}
              rewardList={rewardList}
            />
            <RewardLabels
              reward={reward}
              endAt={endAt}
              campaignNotStart={campaignNotStart}
              campaignEnd={campaignEnd}
              campaignOngoing={campaignOngoing}
            />
          </div>
        </div>

        <div
          className={cn(
            'w-full p-4 lg:w-[720px]  rounded-2xl bg-gradient-to-b from-black/65 to-black/85 backdrop-blur-2xl flex flex-col justify-between gap-y-2',
            pc ? '' : expand ? '' : 'hidden'
          )}
        >
          {isGroupVerified ? (
            <>
              <div className="space-y-2.5">
                <button
                  className="flex items-center gap-x-2"
                  onClick={() => {
                    setShowCredential((v) => !v);
                  }}
                >
                  <ArrowIcon className={cn(showCredential && 'rotate-90')} />
                  <p className="text-sm font-medium">
                    {totalCnt} Credentials Verified
                  </p>
                </button>
                {showCredential && (
                  <div className="space-y-2 text-left">
                    {group.credentialList?.map((credential) => (
                      <Credential
                        credential={credential}
                        key={credential.credentialId}
                        showVerify={showVerify}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-center lg:justify-end">
                <Button
                  onClick={() => {
                    setViewModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-x-1 h-10 w-full lg:w-max"
                >
                  {hasSbt ? (
                    <>
                      Mint SBT on <TonSocietyIcon />
                    </>
                  ) : (
                    'Claim Rewards'
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              {group.credentialList?.map((credential) => (
                <Credential
                  credential={credential}
                  key={credential.credentialId}
                  showVerify={showVerify}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <ViewReward
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
        }}
        rewardList={rewardList}
        reward={reward}
        campaignId={group.campaignId}
      />
    </>
  );
};

export default GroupCard;
