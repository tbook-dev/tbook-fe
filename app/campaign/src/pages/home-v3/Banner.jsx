import { useMemo } from 'react';

import RichMore from '@/components/textMore/rich';
import LazyImage from '@/components/lazyImage';

import x from '@/images/icon/x-black.svg';
import dc from '@/images/icon/dc.svg';
import tg from '@/images/icon/tg-blue.svg';

import { Tooltip, Skeleton } from 'antd';

import { formatStandard } from '@tbook/utils/lib/conf';

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
  }, [ campaignNum, participantNum ]);

  return (
    <div className='flex flex-col gap-8 lg:flex-row'>

      {/* for Large size */}
      <LazyImage
        src={ avatarUrl }
        alt={ projectName + 'logo' }
        className='w-20 h-20 hidden lg:block lg:w-[108px] lg:h-[108px] object-contain object-center rounded-full flex-none'
      />

      <div className='space-y-4 lg:w-[628px]'>
        <h2 className='text-2xl text-black font-zen-dot'>{ projectName }</h2>
        <div className='flex items-center gap-2'>
          { tags.map((v, i) => (
            <div
              key={ i }
              className='text-[#9A81E6] text-xs px-1.5 py-1 border border-[#9A81E6] rounded-2.5xl'
            >
              { v }
            </div>
          )) }
        </div>
        <div className='text-sm'>
          <RichMore value={ projectDescription } />
        </div>
        { socialList.length > 0 && (
          <div className='flex items-center gap-x-3'>
            { socialList.map(v => {
              return (
                <a
                  key={ v.name }
                  target={ isTMA ? '_self' : '_blank' }
                  href={ v.link }
                  rel='nofollow noopener noreferrer'
                >
                  <Tooltip title={ v.link } placement='top'>
                    <img
                      src={ v.picUrl }
                      className='object-center w-6 h-6'
                      alt={ v.name + ' logo' }
                    />
                  </Tooltip>
                </a>
              );
            }) }
          </div>
        ) }

        <div className='flex flex-col gap-2 text-sm lg:hidden'>
          { isLoading ? (
            <Skeleton active paragraph={ { rows: 1 } } title={ false } />
          ) : (
            users.map(v => {
              return (
                <div key={ v.text }>
                  <span className='mr-1 font-zen-dot text-[#9A81E6]'>{ v.num }</span>
                  { v.text }
                </div>
              );
            })
          ) }
        </div>
      </div>
      <div className='justify-end flex-auto hidden lg:flex'>
        <div className='text-sm flex pt-[54px] gap-16 text-right'>
          { isLoading ? (
            <Skeleton
              active
              paragraph={ { rows: 2, width: 206 } }
              title={ false }
            />
          ) : (
            users.map(v => {
              return (
                <div key={ v.text } className='space-y-2 font-sm'>
                  <div className='text-xl font-zen-dot'>{ v.num }</div>
                  { v.text }
                </div>
              );
            })
          ) }
        </div>
      </div>
    </div>
  );
}
