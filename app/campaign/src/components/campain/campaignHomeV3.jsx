import { Link, useLoaderData } from 'react-router-dom';
import { memo, useMemo } from 'react';
import { Statistic } from 'antd';

import { formatStandard } from '@tbook/utils/lib/conf';
import { useTelegram } from '@/hooks/useTg';
import LazyImage from '@/components/lazyImage';

const { Countdown } = Statistic;

const countDownColorMap = {
  1: {
    pointColor: '#E4FA73',
    color: '#fff',
    backgroundColor: 'rgba(154, 129, 230, 0.6)',
    borderColor: '#9A81E6'
  },
  2: {
    color: 'rgb(234,179,8)',
    backgroundColor: 'rgba(250,204,21,0.1)',
    borderColor: '#9A81E6'
  },
};

function CampaignCardWithLightStyle ({
  title,
  campaignId,
  picUrl,
  startAt,
  endAt,
  project,
  usersNum,
  groups,
  status,
}) {
  const { isUsingSubdomain } = useLoaderData();
  const { isTMA } = useTelegram();

  const rewardOpt = useMemo(() => {
    const hasNFT = groups.some((v) => v.nftList.length > 0);
    const hasPoint = groups.some((v) => v.pointList.length > 0);
    const hasSBT = groups.some((v) => v.sbtList.length > 0);
    return { hasNFT, hasPoint, hasSBT };
  }, [ groups ]);

  return (
    <Link
      to={ `${isUsingSubdomain ? '' : `/${project?.projectUrl}`}/${campaignId}` }
      className="relative rounded-xl overflow-hidden flex flex-col shadow-s2 bg-[#490081] border-[1px] border-[#490081]"
      target={ isTMA ? '_self' : '_blank' }
    >
      { [ 1, 2 ].includes(status) && (
        <div
          className="border-[1px] absolute top-3 right-3 px-2 py-0.5 flex items-center gap-x-1.5 rounded-3xl"
          style={ countDownColorMap[ status ] }
        >
          <span
            className="w-2 h-2 rounded-full"
            style={ { background: countDownColorMap[ status ].pointColor } }
          />
          <Countdown
            value={ status === 2 ? startAt : endAt }
            format="D[d] H[h] m[m]"
            valueStyle={ {
              fontWeight: 500,
              color: countDownColorMap[ status ].color,
              fontSize: '14px',
              lineHeight: '20px',
            } }
          />
        </div>
      ) }

      <LazyImage
        src={ picUrl }
        className="w-full h-[160px] lg:h-[140px] object-cover object-center"
        alt="campaign banner"
      />

      {/* Gradient Background */ }
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent"></div>

      <div className="absolute bottom-0 flex flex-col justify-between flex-auto px-6 py-2 gap-y-1">

        <h2 className="text-lg font-bold text-white">{ title }</h2>

        <div className="flex items-center">
          <div className="flex items-center mr-2 text-white gap-x-1">
            <span>{ formatStandard(usersNum) }</span>
            { usersNum > 1 ? 'Participants' : 'Participant' }
          </div>

          <div className="flex flex-wrap text-xs font-medium text-white">
            { rewardOpt.hasNFT && (
              <div className="mr-2 px-1.5 py-0.5 rounded-2.5xl bg-[#904BF6]">
                NFT
              </div>
            ) }

            { rewardOpt.hasPoint && (
              <div className="mr-2 px-1.5 py-0.5 rounded-2.5xl bg-[#904BF6]">
                Points
              </div>
            ) }
            { rewardOpt.hasSBT && (
              <div className="mr-2 px-1.5 py-0.5 rounded-2.5xl bg-[#904BF6]">
                SBT
              </div>
            ) }
          </div>

        </div>
      </div>
    </Link>
  );
}

export default memo(CampaignCardWithLightStyle);
