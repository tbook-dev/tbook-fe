import Layout from '@/layout/custom/Layout';
import LazyImage from '../../components/lazyImage';

import { Tooltip } from 'antd';
import {
  VITE_TBOOK_TG_CHANNEL,
  VITE_TBOOK_TG_GROUP,
  VITE_TBOOK_BOOST_TG_CHANNEL,
} from '@/utils/tma';

import WebApp from '@twa-dev/sdk';

import x from '@/images/icon/x-black.svg';
import gamebuildIcon from './icons/gamebuild.svg';

import { useTelegram } from '@/hooks/useTg';

export default function About () {
  const { isTMA } = useTelegram();
  const companyInfo = {
    companyName: 'GameBuild',
    companyDescription: 'Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler...Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler...Two roads diverged in a yellow wood, And sorry I could not travel both And be one traveler...',
    logo: 'https://static.tbook.vip/img/727268307945493fb37e46c6fd7183d1',
    aboutBgImage: "https://static.tbook.vip/img/1a87d2e5bf3c498693f0c8ca64919797",
    poster: 'https://static.tbook.vip/img/e1c62af9c2524cc5a5a6de657eb96be9',
    channelName: '@GAMEBUILD_ANNOUCEMENT',
    channelLink: '@GAMEBUILD_ANNOUCEMENT',
    twitterLink: 'https://twitter.com/gamebuild',
    webUrl: 'https://gamebuild.com',
  }

  return (
    <Layout>
      <div className='bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] min-h-screen'>
        <div className='relative h-[228px] '>
          <LazyImage className="w-full h-[178px] rounded-3xl absolute bg-[#dad8ff]" src={ companyInfo.aboutBgImage } alt='poster' />
        </div>
        <div className='flex justify-center mt-[-100px]'>
          <LazyImage theme="light" className="w-[100px] h-[100px] rounded-full absolute z-10 border-[3px] border-white" src={ companyInfo.logo } alt='logo' />
        </div>
        <div className='px-4 pb-32 mt-[100px]'>
          <h1 className='text-3xl font-extrabold text-center'>{ companyInfo.companyName }</h1>

          <div className='font-bold text-[#9A81E6] text-sm text-center m-2'
            onClick={ () => WebApp.openTelegramLink(companyInfo.channelLink || VITE_TBOOK_TG_CHANNEL) }>
            { companyInfo.channelName }
          </div>

          <div className='leading-7 text-center text-md'>{ companyInfo.companyDescription }</div>

          <div className='flex items-center justify-center my-2 gap-x-3'>
            <a
              target={ isTMA ? '_self' : '_blank' }
              href={ isTMA ? companyInfo.webUrl : `https://t.me/${companyInfo.channelLink}` }
              rel='nofollow noopener noreferrer'
            >
              <Tooltip title={ companyInfo.webUrl } placement='top'>
                <img
                  src={ gamebuildIcon }
                  className='object-center w-6 h-6'
                />
              </Tooltip>
            </a>
            <a
              target={ isTMA ? '_self' : '_blank' }
              href={ isTMA ? companyInfo.twitterLink : `https://t.me/${companyInfo.channelLink}` }
              rel='nofollow noopener noreferrer'
            >
              <Tooltip title={ companyInfo.webUrl } placement='top'>
                <img
                  src={ x }
                  className='object-center w-6 h-6'
                />
              </Tooltip>
            </a>
          </div>

        </div>
      </div>
    </Layout>
  );
}