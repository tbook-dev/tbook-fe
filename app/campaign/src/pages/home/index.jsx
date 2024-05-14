import pageConf from './pageConf';
import { useResponsive } from 'ahooks';
import { FloatButton } from 'antd';

export default function Home () {
  const { pc } = useResponsive();

  return (
    <main
      className='w-dvw flex-auto flex flex-col justify-end bg-cover gap-y-[180px]'
      style={{
        backgroundImage: `url(${pc ? pageConf.pic : pageConf.picMoble})`,
      }}
    >
      <div className='lg:w-[1200px] mx-auto text-[#e1cdff]/90'>
        {pc ? (
          pageConf.title.map(p => (
            <h3 className='text-[60px] leading-[80px]'>{p}</h3>
          ))
        ) : (
          <h3 className='text-4xl w-[270px] mx-auto text-center'>
            {pageConf.title.join(' ')}
          </h3>
        )}
      </div>
      <div className='lg:w-[1200px] lg:gap-x-8 lg:divide-x lg:divide-white/40 mx-auto flex items-center justify-center gap-x-10 lg:justify-start lg:pb-[130px]'>
        {pageConf.contacts.map(c => {
          return (
            <a
              key={c.name}
              className='group flex items-center gap-x-3 lg:px-8 lg:first:pl-0'
              target='_blank'
              href={c.url}
            >
              {c.svg}
              <div className='hidden lg:block text-xs'>
                <p className='text-white/60 group-hover:text-white'>{c.name}</p>
                <p className='text-white/40 group-hover:text-white'>
                  {c.linkText}
                </p>
              </div>
            </a>
          );
        })}
      </div>
      <div className='fixed bottom-[150px] right-6 lg:bottom-16 lg:right-16 cursor-pointer group'>
        <img src={pageConf.tipImg} />
      </div>
    </main>
  );
}
