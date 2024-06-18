import { ConfigProvider, message } from 'antd';
import { useMemo } from 'react';
import moduleConf from './conf';
import { formatImpact } from '@tbook/utils/lib/conf';
import { cn } from '@/utils/conf';
import BoostDrawer from './components/drawer/BoostDrawer';
import { useState } from 'react';

export default function Boost () {
  const [messageApi, contextHolder] = message.useMessage();
  const [openMulti, setOpenMulti] = useState();
  const [boostData, setBoostData] = useState({});
  const openMessage = (content, onClose) => {
    messageApi.open({
      icon: null,
      content: (
        <div className='px-3 py-4 backdrop-blur-md rounded-xl'>
          🌟🌟 {content} 🌟🌟
        </div>
      ),
      className: 'mt-10',
      onClose,
    });
  };

  const dailyBooster = useMemo(
    () => {
      const freeCardLeftcnt = 1;
      return [
        {
          type: 'daily',
          title: 'Daily Free Scratch Cards',
          desc: `${freeCardLeftcnt}/5 available`,
          img: <img src={moduleConf.url.cat} className='size-[30px]' />,
          isActive: true,
        },
        {
          type: 'timing',
          title: 'Timing Bonus',
          desc: `1 free card per 10min, max 5 times per day`,
          img: <span className='text-xl'>⏰</span>,
          isActive: false,
        },
      ];
    },
    [
      /*user info*/
    ]
  );

  const proofBooster = useMemo(
    () => {
      const multi = {
        point: 500,
        level: 'Lvl1',
      };
      const per = {
        point: 3000,
        level: 'Lvl2',
      };

      return [
        {
          type: 'multi',
          title: 'Multi Scratch Cards',
          desc: (
            <div className='flex items-center'>
              <img src={moduleConf.url.tpoint} className='size-3 me-1' />
              {formatImpact(multi.point)}TPoints · {multi.level}
            </div>
          ),
          img: <span className='text-xl'>⚡</span>,
          isActive: true,
        },
        {
          type: 'per',
          title: 'Multi Scratch Cards',
          desc: (
            <div className='flex items-center'>
              <img src={moduleConf.url.tpoint} className='size-3 me-1' />
              {formatImpact(per.point)}TPoints · {per.level}
            </div>
          ),
          img: <span className='text-xl'>☄️</span>,
          isActive: true,
        },
        {
          type: 'direct',
          title: 'Buy Scratch Cards',
          desc: (
            <div className='flex items-center'>
              <img src={moduleConf.url.tpoint} className='size-3 me-1' />
              {formatImpact(150)}TPoints · Card
            </div>
          ),
          img: <span className='text-xl'>💰</span>,
          isActive: false, // deps
        },
        {
          type: 'invite',
          title: 'Invite to Get Cards',
          desc: <div>1 friend/ 3 Cards</div>,
          img: <span className='text-xl'>🧑‍🤝‍🧑</span>,
          isActive: true,
        },
      ];
    },
    [
      /* user info */
    ]
  );

  const handleBoost = v => {
    if (v.type === 'multi') {
      setBoostData(v);
      setOpenMulti(true);
    } else if (v.type === 'per') {
      setBoostData(v);
      setOpenMulti(true);
    } else if (v.type === 'direct') {
      setBoostData(v);
      setOpenMulti(true);
    }
  };

  return (
    <div className='space-y-3 px-4 pb-10 mx-auto overflow-hidden transition-all shadow-xl'>
      <h2 className='text-2xl font-syne font-extrabold text-center'>Boost</h2>
      <div className='space-y-5'>
        <div className='space-y-3'>
          <h3 className='text-syne text-base'>Daily boosters</h3>
          <div className='space-y-3'>
            {dailyBooster.map(b => {
              return (
                <div
                  key={b.type}
                  className={cn(
                    'flex items-center gap-x-2 px-4 py-3 rounded-lg border border-[#FFEAB5]',
                    {
                      'bg-linear13': b.type === 'daily',
                      'bg-linear14': b.type === 'timing',
                      'opacity-40': !b.isActive,
                    }
                  )}
                >
                  {b.img}
                  <div className='space-y-2'>
                    <h4 className='text-[#FFDFA2] text-base font-syne font-semibold'>
                      {b.title}
                    </h4>
                    <div className='text-[#FFDFA2]/60 text-sm'>{b.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className='space-y-5'>
          <div className='space-y-3'>
            <h3 className='text-syne text-base'>Boosters</h3>
            <div className='space-y-3'>
              {proofBooster.map(b => {
                return (
                  <button
                    onClick={() => handleBoost(b)}
                    key={b.type}
                    className={cn(
                      'w-full flex items-center justify-between gap-x-2 px-4 py-3 rounded-lg border border-[#FFEAB5] bg-linear14',
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
                        <div className='text-[#FFDFA2]/60 text-sm'>
                          {b.desc}
                        </div>
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
      </div>

      <BoostDrawer
        open={openMulti}
        onCancel={() => {
          setOpenMulti(false);
        }}
        data={boostData}
      />
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
