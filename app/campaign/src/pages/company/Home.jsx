import { useParams, Link } from 'react-router-dom';

import useCompanyProjects from '@/hooks/useCompanyProjects';
// import TMAShare from '@/components/TMAShare';
import ProjectCard from './ProjectCard'

import Layout from '@/layout/custom/Layout';
import LazyImage from '@/components/lazyImage';

export default function CompanyHome () {
  const { companyId } = useParams();
  const { isLoading } = useCompanyProjects(companyId);

  const data = { "companyId": 1, "companyName": "gamebuild", "creatorId": 0, "companyDescription": "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler...", "projects": [ { "projectId": 158473060086, "projectName": "GAMETESTprojectUrlprojectUrlprojectUrl", "projectUrl": "rewardoortest001", "avatarUrl": "https://static.tbook.vip/img/e1c62af9c2524cc5a5a6de657eb96be9", "creatorId": 158472620085, "tags": [ "Others", "Tools" ], "theme": 1, "projectDescription": "<p>Game Introduction xxxx How many days have you checked in since Massive Season 3 launched?Game Introduction xxxx How many days have you checked in since Massive Season 3 launched?</p>", "websiteUrl": "", "telegramUrl": "", "twitterLink": "", "telegramLink": "", "evmRequire": false, "tonRequire": false } ] }


  const projects = data.projects;

  return (
    <Layout>
      <div className='px-6 pb-32'>
        <div className='h-[178px] w-full  flex justify-center mb-4'>
          {
            isLoading ? (
              <LazyImage className="w-full h-[178px] rounded-3xl bg-[#dad8ff]" alt='poster' />
            ) : (
              <Link to={ `/company/${data.companyId}/leaderboard` }>
                  <LazyImage className="bg-[#dad8ff] w-full h-[178px] rounded-3xl" src="https://static.tbook.vip/img/2d328b8444734da7afd03d9f8c6c4a15" alt='poster' />
              </Link>
            )
          }
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
  );
}
