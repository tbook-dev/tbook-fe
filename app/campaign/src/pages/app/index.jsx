import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useCampaignQuery from '@/hooks/useCampaignQuery';
import RichMore from '@/components/textMore/rich';
import { Skeleton } from 'antd';
import LazyImage from '@/components/lazyImage';
import { useLoaderData } from 'react-router-dom';
import usePageFooterTip from '@/hooks/usePageFooterTip';
import TMAShare from '@/components/TMAShare';
import Unavailable from './unavailable';
// import Timeline from '@/components/timeline';
import AppCountDown from './AppCountDown';
import GroupCard from './groupCard';

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
    hasDefi,
    groupList,
  } = useCampaignQuery(campaignId);
  const { projectUrl } = useLoaderData();
  const [searchParams] = useSearchParams();
  usePageFooterTip();

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
    <div className="space-y-2.5 lg:pt-5 lg:w-[1200px] mx-auto pb-16 lg:py-2  text-white">
      {refBackLink && (
        <a
          href={refBackLink}
          className="pl-4 lg:pl-0 flex items-center gap-x-1 text-sm font-semibold py-2.5 text-[#717374] group hover:text-white"
        >
          <div className="flex items-center justify-center w-6 h-6">
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

      <section className="overflow-hidden mb-3 lg:mb-16 lg:flex lg:justify-between lg:gap-x-[80px]">
        <div className="relative w-full h-[172px] lg:w-[566px] lg:h-[275px] lg:flex-none lg:order-last object-cover object-center">
          <TMAShare
            data={[1, projectUrl, campaignId]}
            isBot
            text={page?.campaign?.shareText}
          />

          <LazyImage
            src={page?.campaign?.picUrl}
            alt="main banner"
            className="object-cover object-center w-full h-full"
            fetchpriority="high"
          />
        </div>

        <div className="flex flex-col justify-between p-4 lg:p-0 lg:flex-auto">
          {isLoading ? (
            <Skeleton active />
          ) : (
            <>
              <div className="space-y-3 lg:space-y-8">
                <h2 className="text-2xl font-bold lg:text-4xl">
                  {page?.campaign?.name}
                </h2>

                <div className="mb-5 text-sm lg:text-base lg:mb-8 text-white/60">
                  <RichMore value={page?.campaign?.description} />
                </div>
              </div>

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

                {hasDefi && (
                  <div className="text-sm text-white/60">{defiTip}</div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {isLoading && (
        <div className="px-5 py-3 rounded-lg lg:px-0 lg:rounded-2xl">
          <Skeleton />
        </div>
      )}

      <section className="px-4 lg:px-0 space-y-2 lg:space-y-3">
        {groupList.map((g, i) => (
          <GroupCard
            key={i}
            group={g}
            showVerify={campaignOngoing}
            endAt={page?.campaign?.endAt}
            status={page?.campaign?.status}
          />
        ))}
      </section>
    </div>
  );
}
