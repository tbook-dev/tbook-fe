import { useParams } from 'react-router-dom';

import useCompanyProjects from '@/hooks/useCompanyProjects';
// import TMAShare from '@/components/TMAShare';
import ProjectCard from './ProjectCard'

import Layout from '@/layout/custom/Layout';
import LazyImage from '@/components/lazyImage';

export default function CompanyHome () {
  const { companyName } = useParams();
  // const { data, isLoading } = useCompanyProjects(companyName);

  const data = { "companyId": 1, "companyName": "gamebuild", "creatorId": 0, "companyDescription": "Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler...", "projects": [ { "projectId": 158473060086, "projectName": "GAMETESTprojectUrlprojectUrlprojectUrl", "projectUrl": "rewardoortest001", "avatarUrl": "https://static.tbook.vip/img/e1c62af9c2524cc5a5a6de657eb96be9", "creatorId": 158472620085, "tags": [ "Others", "Tools" ], "theme": 1, "projectDescription": "<p>Game Introduction xxxx How many days have you checked in since Massive Season 3 launched?Game Introduction xxxx How many days have you checked in since Massive Season 3 launched?</p>", "websiteUrl": "", "telegramUrl": "", "twitterLink": "", "telegramLink": "", "evmRequire": false, "tonRequire": false } ] }
 

  const projects = data.projects;

  return (
  <Layout>
    <div className='px-4 pb-32'>
      <div className='bg-[#F1ACFF] h-[178px] w-full rounded-3xl flex justify-center mb-10'>
        {/* <LazyImage/> */}
        go leaderboard
      </div>
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
