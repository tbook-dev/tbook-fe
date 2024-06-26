import RichMore from '@/components/textMore/rich';
import { useMemo } from 'react';
import x from '@/images/icon/x-white.svg';
import dc from '@/images/icon/dc.svg';
import tg from '@/images/icon/tg.svg';
import { Tooltip } from 'antd';
import { formatStandard } from '@tbook/utils/lib/conf';
import LazyImage from '@/components/lazyImage';
import { Skeleton } from 'antd';
import { useTelegram } from '@/hooks/useTg';

export default function Banner ({
  avatarUrl,
  projectName,
  twitterLink,
  telegramLink,
  tags,
  projectDescription,
  campaignNum,
  participantNum,
  isLoading,
}) {
  const { isTMA } = useTelegram();
  const socialList = useMemo(() => {
    return [
      {
        name: 'x',
        picUrl: x,
        link: twitterLink,
      },
      {
        name: 'tg',
        picUrl: tg,
        link: telegramLink,
      },
      // {
      //   name: "dc",
      //   picUrl: dc,
      //   link: "",
      // },
    ].filter(v => !!v.link);
  }, []);
  const users = useMemo(() => {
    return [
      {
        num: formatStandard(campaignNum),
        text: campaignNum > 1 ? 'Campaigns' : 'Campaign',
      },
      {
        num: formatStandard(participantNum),
        text: participantNum > 1 ? 'Participants' : 'Participant',
      },
    ];
  }, [campaignNum, participantNum]);

  return (
    <div className='flex flex-col gap-8 lg:flex-row'>
      <LazyImage
        src={avatarUrl}
        alt={projectName + 'logo'}
        className='w-20 h-20 hidden lg:block lg:w-[108px] lg:h-[108px] object-contain object-center rounded-full flex-none'
      />

      <div className='space-y-4 lg:w-[628px]'>
        <h2 className='text-2xl font-zen-dot'>{projectName}</h2>
        <div className='flex items-center gap-2'>
          {tags.map((v, i) => (
            <div
              key={i}
              className='text-[#FCFCFC] text-xs px-1.5 py-1 border border-[#FCFCFC] rounded-2.5xl'
            >
              {v}
            </div>
          ))}
        </div>
        <div className='text-[#A1A1A2] text-sm'>
          <RichMore value={projectDescription} />
        </div>

        {socialList.length > 0 && (
          <div className='flex items-center gap-x-3'>
            {socialList.map(v => {
              return (
                <a
                  key={v.name}
                  target={isTMA ? '_self' : '_blank'}
                  href={v.link}
                  rel='nofollow noopener noreferrer'
                >
                  <Tooltip title={v.link} placement='top'>
                    <img
                      src={v.picUrl}
                      className='w-6 h-6 object-center'
                      alt={v.name + ' logo'}
                    />
                  </Tooltip>
                </a>
              );
            })}
          </div>
        )}

        <div className='text-sm flex items-center gap-8 lg:hidden'>
          {isLoading ? (
            <Skeleton active paragraph={{ rows: 1 }} title={false} />
          ) : (
            users.map(v => {
              return (
                <div key={v.text}>
                  <span className='font-zen-dot mr-1'>{v.num}</span>
                  {v.text}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className='lg:flex justify-end flex-auto hidden'>
        <div className='text-sm flex pt-[54px] gap-16 text-right'>
          {isLoading ? (
            <Skeleton
              active
              paragraph={{ rows: 2, width: 206 }}
              title={false}
            />
          ) : (
            users.map(v => {
              return (
                <div key={v.text} className='space-y-2 font-sm'>
                  <div className='font-zen-dot text-xl'>{v.num}</div>
                  {v.text}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
