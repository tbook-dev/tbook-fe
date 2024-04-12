const modlueConf = {
  title: 'The WISE Score is already up to date.',
  desc: 'For more information about WISE Score, please visit:',
  link: 'https://tbookcommunity.medium.com/tbook-new-feature-wise-score-for-community-value-assessment-241a39b7fc9a',
};

export default function Engagement () {
  return (
    <div className='flex flex-col items-center pt-9 gap-y-4'>
      <svg
        width='41'
        height='40'
        viewBox='0 0 41 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='0.5'
          width='40'
          height='40'
          rx='20'
          fill='#22C55E'
          fillOpacity='0.2'
        />
        <path
          d='M13.5 21L17.5 25L27.5 15'
          stroke='#22C55E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>

      <div className='text-xs space-y-1 text-center'>
        <h2 className='font-zen-dot '>{modlueConf.title}</h2>
        <p>
          {modlueConf.desc}
          <a href={modlueConf.link} className='underline' target='_blank'>
            {modlueConf.link}
          </a>
        </p>
      </div>
    </div>
  );
}
