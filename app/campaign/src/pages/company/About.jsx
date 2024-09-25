import Layout from '@/layout/custom/Layout';
import WebApp from '@twa-dev/sdk';

import { Tooltip } from 'antd';
import { useParams } from 'react-router-dom';
import { useTelegram } from '@/hooks/useTg';

import x from '@/images/icon/x-black.svg';
import gamebuildIcon from './icons/Gamebuild.svg';

import LazyImage from '../../components/lazyImage';
import useCompanyProjects from '@/hooks/useCompanyProjects';

export default function About () {
  const { isTMA } = useTelegram();
  const { companyId } = useParams();

  const { data, isLoading } = useCompanyProjects(companyId);

  const companyInfo = data?.data?.company ?? null;

  return (
    <Layout title={ `About ${companyInfo?.companyName || ''}` }>
      { !isLoading && <div className='bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] min-h-screen'>
        <div className='relative h-[228px] '>
          <LazyImage className="w-full h-[178px] rounded-3xl absolute bg-[#dad8ff]" src={ companyInfo.aboutBgImage } alt='poster' />
        </div>
        <div className='flex justify-center mt-[-100px]'>
          <LazyImage theme="light" className="w-[100px] h-[100px] rounded-full absolute z-10 border-[3px] border-white" src={ companyInfo.logo } alt='logo' />
        </div>
        <div className='px-4 pb-32 mt-[100px]'>
          <h1 className='py-2 text-3xl font-extrabold text-center'>{ companyInfo.companyName }</h1>

          { 
          (companyInfo.channelLink && companyInfo.channelName) 
          && <div className='font-bold text-[#9A81E6] text-sm text-center m-2'
            onClick={ () => WebApp.openTelegramLink(companyInfo.channelLink) }>
            { companyInfo.channelName }
          </div>
          }

          <div className='leading-7 text-center text-md'
            dangerouslySetInnerHTML={ { __html: companyInfo.companyDescription } }
          ></div>

          <div className='flex items-center justify-center my-2 gap-x-3'>
            <a
              target={ isTMA ? '_self' : '_blank' }
              href={ companyInfo.webUrl }
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
              href={ companyInfo.twitterLink }
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
      }
    </Layout>
  );
}