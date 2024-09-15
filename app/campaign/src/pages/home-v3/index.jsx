import CampaignCardV3 from '@/components/campain/campaignHomeV3';
import { useState, useEffect } from 'react';
import { campaignStatus } from '@/utils/conf';
import { useLoaderData } from 'react-router-dom';
import useCampaignList from '@/hooks/useCampaignList';
import dayjs from 'dayjs';
import clsx from 'clsx';
import Banner from './Banner';
import { useMemo } from 'react';
import { sum } from 'lodash';
import Empty from '@/components/empty';
import { Affix, Skeleton } from 'antd';
import TMAShare from '@/components/TMAShare';
import Layout from './layout';

export default function HomeProject () {
  const [ selectStatus, setSelectedStatus ] = useState(-1);
  const { projectId, project, projectUrl } = useLoaderData();
  const { data: list = [], isLoading } = useCampaignList(projectId);
  // const isLoading = true
  const [ defaultLoaded, setDefaultLoaded ] = useState(false);
  const listFilter = list
    .filter(v => v.campaign?.status === selectStatus)
    .sort((a, b) =>
      dayjs(b.campaign?.createTime).isAfter(a.campaign?.createTime) ? 1 : -1
    );

  useEffect(() => {
    if (!defaultLoaded && !isLoading) {
      // 加载完成，并且没有设置过
      const hasOngoing = list.some(v => v.campaign?.status === 1);
      const hasScheduled = list.some(v => v.campaign?.status === 2);
      if (!hasOngoing && hasScheduled) {
        setSelectedStatus(2);
      } else {
        setSelectedStatus(1);
      }
      setDefaultLoaded(true);
    }
  }, [ defaultLoaded, isLoading ]);

  const participantNum = useMemo(() => {
    return sum(list.map(v => v.participantNum ?? 0));
  }, [ list ]);

  return (
    <Layout>
      <main className='pb-20'>
        <div className='mx-auto space-y-3 lg:w-bx lg:px-0'>
          <div className='px-4'>
            <TMAShare data={ [ 2, projectUrl ] } />

            <Banner
              { ...project }
              isLoading={ isLoading }
              campaignNum={ list?.length ?? 0 }
              participantNum={ participantNum }
            />
          </div>


          <div className='space-y-3'>
            <Affix offsetTop={ 0 }>
              <div className=''>
                <div className='flex items-center justify-between lg:justify-start lg:gap-x-20 h-10 border-b border-[#DBBEE8] bg-[#FBF8FC]'>
                  { campaignStatus
                    .filter(status => status.label !== 'Scheduled')
                    .map(v => {
                      return (
                        <button
                          disabled={ isLoading }
                          key={ v.value }
                          className={ clsx(
                            selectStatus === v.value
                              ? 'before:absolute before:w-full before:h-0.5 before:left-0 before:-bottom-[7px] before:bg-[#904BF6]'
                              : 'text-[#9A81E6]',
                            isLoading ? '' : 'lg:hover:text-white',
                            'text-base lg:text-xl relative w-[50%] h-7 text-[#904BF6]'
                          ) }
                          onClick={ () => {
                            setSelectedStatus(v.value);
                          } }
                        >
                          { v.label }
                        </button>
                      );
                    }) }
                </div>
              </div>
            </Affix>

            <section className='px-4 mb-20'>
              { isLoading ? (
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
                  { new Array(3).fill(0).map((_, i) => {
                    return (
                      <div className='space-y-4' key={ i }>
                        <div
                          className={ clsx(
                            'animate-pulse bg-[#F0E1F7] rounded-xl',
                            'w-full h-[160px] lg:h-[140px]'
                          ) }
                        />
                      </div>
                    );
                  }) }
                </div>
              ) : (
                <div
                  className={ clsx(
                    'grid gap-6',
                    listFilter.length === 0
                      ? 'grid-cols-1'
                      : 'grid-cols-1 lg:grid-cols-4'
                  ) }
                >
                  { listFilter.length > 0 ? (
                    listFilter.map(v => (
                      <CampaignCardV3
                        key={ v.campaign?.campaignId }
                        project={ project }
                        usersNum={ v.participantNum ?? 0 }
                        groups={ v.groups ?? [] }
                        { ...v.campaign }
                      />
                    ))
                  ) : (
                    <div className='lg:h-[330px] lg:bg-[#F0E1F7] lg:rounded-xl flex justify-center items-center'>
                      <div className='bg-[#F0E1F7] w-full h-[250px] rounded-xl flex flex-row items-center justify-center'>
                        <p className='w-[50%] text-[#5812B1] text-center
'>Deposit $GAME
                          to launch your campaign</p>
                      </div>
                      {/* <Empty text='Stay tuned for awesome campaigns!' /> */ }
                    </div>
                  ) }
                </div>
              ) }
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
