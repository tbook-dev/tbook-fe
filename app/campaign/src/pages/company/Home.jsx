import { useParams, Link } from 'react-router-dom';

import useCompanyProjects from '@/hooks/useCompanyProjects';
// import TMAShare from '@/components/TMAShare';
import ProjectCard from './ProjectCard'

import Layout from '@/layout/custom/Layout';
import LazyImage from '@/components/lazyImage';

export default function CompanyHome () {
  const { companyId } = useParams();
  const { data, isLoading } = useCompanyProjects(companyId);

  const companyInfo = data?.data?.company ?? null;
  const projects = data?.data?.projects ?? [];

  return (
    <Layout title={ companyInfo?.companyName || '' }>
      <div className='px-6 pb-32 bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] min-h-screen'>
        <div className='flex justify-center w-full mb-4 h-fit min-h-[178px]'>
          { isLoading ? (
            <div className="w-full h-fit rounded-3xl bg-[#dad8ff] animate-pulse" />
          ) : <Link to={ `/company/${companyInfo.companyId}/leaderboard` }>
            <LazyImage
              className="w-full h-auto rounded-3xl bg-[#dad8ff] object-cover object-center"
              src={ companyInfo.homePoster }
              alt='Company poster'
            />
          </Link> }
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
