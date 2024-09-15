// mock
import useTopProjects from '@/hooks/useTopProjects';

import { Skeleton } from 'antd';
import LazyImage from '@/components/lazyImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import clsx from 'clsx';
import ItemComponent from './CardTon';
import { Link } from 'react-router-dom';
import TMAShare from '@/components/TMAShare';
// import AdPosition from './AdPosition';

export default function GameBuild () {

  const { data, isLoading } = useTopProjects();
  const projects = data?.projects ?? [];
  const campaigns = data?.campaigns ?? [];
  return (
    <div className="px-5 mt-3 space-y-4">

      <h3 className="text-base font-medium text-[#231433]">
        Layer1 Blockchains
      </h3>
      <div className="overflow-x-auto">
        <Swiper slidesPerView="auto" spaceBetween={ 16 }>
          { isLoading
            ? new Array(2)
              .fill(undefined)
              .map((_, i) => (
                <SwiperSlide
                  style={ { width: 60, height: 60 } }
                  className="rounded-full animate-pulse bg-[#1f1f1f]"
                  key={ i }
                />
              ))
            : projects?.map((v) => {
              return (
                <SwiperSlide
                  key={ v.projectId }
                  style={ { width: 60, height: 60 } }
                >
                  <Link to={ `/${v.projectUrl}/` }>
                    <LazyImage
                      src={ v.avatarUrl }
                      alt="project url"
                      className="size-[60px] rounded-full object-cover object-center"
                    />
                  </Link>
                </SwiperSlide>
              );
            }) }
        </Swiper>
      </div>


      { isLoading ? (
        <Swiper slidesPerView={ 1.1 } spaceBetween={ 10 }>
          <SwiperSlide className="space-y-4">
            <div
              className={ clsx(
                'animate-pulse bg-[#eee]',
                'w-full h-[160px] lg:h-[140px]'
              ) }
            />
            <Skeleton />
          </SwiperSlide>
        </Swiper>
      ) : campaigns?.length > 0 ? (
        campaigns?.map((v) => {
          return (
            <section key={ v.campaignIds }>
              <h3 className="py-4 text-base font-medium text-white font-zen-dot">
                { v.campaignTitle }
              </h3>
              <div>
                { v.campaigns.map((campaign) => {
                  return (
                    <div style={ { padding: '4px 4px' } }>
                      <ItemComponent
                        { ...campaign }
                        hasNFT={ campaign.nft > 0 }
                        hasPoint={ campaign.points > 0 }
                        hasSBT={ campaign.hasSBTReward }
                      />
                    </div>
                  );
                }) }
              </div>
            </section>
          );
        })
      ) : (
        <div className="py-10 text-center text-white/50">Please wait...</div>
      ) }

    </div>
  );
}
