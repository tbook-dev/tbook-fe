import { incentiveMethodList } from '@/utils/conf';
import { memo, useMemo } from 'react';
import { formatImpact } from '@tbook/utils/lib/conf';
import { Popover, Statistic } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { cn } from '@/utils/conf';

const { Countdown } = Statistic;

const typeMap = {
  nft: 'NFT',
  point: 'Points',
  sbt: 'SBT',
};
const RewardLabels = ({
  reward,
  endAt,
  campaignNotStart,
  campaignEnd,
  campaignOngoing,
}) => {
  const rewardLabels = useMemo(() => {
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
            value={endAt ?? 0}
            format="D[d] H[h] m[m] s[s]"
            valueStyle={{
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
  }, [reward, campaignNotStart, campaignEnd, campaignOngoing]);
  return (
    <div className="flex flex-col gap-y-1 items-center justify-center">
      {rewardLabels
        .filter((v) => v.show)
        .map(({ label, value }, idx) => {
          return (
            <div
              key={idx}
              className={cn(
                'w-[200px] flex justify-between items-center text-xs'
              )}
            >
              <div>{label}</div>
              <div className="font-medium">{value}</div>
            </div>
          );
        })}
    </div>
  );
};

export default memo(RewardLabels);
