import { useParams, Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import useCompanyProjects from '@/hooks/useCompanyProjects';
// import TMAShare from '@/components/TMAShare';
import ProjectCard from './componets/ProjectCard'
import ProjectCardSkeleton from './componets/ProjectCardSkeleton'

import HomeSwiper from './componets/HomeSwiper'

import LazyImage from '@/components/lazyImage';

import ComingIcon from './icons/Coming.svg?react';
import clsx from 'clsx';

export default function CompanyHome () {

  const { isLightTheme } = useLoaderData()

  const { companyId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useCompanyProjects(companyId);

  const companyInfo = data?.data?.company ?? null;
  const projects = data?.data?.projects ?? [];
  const layerOneList = data?.data?.layerOneList ?? []

  const campaignHomeData = [];
  const projectHomeData = [];

  function LinkToProjectList ({ status, name }) {
    if (status === 0) return;
    // TODO: Link to project list
    navigate(`/company/${companyId}/projects?type=${name}`);
    
  }

  return (
    <div className={ clsx("px-6 pb-32 min-h-screen", 
      isLightTheme 
      ? 'bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] text-black' 
        : 'bg-black text-white') }>
      <div className='flex justify-center w-full mb-4 h-fit min-h-[178px]'>
        { isLoading ? (
          <div className="w-full aspect-[2/1] rounded-3xl bg-[#D5C8FF] animate-pulse" />
        ) : <a href={ companyInfo.homePosterLink }>
          <LazyImage
            className="w-full h-auto rounded-3xl bg-[#D5C8FF] object-cover object-center"
            src={ companyInfo.homePoster }
            alt='Company poster'
          />
        </a> }
      </div>

      { layerOneList.length > 0 && (
        <>
          <h1 className='mt-4 text-xl font-bold'>Layer1 Blockchains</h1>
          <Swiper className='mt-4' slidesPerView="auto" spaceBetween={ 16 }>
            { layerOneList.map((item, index) => (
              <SwiperSlide
                key={ index }
                style={ { width: 60, height: 60 } }
              >
                <div
                  className='relative flex items-center'
                  onClick={ () => LinkToProjectList(item) }
                >
                  <LazyImage
                    className={ clsx(
                      "w-[60px] h-[60px] rounded-full",
                      isLightTheme ? 'bg-[#D5C8FF]' : 'bg-black'
                    ) }
                    src={ item.icon }
                    alt={ item.name }
                  />
                  { item.status === 0 && (
                    <ComingIcon className="absolute bottom-[-1px] right-[-4px]" />
                  ) }
                </div>
              </SwiperSlide>
            )) }
          </Swiper>
        </>
      ) }

      {
        campaignHomeData?.campaigns?.length > 0 && (
          <HomeSwiper data={ campaignHomeData } type="campaign" />
        )
      }

      {
        projectHomeData?.projects?.length > 0 && (
          <HomeSwiper data={ projectHomeData } type="project" />
        )
      }

      <h1 className='mt-4 text-xl font-bold'>Trending Games</h1>
      { isLoading ? (
        new Array(2).fill(0).map((key, index) => (
          <ProjectCardSkeleton key={ index } />
        ))
      ) : (
        projects.map((item) => (
          <ProjectCard
            key={ item.projectId }
            info={ item }
          />
        ))
      ) }
    </div>
  )
}
