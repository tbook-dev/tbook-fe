import useTopProjects from '@/hooks/useTopProjects';
import { Skeleton } from 'antd';
import LazyImage from '@/components/lazyImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import clsx from 'clsx';
import ItemComponent from '@/components/campain/CardTon';
import { Link } from 'react-router-dom';

export default function TonExplore() {
  const { data, isLoading } = useTopProjects();
  const projects = data?.projects ?? [];
  const campaigns = data?.campaigns ?? [];
  return (
    <div className="px-5 mt-3 space-y-4">
      <section>
        <h3 className="py-4 font-zen-dot text-base font-medium text-white">
          Popular Projects
        </h3>
        <div className="overflow-x-auto">
          <Swiper slidesPerView="auto" spaceBetween={16}>
            {isLoading
              ? new Array(2)
                  .fill(undefined)
                  .map((_, i) => (
                    <SwiperSlide
                      style={{ width: 60, height: 60 }}
                      className="rounded-full animate-pulse bg-[#1f1f1f]"
                      key={i}
                    />
                  ))
              : projects?.map((v) => {
                  return (
                    <SwiperSlide
                      key={v.projectId}
                      style={{ width: 60, height: 60 }}
                    >
                      <Link to={`/${v.projectUrl}/`}>
                        <LazyImage
                          src={v.avatarUrl}
                          alt="project url"
                          className="size-[60px] rounded-full object-cover object-center"
                        />
                      </Link>
                    </SwiperSlide>
                  );
                })}
          </Swiper>
        </div>
      </section>

      <section>
        <h3 className="py-4 font-zen-dot text-base font-medium text-white">
          Trending Campaigns
        </h3>
        <div>
          <Swiper slidesPerView={1.1} spaceBetween={10}>
            {isLoading ? (
              <SwiperSlide className="space-y-4">
                <div
                  className={clsx(
                    'animate-pulse bg-[#1f1f1f]',
                    'w-full h-[160px] lg:h-[140px]'
                  )}
                />
                <Skeleton />
              </SwiperSlide>
            ) : (
              campaigns.map((campaign) => {
                return (
                  <SwiperSlide key={campaign.campaignId}>
                    {({ isActive }) => (
                      <div style={{ padding: '4px 4px' }}>
                        <ItemComponent
                          {...campaign}
                          isActive={isActive}
                          hasNFT={campaign.nft > 0}
                          hasPoint={campaign.points > 0}
                        />
                      </div>
                    )}
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
