import { useResponsive } from 'ahooks';
import bgPc from '@/images/error/error-pc.svg';
import bg from '@/images/error/error.svg';
import LazyImage from '@/components/lazyImage';
import { Link } from 'react-router-dom';

const moduleConf = {
  title: 'The campaign is unavailable.',
  desc: `The campaign has been deleted. Explore more campaigns from the project!`,
  btn: `Explore more campaigns`,
};
export default function Unavailable ({ projectUrl }) {
  const { pc } = useResponsive();

  return (
    <div className='flex flex-col text-white bg-black min-h-dvh'>
      <div
        className='relative flex flex-auto pb-20 overflow-x-hidden overflow-y-auto'
        style={
          pc
            ? null
            : {
              backgroundImage: `url(${bg})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }
        }
      >
        { pc && (
          <LazyImage
            src={ bgPc }
            alt='background'
            className='absolute object-cover w-full h-full'
          />
          // <img src={bgPc} className="absolute object-cover w-full h-full" />
        ) }
        <div className='relative px-6 lg:px-0 lg:w-[1200px] mx-auto flex flex-col justify-end pb-10 lg:pb-0 lg:justify-center items-center lg:items-start gap-y-8 lg:gap-y-16'>
          <div className='space-y-4 text-center lg:space-y-7 lg:text-start'>
            <h2 className='text-3xl font-medium lg:text-6xl lg:font-semibold'>
              { moduleConf.title }
            </h2>
            <p className='text-lg lg:text-2xl'>{ moduleConf.desc }</p>
          </div>

          <Link
            to={ `/${projectUrl}/` }
            className='px-8 py-4 text-lg font-normal rounded-full lg:text-2xl lg:font-medium bg-linear7 lg:px-10 lg:py-4 hover:opacity-70'
          >
            { moduleConf.btn }
          </Link>
        </div>
      </div>
    </div>
  );
}
