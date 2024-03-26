import WebApp from '@twa-dev/sdk';
import Page404 from '@/pages/404';
import useTopProjects from '@/hooks/useTopProjects';
import { Skeleton } from 'antd';
import LazyImage from '@/components/lazyImage';

export default function TonExplore () {
  console.log({ WebApp });
  const { data, isLoading } = useTopProjects();
  console.log({ data, isLoading });
  return (
    <div className='px-5 mt-3'>
      <section>
        <h3 className='pt-4 pb-2 text-sm text-[#AAA]'>Projects</h3>
        <div className='overflow-x-auto'>
          <div className='flex gap-x-4 flex-nowrap'>
            {isLoading
              ? new Array(2)
                  .fill(undefined)
                  .map((_, i) => (
                    <div
                      className='flex-none size-[60px] rounded-full animate-pulse bg-[#1f1f1f]'
                      key={i}
                    />
                  ))
              : data?.map(v => {
                  return (
                    <button
                      className='flex-none'
                      onClick={() => {
                        WebApp;
                        console.log('ready', WebApp.ready());
                        // WebApp.openTgLink(
                        //   `https://campaign-staging.tbook.com/lake`
                        // );
                        window.open(
                          `https://campaign-staging.tbook.com/lake`,
                          'self'
                        );
                      }}
                    >
                      <LazyImage
                        src={v.avatarUrl}
                        alt='project url'
                        className='size-[60px] rounded-full'
                      />
                    </button>
                  );
                })}
          </div>
        </div>
      </section>

      <section>
        <h3 className='pt-4 pb-2 text-sm text-[#AAA]'>Projects</h3>
        <div>xx</div>
      </section>
    </div>
  );
}
