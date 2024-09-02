import { useMemo, memo, useState, useCallback } from 'react';
import Credential from './credential';
import { cn } from '@/utils/conf';
import { motion } from 'framer-motion';
import GiftIcon from '@/images/icon/svgr/gift.svg?react';
import ArrowIcon from '@/images/icon/svgr/arrow3.svg?react';
import TonSocietyIcon from '@/images/icon/svgr/ton-society.svg?react';
import Button from '@/pages/ton-wise/components/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import pointIcon from '@/images/icon/point-modal.svg';
import LazyImage from '@/components/lazyImage';
import { incentiveMethodList } from '@/utils/conf';
import { Popover, Statistic } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import useCampaignQuery from '@/hooks/useCampaignQuery';
import { formatImpact } from '@tbook/utils/lib/conf';
const { Countdown } = Statistic;
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
      'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-[#0082F9]',
      true,
      'EVAA',
    ],
    17: [
      'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-[#0082F9]',
      false,
      'STON.fi',
    ],
    18: [
      'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-[#0082F9]',
      true,
      'DeDust',
    ],
    19: [
      'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-[#0082F9]',
      true,
      'Storm Trade',
    ],
    20: [
      'bg-gradient-to-b from-[#0FD9B4] via-[#0082F9] via-30% to-[#0082F9]',
      true,
      'Storm Trade',
    ],
  };
  const defiTypes = labelTypes.filter((v) => defiLableTypes.includes(v));
  const renderType = defiTypes.length > 0 ? defiTypes[0] : index;
  const conf = defiColorsMap[renderType];
  return {
    bg: conf[0],
    isDark: conf[1],
    title: conf[2],
  };
};
const typeMap = {
  nft: 'NFT',
  point: 'Points',
  sbt: 'SBT',
};
const GroupCard = ({ group, index, showVerify }) => {
  const { campaignId } = useParams();
  const {
    data: page,
    campaignNotStart,
    campaignEnd,
    campaignOngoing,
  } = useCampaignQuery(campaignId);
  const { bg, isDark, title } = getSchema(
    group.credentialList?.map((c) => c.labelType),
    // [15],
    index
  );
  const verifyCnt =
    group.credentialList?.filter((c) => c.isVerified).length ?? 0;
  const totalCnt = group.credentialList?.length ?? 1;
  const isGroupVerified = verifyCnt === totalCnt;
  const [showCredential, setShowCredential] = useState(false);
  const showRewardButton = useMemo(() => {
    if (isGroupVerified) return false;
    return showCredential;
  }, [showCredential, isGroupVerified]);
  const [displayIdx, setDisplayIdx] = useState(0);
  const rewardList = [
    ...group.nftList.map((v) => ({ ...v, id: v.nftId, type: 'nft' })),
    ...group.pointList.map((v) => ({ ...v, id: v.pointId, type: 'point' })),
    ...group.sbtList.map((v) => ({ ...v, id: v.sbtId, type: 'sbt' })),
  ];
  const rewardLabels = useMemo(() => {
    const reward = rewardList[displayIdx];
    const incentiveMethodItem = incentiveMethodList.find(
      (v) => v.value === reward.methodType
    );
    return [
      {
        label: 'Reward Type',
        show: true,
        value: typeMap[reward.type],
      },
      {
        label: 'How to earn',
        show: true,
        value: (
          <div className="flex items-center justify-center gap-x-0.5">
            {incentiveMethodItem?.title}
            <Popover
              content={
                <div className="max-w-[calc(100vw_-_60px)] lg:max-w-[400px]">
                  {incentiveMethodItem?.pop}
                </div>
              }
              trigger="click"
              placement="top"
            >
              <InfoCircleOutlined className="size-4 cursor-pointer" />
            </Popover>
          </div>
        ),
      },
      {
        label: 'Lucky Draw in',
        show: reward.methodType === 2,
        value: campaignNotStart ? (
          'Wait to go'
        ) : campaignEnd ? (
          'Ended'
        ) : (
          <Countdown
            value={page?.campaign?.endAt ?? 0}
            format="D[d] H[h] m[m] s[s]"
            valueStyle={{
              color: '#12172F',
              fontSize: '12px',
              lineHeight: '16px',
              fontWeight: 500,
              fontFamily: 'sf',
            }}
          />
        ),
      },
      {
        label: 'Winners Num',
        show: true,
        value: reward.unlimited ? 'No Limit' : formatImpact(reward.number),
      },
    ];
  }, [rewardList, displayIdx, campaignNotStart, campaignEnd, campaignOngoing]);
  return (
    <div
      className={cn(
        'rounded-2xl overflow-hidden relative shadow-xl lg:flex lg:items-stretch lg:justify-between',
        bg
      )}
    >
      <div className={cn('relative p-4 rounded-2xl lg:w-[420px] lg:space-y-5')}>
        <div className="flex items-center justify-between gap-x-3 lg:items-start">
          <div
            className={cn(
              'flex-auto h-20',
              'flex flex-col justify-between',
              isDark ? 'text-[#12172F]' : 'text-white'
            )}
          >
            <p className="text-base font-sf-bold font-bold text-black">
              {title ? `Complete Tasks On ${title}` : 'Complete Tasks'}
            </p>
            <div className="text-[#12172F] text-xs space-y-0.5 w-full">
              <div>
                {verifyCnt}/{totalCnt}
              </div>
              <div
                className={cn(
                  isDark ? 'bg-[#12172F]/10' : 'bg-white',
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
          <div className="size-20 bg-fuchsia-500 flex-none lg:hidden"></div>
        </div>
        <div className="rounded-xl p-3 bg-[#12162F]/15 lg:flex gap-x-5 justify-start w-max hidden">
          <Swiper
            effect="cube"
            className="size-20 flex-none"
            onSwiper={() => {
              setDisplayIdx(0);
            }}
            onSlideChange={(s) => {
              setDisplayIdx(s.activeIndex);
            }}
          >
            {rewardList.map((r) => {
              return (
                <SwiperSlide key={r.id}>
                  {r.type === 'point' && (
                    <div className="w-full size-20 bg-[#CFF469] rounded-xl flex flex-col items-center gap-x-2">
                      <img src={pointIcon} className="w-14" />
                      <p className="text-[#503658] font-bold text-xs">
                        {r.number} Pts
                      </p>
                    </div>
                  )}
                  {(r.type === 'nft' || r.type === 'sbt') && (
                    <div className="w-full size-20 bg-[#12172F] rounded-xl flex justify-center items-center gap-x-2">
                      <LazyImage
                        className="size-14 rounded-full object-center object-cover"
                        src={r.picUrl}
                        alt={`${r.type} picturl`}
                      />
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="space-y-1">
            {rewardLabels
              .filter((v) => v.show)
              .map(({ label, value }, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-[200px] flex justify-between items-center text-xs"
                  >
                    <div className="text-[#12172F]">{label}</div>
                    <div className="text-black font-medium">{value}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[720px]">
        {showRewardButton ? (
          <div className="p-4 rounded-t-2xl bg-black/70 backdrop-blur-2xl flex flex-col gap-y-2">
            <button
              className="flex items-center gap-x-2"
              onClick={() => {
                setShowCredential(true);
              }}
            >
              <ArrowIcon />
              <p className="text-sm font-medium">
                {totalCnt} Credentials Verified
              </p>
            </button>
            <Button className="flex items-center justify-center gap-x-1 h-10">
              Mint SBT on <TonSocietyIcon />
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-4 rounded-t-2xl bg-gradient-to-b from-black/65 to-black/85 backdrop-blur-2xl">
            <div className="space-y-2">
              {group.credentialList?.map((credential) => (
                <Credential
                  credential={credential}
                  key={credential.credentialId}
                  showVerify={showVerify}
                />
              ))}
            </div>
            <div className="relative w-full">
              {isGroupVerified && (
                <button
                  className="rotate-180"
                  onClick={() => {
                    setShowCredential(false);
                  }}
                >
                  <ArrowIcon />
                </button>
              )}
              <Button className="w-full flex items-center justify-center gap-x-1 h-10">
                Mint SBT on <TonSocietyIcon />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(GroupCard);
