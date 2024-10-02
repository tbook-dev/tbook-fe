import { Link } from 'react-router-dom';
import LazyImage from '@/components/lazyImage';
import { useLoaderData } from 'react-router-dom';
import clsx from 'clsx';

export default function ProjectCard ({ info, isLoading }) {
  const { projectUrl, avatarUrl, projectName, projectDescription, banner } = info;
  const { isLightTheme } = useLoaderData()
  
  const link = `/${projectUrl}`

  return (
    <Link to={ link } className={ clsx("rounded-2xl my-4 block", 
      isLightTheme ? 'bg-white border-[#E0CEEE] border-[1px] text-black' : 'bg-[#252525] shadow-s2 text-white',
    )}>
      <div>
        { isLoading ? (
          <div className={clsx("h-[143px] w-full rounded-t-2xl border", 
            isLightTheme ? 'border-[#490081]' : '')} />
        ) : banner ? (
          <LazyImage
            src={ banner }
            alt="logo"
              className={clsx("h-[143px] object-cover object-center w-full rounded-t-2xl border", 
                isLightTheme ? ' border-[#490081]' : 'border-black')}
          />
        ) : (
          <img
            src="https://static.tbook.vip/img/1a87d2e5bf3c498693f0c8ca64919797"
            alt="default banner"
                className={ clsx("h-[143px] object-cover object-center w-full rounded-t-2xl border", 
                  isLightTheme ? 'bg-white border-[#490081]' : 'border-black'
                )}
          />
        ) }
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
          <p className="overflow-hidden text-sm line-clamp-2"
            dangerouslySetInnerHTML={ { __html: projectDescription } }>
          </p>
        </div>
      </div>
    </Link>
  );
}