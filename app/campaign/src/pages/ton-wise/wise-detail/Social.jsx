import useWiseScore from '@/hooks/useWiseScore';
import { formatImpact } from '@tbook/utils/lib/conf';
import Telegram from '../modal/telegram';
import Discord from '../modal/discord';
import useWiseSocialMutation from '@/hooks/useWiseSocialMutation';
import { useState, useCallback } from 'react';
import { message } from 'antd';
import Empty from '@/components/empty';
import Button from '../components/button';
import { useMemo } from 'react';

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
  const actionList = useMemo(() => {
    const twitterFollowers = data?.socialScore?.twitterFollowerScore ?? 0;
    const telegrams = (data?.userDcTgShareLink ?? []).filter(
      v => v.socialType === 2
    );
    return [
      {
        type: 'telegram',
        show: true,
        actionName: 'Telegram AllStar Stats',
        handle: () => {
          setTg(true);
        },
        list: telegrams.map((v, id) => ({
          picUrl: 'https://campaign-staging.tbook.com/logo.svg',
          title: `${formatImpact(v.memberCount)} Fans`,
          extralInfo: true ? 'Telegram Channel' : 'Telegram Group',
          id,
        })),
      },
      {
        type: 'twitter',
        show: twitterFollowers > 0,
        actionName: 'Twitter AllStar Stats',
        handle: null,
        list: [
          {
            picUrl: 'https://campaign-staging.tbook.com/logo.svg',
            title: `${formatImpact(twitterFollowers)} Followers`,
            extralInfo: null,
            id: 1,
          },
        ],
      },
      {
        type: 'discord',
        show: true,
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
  }, [data]);

  return (
    <>
      {contextHolder}
      <Telegram open={tgOpen} onClose={handleTgClose} mutation={mutation} />
      <Discord open={dcOpen} onClose={handleDcClose} mutation={mutation} />

      <div className='space-y-5'>
        <div className='flex flex-col gap-y-4'>
          {actionList
            .filter(v => v.show)
            .map(v => {
              return (
                <div key={v.type} className='space-y-3' onClick={v.handle}>
                  <div className='flex justify-between items-center'>
                    <h3>{v.actionName}</h3>
                    {v.handle && <Button>Improve</Button>}
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
                            {p.title && (
                              <h4 className='text-white'>{p.title}</h4>
                            )}
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
