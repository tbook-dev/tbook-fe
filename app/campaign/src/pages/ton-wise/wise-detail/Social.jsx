import useWiseScore from '@/hooks/useWiseScore';
import { formatImpact } from '@tbook/utils/lib/conf';
import Telegram from '../modal/telegram';
import Discord from '../modal/discord';
import useWiseSocialMutation from '@/hooks/useWiseSocialMutation';
import { useState, useCallback } from 'react';
import { message } from 'antd';
import Empty from '@/components/empty';

const modlueConf = {
  title: 'Improve your WISE Score',
  acionMap: {
    telegram: 'your telegram group/channel subscribers',
    discord: 'your discord server subscribers',
  },
  recordTitle: 'Submission Record',
  recordMap: {
    // 1: 'Telegram Channel',
    2: 'Telegram Channel/Telegram Group',
    3: 'Discord Server',
  },
};

export default function Social () {
  const [messageApi, contextHolder] = message.useMessage();
  const mutation = useWiseSocialMutation(messageApi);
  const { data } = useWiseScore();
  const [tgOpen, setTg] = useState(false);
  const [dcOpen, setDc] = useState(false);

  const handleTgClose = useCallback(() => {
    setTg(false);
  }, []);
  const handleDcClose = useCallback(() => {
    setDc(false);
  }, []);
  const actionList = [
    {
      type: 'telegram',
      show: true,
      actionName: 'Telegram AllStar Stats',
      handle: () => {
        setTg(true);
      },
      list: [
        {
          picUrl: 'https://campaign-staging.tbook.com/logo.svg',
          title: `${formatImpact(1000)} Fans`,
          extralInfo: true ? 'Telegram Channel' : 'Telegram Group',
          id: 1,
        },
        {
          picUrl: 'https://campaign-staging.tbook.com/logo.svg',
          title: `${formatImpact(1000)} Fans`,
          extralInfo: true ? 'Telegram Channel' : 'Telegram Group',
          id: 2,
        },
        {
          picUrl: 'https://campaign-staging.tbook.com/logo.svg',
          title: `${formatImpact(1000)} Fans`,
          extralInfo: true ? 'Telegram Channel' : 'Telegram Group',
          id: 3,
        },
        {
          picUrl: 'https://campaign-staging.tbook.com/logo.svg',
          title: `${formatImpact(1000)} Fans`,
          extralInfo: true ? 'Telegram Channel' : 'Telegram Group',
          id: 4,
        },
      ],
    },
    {
      type: 'twitter',
      show: '',
      actionName: 'Twitter AllStar Stats',
      handle: null,
      list: [
        {
          picUrl: 'https://campaign-staging.tbook.com/logo.svg',
          title: `${formatImpact(1000)} Followers`,
          extralInfo: null,
          id: 1,
        },
      ],
    },
    {
      type: 'discord',
      show: false,
      actionName: 'Discord AllStar Stats',
      handle: () => {
        setDc(true);
      },
      list: [
        {
          picUrl: 'https://campaign-staging.tbook.com/logo.svg',
          title: null,
          extralInfo: 'Discord Server',
          id: 1,
        },
        {
          picUrl: 'https://campaign-staging.tbook.com/logo.svg',
          title: null,
          extralInfo: 'Discord Server',
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      {contextHolder}
      <Telegram open={tgOpen} onClose={handleTgClose} mutation={mutation} />
      <Discord open={dcOpen} onClose={handleDcClose} mutation={mutation} />

      <div className='space-y-5'>
        <div className='flex flex-col gap-y-4'>
          {actionList.map(v => {
            return (
              <div key={v.type} className='space-y-3' onClick={v.handle}>
                <div className='flex justify-between items-center'>
                  <h3>{v.actionName}</h3>
                  {v.handle && (
                    <button className='text-white font-medium text-sm bg-[#904BF6] rounded px-3 py-1.5 btn-click'>
                      Improve
                    </button>
                  )}
                </div>
                <div className='grid grid-cols-3 gap-3'>
                  {v.list.map(p => {
                    return (
                      <div
                        key={p.id}
                        className='flex flex-col items-center text-xs gap-1'
                      >
                        <img
                          src={p.picUrl}
                          alt={`${v.type}-${v.extralInfo}`}
                          className='size-10 rounded-full'
                        />
                        <div className='space-y-0.5 text-center'>
                          {p.title && <h4 className='text-white'>{p.title}</h4>}
                          {p.extralInfo && (
                            <p className='text-white/40'>{p.extralInfo}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
