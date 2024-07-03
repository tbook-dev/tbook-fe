import useWiseScore from '@/hooks/useWiseScore';
import { formatImpact } from '@tbook/utils/lib/conf';
import Telegram from '../modal/telegram';
import Discord from '../modal/discord';
import useWiseSocialMutation from '@/hooks/useWiseSocialMutation';
import { useState, useCallback } from 'react';
import { message } from 'antd';
import Button from '../components/button';
import { useMemo } from 'react';
import useSocial from '@/hooks/useSocial';

export default function Social () {
  const [messageApi, contextHolder] = message.useMessage();
  const mutation = useWiseSocialMutation(messageApi);
  const { getSocialByName } = useSocial();
  const twitter = getSocialByName('twitter');

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
    const dcs = (data?.userDcTgShareLink ?? []).filter(v => v.socialType === 1);
    return [
      {
        type: 'telegram',
        actionName: 'Telegram AllStar Stats',
        handle: () => {
          setTg(true);
        },
        list: telegrams.map((v, id) => ({
          picUrl: 'https://campaign-staging.tbook.com/logo.svg',
          title: `${formatImpact(v.memberCount)} Fans`,
          extralInfo: v.title,
          id,
        })),
        emptyText: '🔥Submit channel/group fans to improve WISE Score!',
      },
      {
        type: 'twitter',
        actionName: 'Twitter AllStar Stats',
        handle: null,
        list:
          twitterFollowers > 0
            ? [
                {
                  picUrl: 'https://campaign-staging.tbook.com/logo.svg',
                  title: `${formatImpact(twitterFollowers)} Followers`,
                  extralInfo: null,
                  id: 1,
                },
              ]
            : [],
        emptyText: (
          <>
            🔥
            <button
              onClick={twitter.loginFn}
              className='text-[#904BF6] text-xs underline underline-offset-2'
            >
              Connect X
            </button>
            , submit followers to improve WISE Score!
          </>
        ),
      },
      {
        type: 'discord',
        actionName: 'Discord AllStar Stats',
        handle: () => {
          setDc(true);
        },
        list: dcs.map((v, id) => ({
          picUrl: 'https://campaign-staging.tbook.com/logo.svg',
          title: `${formatImpact(v.memberCount)} Fans`,
          extralInfo: v.title,
          id,
        })),
        emptyText: '🔥Submit your server fans to improve your WISE Score!',
      },
    ];
  }, [data, twitter]);

  return (
    <>
      {contextHolder}
      <Telegram open={tgOpen} onClose={handleTgClose} mutation={mutation} />
      <Discord open={dcOpen} onClose={handleDcClose} mutation={mutation} />

      <div className='space-y-5'>
        <div className='flex flex-col gap-y-4'>
          {actionList.map(v => {
            return (
              <div key={v.type} className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <h3>{v.actionName}</h3>
                  {v.handle && <Button onClick={v.handle}>Improve</Button>}
                </div>
                {v.list.length > 0 ? (
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
                              <p className='text-white/40 line-clamp-2'>
                                {p.extralInfo}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className='text-white/60 text-xs text-center'>
                    {v.emptyText}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
