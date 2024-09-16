import { useLoaderData, useParams, useSearchParams } from 'react-router-dom';

import { formatStandard } from '@tbook/utils/lib/conf';

import React, { useMemo } from 'react';
import { Skeleton } from 'antd';

import useCampaignQuery from '@/hooks/useCampaignQuery';
import usePageFooterTip from '@/hooks/usePageFooterTip';

import RichMore from '@/components/textMore/rich';
import LazyImage from '@/components/lazyImage';
import TMAShare from '@/components/TMAShare';
import Timeline from '@/components/timeline';

// same as /app
import Unavailable from '../app/unavailable';
import GroupCard from '../app/groupCard';

import AppCountDown from './AppCountDown';

const defiTip =
  'It may take some time to track your on-chain transactions. After completing the tasks, you can retry to verify later.';

export default function () {
  const { campaignId } = useParams();
  const {
    data: page,
    isLoading,
    campaignNotStart,
    campaignOngoing,
    campaignUnavailable,
    isDefi,
    hasDefi,
    groupList,
  } = useCampaignQuery(campaignId);
  // const isLoading = true
  const { projectUrl } = useLoaderData();
  const [ searchParams ] = useSearchParams();
  usePageFooterTip();

  const refBackLink = useMemo(() => {
    const refUnsafeUrl = searchParams && searchParams.get('ref');
    try {
      return new URL(decodeURIComponent(refUnsafeUrl)).href;
    } catch (error) {
      return null;
    }
  }, [ searchParams ]);

  if (campaignUnavailable) {
    return <Unavailable projectUrl={ projectUrl } />;
  }

  return (
    <div className="p-4 space-y-3 lg:pt-5 lg:w-[1200px] mx-auto pb-16 lg:py-2  text-black">

      {/* back button */ }
      { refBackLink && (
        <a
          href={ refBackLink }
          className="lg:pl-0 flex items-center gap-x-1 text-xl font-semibold py-2.5 text-black] group hover:text-white text-[#9A81E6]"
        >
          <svg width="31" height="40" viewBox="0 0 31 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 21L31 0L19.5 21L31 39.5L0 21Z" fill="#EBDBF3" />
          </svg>
          <span className='indent-[-20px]'>Back</span>
        </a>
      ) }

      <div className="flex flex-col justify-between lg:p-0 lg:flex-auto">
        { isLoading ? (
          <Skeleton active />
        ) : (
          <div className="space-y-3 text-black lg:space-y-8">

            {/* Title */ }
            <h2 className="text-2xl font-bold lg:text-4xl w-[90%]">
              { page?.campaign?.name }
            </h2>

            {/* CountDown */ }
            <div className="space-y-5">
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

              { hasDefi && (
                <div className="text-sm text-black/60">{ defiTip }</div>
              ) }
            </div>

            <section className="overflow-hidden mb-3 lg:mb-16 lg:flex lg:justify-between lg:gap-x-[80px]">
              {/* TODO: 这是什么 */ }
              <div className="relative w-full h-[172px] lg:w-[566px] lg:h-[275px] lg:flex-none lg:order-last object-cover object-center">
                <TMAShare
                  color="dark"
                  data={ [ 1, projectUrl, campaignId ] }
                  isBot
                  text={ page?.campaign?.shareText }
                />

                {/* Banner */ }
                <LazyImage
                  theme="light"
                  themeBgColor="bg-[#F0E1F7]"
                  src={ page?.campaign?.picUrl }
                  alt="main banner"
                  className="object-cover object-center w-full h-full rounded-xl"
                  fetchpriority="high"
                />
              </div>
            </section>
          </div>
        ) }

        { isLoading && (
          <div className="px-5 py-3 rounded-lg lg:px-0 lg:rounded-2xl">
            <Skeleton />
          </div>
        ) }

        {/* Participant Number */ }
        <div className="flex items-center mt-5 gap-x-1">
          <span className="text-[#5812B1] font-bold">
            { formatStandard(page?.campaign?.participantNum) || '-' }
          </span>
          <span className='text-black '>
            { page?.campaign?.participantNum > 1 ? 'Participants' : 'Participant' }
          </span>
        </div>

        {/* Description */ }
        <div className="text-sm lg:text-base lg:mb-8 text-black/60">
          <RichMore value={ page?.campaign?.description } />
        </div>
      </div>

      <section className="lg:px-0">
        <h1 className='py-4 font-bold text-black font-xl border-t-[1px] border-[#DBBEE8]'>
          Tasks & Rewards
        </h1>

        <Timeline
          showProcess={ isDefi }
          steps={ groupList.map(([ category, group ]) => {
            const isFinished = group
              .map((v) => v.credentialList)
              .flat()
              .every((c) => c.isVerified === 1);

            return {
              name: category,
              children: (
                <div className="space-y-2 lg:space-y-3">
                  { group.map((g, i) => (
                    <GroupCard
                      key={ i }
                      index={ i }
                      group={ g }
                      showVerify={ campaignOngoing }
                      isDefi={ isDefi }
                    />
                  )) }
                </div>
              ),
              isFinished,
            };
          }) }
        />

      </section>
    </div>
  );
}
