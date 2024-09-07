import { memo, useState, useRef, useEffect } from 'react';
import Credential from './credential';
import { cn } from '@/utils/conf';
import { motion } from 'framer-motion';
import GiftIcon from '@/images/icon/svgr/gift.svg?react';
import ArrowIcon from '@/images/icon/svgr/arrow3.svg?react';
import TonSocietyIcon from '@/images/icon/svgr/ton-society.svg?react';
import Button from '@/pages/ton-wise/components/button';
import { useParams } from 'react-router-dom';
import useCampaignQuery from '@/hooks/useCampaignQuery';
import ViewReward from './viewReward';
import RewardSwiper from './rewardSwiper';
import RewardLabels from './rewardLabels';
import { useSearchParams } from 'react-router-dom';

const defiLableTypes = [14, 15, 16, 17, 18, 19, 20];

const getSchema = (labelTypes = [], index) => {
  const defiColorsMap = {
    14: ['bg-[#DBFAFF]', true, 'Tonstakers'],
    15: [
      'bg-gradient-to-b lg:bg-gradient-to-r from-[#A434E9] via-[#3D95EA] via-40% to-[#3D95EA]/60',
      true,
      'Bemo',
    ],
    16: [
      'bg-gradient-to-b lg:bg-gradient-to-r from-[#6C31F0] via-[#4300D5] via-30% to-[#4300D5]',
      false,
      'EVAA',
    ],
    17: [
      'bg-gradient-to-b  lg:bg-gradient-to-r from-[#0fd9b4] via-[#0082f9] via-30% to-[#0082f9]',
      false,
      'STON.fi',
    ],
    21: [
      'bg-gradient-to-b  lg:bg-gradient-to-r from-[#0fd9b4] via-[#0082f9] via-30% to-[#0082f9]',
      false,
      'STON.fi',
    ],
    18: [
      'bg-gradient-to-b  lg:bg-gradient-to-r from-[#ffdb2e] via-[#cc7401] via-30% to-[#cc7401]',
      true,
      'DeDust',
    ],
    19: [
      'bg-gradient-to-b  lg:bg-gradient-to-r from-[#ffe11b] via-[#f09f0c] via-30% to-[#f09f0c]',
      true,
      'Storm Trade',
    ],
    20: [
      'bg-gradient-to-b  lg:bg-gradient-to-r from-[#ffe11b] via-[#f09f0c] via-30% to-[#f09f0c]',
      true,
      'Storm Trade',
    ],
  };
  const normalMap = {
    0: ['bg-[#E5AB8A]', true, ''],
    1: ['bg-[#C0AFD0]', true, ''],
  };
  const defiTypes = labelTypes.filter((v) => defiLableTypes.includes(v));
  const renderType = defiTypes.length > 0 ? defiTypes[0] : index % 2;
  const conf = defiColorsMap[renderType] ?? normalMap[renderType];
  return {
    bg: conf[0],
    isDark: conf[1],
    title: conf[2],
    renderType,
  };
};

const GroupCard = ({ group, index, showVerify }) => {
  const { campaignId } = useParams();
  const ctxRef = useRef();
  const [searchParams] = useSearchParams();

  const {
    data: page,
    campaignNotStart,
    campaignEnd,
    campaignOngoing,
  } = useCampaignQuery(campaignId);
  const { bg, isDark, title, renderType } = getSchema(
    group.credentialList?.map((c) => c.labelType),
    index
  );
  const verifyCnt =
    group.credentialList?.filter((c) => c.isVerified === 1).length ?? 0;
  const totalCnt = group.credentialList?.length ?? 1;
  const isGroupVerified = verifyCnt === totalCnt;
  const [showCredential, setShowCredential] = useState(false);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const rewardList = [
    ...group.nftList.map((v) => ({ ...v, id: v.nftId, type: 'nft' })),
    ...group.sbtList.map((v) => ({ ...v, id: v.sbtId, type: 'sbt' })),
    ...group.pointList.map((v) => ({ ...v, id: v.pointId, type: 'point' })),
  ];
  const reward = rewardList[displayIdx];
  const hasSbt = rewardList.some((v) => v.type === 'sbt');

  useEffect(() => {
    if (searchParams.get('renderLabel') == renderType) {
      ctxRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  return (
    <>
      <div
        ref={ctxRef}
        className={cn(
          'rounded-2xl overflow-hidden relative shadow-xl lg:flex lg:items-stretch lg:justify-between',
          bg
        )}
      >
        <div
          className={cn(
            'relative p-4 rounded-2xl lg:w-[420px] lg:space-y-5',
            isDark ? 'text-[#12172F]' : 'text-white'
          )}
        >
          <div className="flex items-center justify-between gap-x-3 lg:items-start">
            <div
              className={cn(
                'flex-auto h-20',
                'flex flex-col justify-between',
                isDark ? 'text-[#12172F]' : 'text-white'
              )}
            >
              <p className={cn('text-base font-sf-bold font-bold')}>
                {title ? `Complete Tasks On ${title}` : 'Complete Tasks'}
              </p>
              <div className={cn('text-xs space-y-0.5 w-full')}>
                <div>
                  {verifyCnt}/{totalCnt}
                </div>
                <div
                  className={cn(
                    isDark ? 'bg-[#12172F]/10' : 'bg-white/10',
                    'h-2 relative calc(100%_-_40px) rounded-full'
                  )}
                >
                  <motion.div
                    className={cn(
                      'h-2 absolute inset-y-0 left-0  rounded-full',
                      isDark ? 'bg-[#12172F]' : 'bg-white'
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${(verifyCnt * 100) / totalCnt}%` }}
                  />
                  <GiftIcon
                    className="absolute -right-1 -bottom-2"
                    fill={isDark ? '#12172F' : '#fff'}
                  />
                </div>
              </div>
            </div>
            <div className="size-20 flex-none lg:hidden">
              <RewardSwiper
                displayIdx={displayIdx}
                setDisplayIdx={setDisplayIdx}
                rewardList={rewardList}
              />
            </div>
          </div>
          <div className="rounded-xl p-3 bg-[#12162F]/15 lg:flex gap-x-5 justify-start w-max hidden">
            <RewardSwiper
              displayIdx={displayIdx}
              setDisplayIdx={setDisplayIdx}
              rewardList={rewardList}
            />
            <RewardLabels
              reward={reward}
              endAt={page?.campaign?.endAt}
              campaignNotStart={campaignNotStart}
              campaignEnd={campaignEnd}
              campaignOngoing={campaignOngoing}
            />
          </div>
        </div>

        <div className="w-full p-4 lg:w-[720px]  rounded-2xl bg-gradient-to-b from-black/65 to-black/85 backdrop-blur-2xl flex flex-col justify-between gap-y-2">
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

              <div className="flex justify-center lg:justify-end">
                <Button
                  onClick={() => {
                    setViewModalOpen(true);
                  }}
                  className="flex items-center justify-center gap-x-1 h-10 w-full lg:w-[200px]"
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
      />
    </>
  );
};

export default memo(GroupCard);
