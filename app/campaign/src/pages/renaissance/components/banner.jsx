import moduleConf from '../conf';

export default function Banner () {
  return (
    <div className='flex justify-center relative'>
      <button className='absolute left-0 bottom-3 flex flex-col'>
        {moduleConf.svg.scratchButton}
        <img src={moduleConf.url.dog} className='relative -top-1 size-12' />
      </button>

      {moduleConf.svg.renaissanceText}

      <button className='absolute -right-5 bottom-[34px] button py-1.5 px-3 text-sm rounded-l-lg border border-r-0 lg:border-r lg:rounded-r-lg border-[#FFDFA2]/60  text-[#f8c685]/60'>
        Rules
      </button>
    </div>
  );
}
