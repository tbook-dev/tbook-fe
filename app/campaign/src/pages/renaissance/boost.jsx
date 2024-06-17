import { ConfigProvider, message } from 'antd';
import { useMemo } from 'react';
import moduleConf from './conf';
import { formatImpact } from '@tbook/utils/lib/conf';

export default function Boost () {
  const [messageApi, contextHolder] = message.useMessage();
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
          title: 'Daily Free Scratch Cards',
          desc: `${freeCardLeftcnt}/5 available`,
          img: <img src={moduleConf.url.cat} />,
          isActive: true,
        },
        {
          title: 'Timing Bonus',
          desc: `1 free card per 10min, max 5 times per day`,
          img: '⏰',
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
              <img src={moduleConf.url.tpoint} className='size-3' />
              {formatImpact(multi.point)}TPoints · {multi.level}
            </div>
          ),
          pic: '⚡',
          isActive: true,
        },
        {
          type: 'per',
          title: 'Multi Scratch Cards',
          desc: (
            <div className='flex items-center'>
              <img src={moduleConf.url.tpoint} className='size-3' />
              {formatImpact(per.point)}TPoints · {per.level}
            </div>
          ),
          pic: '☄️',
          isActive: true,
        },
        {
          type: 'direct',
          title: 'Buy Scratch Cards',
          desc: (
            <div className='flex items-center'>
              <img src={moduleConf.url.tpoint} className='size-3' />
              {formatImpact(150)}TPoints · Card
            </div>
          ),
          pic: '💰',
          isActive: false, // deps
        },
      ];
    },
    [
      /* user info */
    ]
  );

  return (
    <div className='space-y-5 mx-auto overflow-hidden transition-all shadow-xl'>
      <h2 className='text-2xl font-syne font-extrabold'>Boost</h2>
      <div className='h-[200px] bg-red-400' />
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
