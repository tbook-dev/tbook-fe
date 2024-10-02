
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import clsx from 'clsx'
import { Skeleton } from 'antd';

// for campaigns
import ItemComponent from '@/components/campain/CardTon';
// for projects
import ProjectTon from './ProjectTon';

export default function HomeSwiper ({ data, type }) {
  return (
    <>
      { type === 'project' && <ProjectSwiper data={ data } /> }
      { type === 'campaign' && <CampaignSwiper data={ data } /> }
    </>
  )
}

const ProjectSwiper = ({ data }) => {
  return (
    <div>
      <h1 className='my-4 text-xl font-bold'>{ data.projectTitle }</h1>
      <Swiper slidesPerView={ 1.1 } spaceBetween={ 10 }>
        { data?.projects?.map((item) => (
          <SwiperSlide key={ item.projectId }>
            { ({ isActive }) => (
              <div style={ { padding: '4px 4px' } }>
                {/* Add your project item component here */ }
                <ProjectTon
                  { ...item }
                  isActive={ isActive }
                />
              </div>
            ) }
          </SwiperSlide>
        )) }
      </Swiper>
    </div>
  )
}

const CampaignSwiper = ({ data }) => {
  console.log(data.campaignTitle)
  return (
    <div>
      <h1 className='my-4 text-xl font-bold'>{ data.campaignTitle }</h1>
      <Swiper slidesPerView={ 1.1 } spaceBetween={ 10 }>
        { data?.campaigns?.map((item) => {
          return (
            <SwiperSlide key={ item.campaignId }>
              { ({ isActive }) => (
                <div style={ { padding: '4px 4px' } }>
                  <ItemComponent
                    { ...item }
                    isActive={ isActive }
                    hasNFT={ item.nft > 0 }
                    hasPoint={ item.points > 0 }
                    hasSBT={ item.hasSBTReward }
                  />
                </div>
              ) }
            </SwiperSlide>
          );
        }) }
      </Swiper>
    </div>
  )
}