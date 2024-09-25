import { useParams, Link } from 'react-router-dom';

import useCompanyProjects from '@/hooks/useCompanyProjects';
// import TMAShare from '@/components/TMAShare';
import ProjectCard from './ProjectCard'

import Layout from '@/layout/custom/Layout';
import LazyImage from '@/components/lazyImage';

export default function CompanyHome () {
  const { companyId } = useParams();
  const { data, isLoading } = useCompanyProjects(companyId);

  const companyInfo = data?.data ?? null;
  const projects = companyInfo?.projects ?? [];

  return (
    <Layout>
      <div className='px-4 pb-32 bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] min-h-screen'>
        <div className='h-[178px] w-full  flex justify-center mb-4'>
          { isLoading ? (
            <div className="w-full h-[178px] rounded-3xl bg-[#dad8ff] animate-pulse" />
          ) : companyInfo ? (
            <LazyImage
              className="w-full h-[178px] rounded-3xl bg-[#dad8ff]"
              src={ companyInfo.posterUrl }
              alt='Company poster'
            />
          ) : (
            <Link to={ `/company/${companyId}/leaderboard` }>
              <LazyImage
                className="bg-[#dad8ff] w-full h-[178px] rounded-3xl"
                    src={ companyInfo.homePoster }
                alt='Default poster'
              />
            </Link>
          ) }
        </div>
        <h1 className='text-xl font-bold'>Trending Games</h1>
        { projects.map((item) => {
          return (
            <ProjectCard
              key={ item.projectId }
              info={ item }
            />
          );
        }) }
      </div>
    </Layout>
  )
}
