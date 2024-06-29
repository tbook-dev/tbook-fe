import { ConfigProvider, message } from 'antd';
import { useMemo } from 'react';
import moduleConf from './conf';
import { formatImpact } from '@tbook/utils/lib/conf';
import { cn } from '@/utils/conf';
import { useBoostStatus, useCountdown } from '@/hooks/useUserRenaissance';
import { Link } from 'react-router-dom';

export default function Earn () {
  const [messageApi, contextHolder] = message.useMessage();
  const { data: boostStatus, isLoaded } = useBoostStatus();
  const timeLeft = useCountdown({
    targetDate: boostStatus.perNextDistribution,
    enabled: boostStatus.hasPerNextFreeCards,
  });
  const openMessage = (content, onClose) => {
    messageApi.open({
      icon: null,
      content: (
        <div className='px-3 py-4 backdrop-blur-md rounded-xl'>{content}</div>
      ),
      className: 'mt-10',
      onClose,
    });
  };

  const onboarding = useMemo(() => {
    return [
      {
        hidden: false,
        type: 'direct',
        title: 'Buy Scratch Cards',
        desc: (
          <div className='flex items-center'>
            <img src={moduleConf.url.tpoint} className='size-3 me-1' />
            +5,000 TPoints
          </div>
        ),
        img: <span className='text-xl'>💰</span>,
        isActive: boostStatus.isAbleToBuyCards, // deps
      },
    ];
  }, [boostStatus, timeLeft]);

  return (
    <div className='space-y-3 px-4 pb-10 mx-auto overflow-hidden transition-all shadow-xl'>
      <div className='relative flex items-center justify-center'>
        <Link to='/event/renaissance' className='absolute left-0'>
          {moduleConf.svg.back}
        </Link>
        <h2 className='text-2xl font-syne font-extrabold text-center'>Earn</h2>
      </div>
      <div className='space-y-5'>
        <div className='space-y-3'>
          <h3 className='text-syne text-base'>Onboarding</h3>
          <div className='space-y-3'>
            {onboarding.map(b => {
              return (
                <button
                  disabled={!b.isActive}
                  key={b.type}
                  className={cn(
                    'w-full text-start flex items-center justify-between gap-x-2 px-4 py-3 rounded-lg border border-[#FFEAB5] bg-linear14',
                    {
                      'opacity-40': !b.isActive,
                    }
                  )}
                >
                  <div className='flex items-center justify-between gap-x-2'>
                    {b.img}
                    <div className='space-y-2'>
                      <h4 className='text-[#FFDFA2] text-base font-syne font-semibold'>
                        {b.title}
                      </h4>
                      {isLoaded ? (
                        <div className='text-[#FFDFA2]/60 text-sm'>
                          {b.desc}
                        </div>
                      ) : (
                        <div className='bg-[#FFDFA2]/60 h-5 animate-pulse' />
                      )}
                    </div>
                  </div>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M6.875 3.75L13.125 10L6.875 16.25'
                      stroke='#FFDFA2'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Message: {
              contentBg: `rgba(255, 223, 162, 0.15)`,
              contentPadding: 0,
            },
          },
        }}
      >
        {contextHolder}
      </ConfigProvider>
    </div>
  );
}
