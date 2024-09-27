import { useParams, Link } from 'react-router-dom';

import useCompanyProjects from '@/hooks/useCompanyProjects';
// import TMAShare from '@/components/TMAShare';
import ProjectCard from './ProjectCard'
import ProjectCardSkeleton from './ProjectCardSkeleton'

import Layout from '@/layout/custom/Layout';
import LazyImage from '@/components/lazyImage';

import ComingIcon from './icons/Coming.svg?react';

export default function CompanyHome () {
  const { companyId } = useParams();
  const { data, isLoading } = useCompanyProjects(companyId);

  const companyInfo = data?.data?.company ?? null;
  const projects = data?.data?.projects ?? [];
  const layerOneList = data?.data?.layerOneList ?? []

  const LinkToProjectList = ({ status }) => {
    if (status === 0) return;
    // TODO: Link to project list
  }

  return (
    <Layout title={ companyInfo?.companyName || '' }>
      <div className='px-6 pb-32 bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] min-h-screen'>
        <div className='flex justify-center w-full mb-4 h-fit min-h-[178px]'>
          { isLoading ? (
            <div className="w-full aspect-[2/1]  rounded-3xl bg-[#D5C8FF] animate-pulse" />
          ) : <Link to={ `/company/${companyInfo.companyId}/leaderboard` }>
            <LazyImage
              className="w-full h-auto rounded-3xl bg-[#D5C8FF] object-cover object-center"
              src={ companyInfo.homePoster }
              alt='Company poster'
            />
          </Link> }
        </div>
        
        { layerOneList.length > 0 && (
          <>
            <h1 className='mt-4 text-xl font-bold'>Layer1 Blockchains</h1>
            <div className='flex'>
              { layerOneList.map((item, index) => {
                  return (
                    <div key={ index } className='relative flex items-center mt-4 mr-4' onClick={ () => LinkToProjectList(item) }>
                      <LazyImage className="w-[60px] h-[60px] rounded-full " src={ item.icon } alt={ item.name }></LazyImage>
                      { item.status === 0 && <ComingIcon className="absolute bottom-[-1px] right-[-4px]" /> }
                    </div>
                  )
                })
             }
            </div> 
          </>
        )}

        <h1 className='mt-4 text-xl font-bold'>Trending Games</h1>
        { isLoading ? (
          new Array(2).fill(0).map((key, index) => (
            <ProjectCardSkeleton key={index} />
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
    </Layout>
  )
}
