import { Link } from 'react-router-dom';
import LazyImage from '@/components/lazyImage';

export default function ProjectCard({ info }) {
  const { projectUrl, avatarUrl, projectName, projectDescription, banner } = info;
  
  const link = `/${projectUrl}`

  return (
    <Link to={ link } className="bg-white rounded-2xl border-[1px] border-[#E0CEEE] my-4 block">
      <div>
        <LazyImage
          src={ banner }
          alt="logo"
          className="h-[143px] object-cover object-center w-full rounded-t-2xl border-[1px] border-[#490081]"
        />
      </div>
      <div className="flex flex-col px-4 pt-2 pb-4 gap-x-4">
        <div className="flex items-center gap-x-3">
          <img
            className="object-cover object-center w-6 h-6 rounded-full"
            src={ avatarUrl }
            alt="project logo"
          />
          <h2 className="flex-1 overflow-hidden text-lg font-bold truncate">{ projectName }</h2>

        </div>
        <div>
          <p className="overflow-hidden text-sm text-black line-clamp-2"
            dangerouslySetInnerHTML={ { __html: projectDescription } }>
          </p>
        </div>
      </div>
    </Link>
  );
}