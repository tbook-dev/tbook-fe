import useTopProjects from '@/hooks/useTopProjects';
import { Skeleton } from 'antd';
import LazyImage from '@/components/lazyImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import clsx from 'clsx';
import ItemComponent from '@/components/campain/CardTon';

export default function TonExplore () {
  const { data, isLoading } = useTopProjects();
  const projects = data?.projects ?? [];
  const campaigns = data?.campaigns ?? [];
  return (
    <div className='px-5 mt-3 space-y-4'>
      <section>
        <h3 className='pt-4 pb-2 text-sm text-[#AAA]'>Projects</h3>
        <div className='overflow-x-auto'>
          <Swiper slidesPerView='auto' spaceBetween={16}>
            {isLoading
              ? new Array(2)
                  .fill(undefined)
                  .map((_, i) => (
                    <SwiperSlide
                      style={{ width: 60, height: 60 }}
                      className='rounded-full animate-pulse bg-[#1f1f1f]'
                      key={i}
                    />
                  ))
              : projects?.map(v => {
                  return (
                    <SwiperSlide
                      key={v.projectId}
                      style={{ width: 60, height: 60 }}
                      onClick={() => {
                        window.open(
                          `https://campaign-staging.tbook.com/${v.projectUrl}/`,
                          '_self'
                        );
                      }}
                    >
                      <LazyImage
                        src={v.avatarUrl}
                        alt='project url'
                        className='size-[60px] rounded-full object-cover object-center'
                      />
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </div>
      </section>

      <section>
        <h3 className='pt-4 pb-2 text-sm text-[#AAA]'>Caimpaigns</h3>
        <div>
          <Swiper slidesPerView={1.1} spaceBetween={10}>
            {isLoading ? (
              <SwiperSlide className='space-y-4'>
                <div
                  className={clsx(
                    'animate-pulse bg-[#1f1f1f]',
                    'w-full h-[160px] lg:h-[140px]'
                  )}
                />
                <Skeleton />
              </SwiperSlide>
            ) : (
              campaigns.map(campaign => {
                return (
                  <SwiperSlide key={campaign.campaignId}>
                    <div style={{ padding: '4px 4px' }}>
                      <ItemComponent
                        {...campaign}
                        hasNFT={campaign.nft > 0}
                        hasPoint={campaign.points > 0}
                      />
                    </div>
                  </SwiperSlide>
                );
              })
            )}
          </Swiper>
        </div>
      </section>
    </div>
  );
}