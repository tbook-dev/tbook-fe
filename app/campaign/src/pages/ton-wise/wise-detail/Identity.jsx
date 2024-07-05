import useWallet from '@/hooks/useWallet';
import useSocial from '@/hooks/useSocial';
import { useTelegram } from '@/hooks/useTg';
import { Tooltip } from 'antd';
import { useMemo } from 'react';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import EthIcon from '@/images/icon/svgr/eth.svg?react';
import LockIcon from '@/images/icon/svgr/lock.svg?react';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import TgPremiumIcon from '@/images/icon/svgr/tg-premium.svg?react';
import XIcon from '@/images/icon/svgr/x.svg?react';
import DcIcon from '@/images/icon/svgr/dc.svg?react';
import NotcoinIcon from '@/images/icon/svgr/notcoin.svg?react';
import useWiseScore from '@/hooks/useWiseScore';
import useTonToolkit from '@/components/ton/useTon';
import Address from '../components/tipAddress';
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Task from '../components/task';
const modlueConf = {
  omni: {
    title: 'Omni Identity',
    desc: 'Obtain Omni Identity Credentials to improve WISE Score.',
  },
  pioneer: {
    title: 'Pioneer Identity',
    desc: 'Obtain Pioneer Identity Credentials to improve WISE Score.',
  },
};

export default function Identity () {
  const { getWallets } = useWallet();
  const { socialList } = useSocial();
  const { canConnectEvm } = useTelegram();
  const [evm, ton] = getWallets(['evm', 'ton']);
  const { disconnectTon } = useTonToolkit();
  const { data: wiseScore } = useWiseScore();
  const navigate = useNavigate();
  const omniList = useMemo(() => {
    const [dc, tw, tg] = socialList;
    return [
      {
        type: 'ton',
        name: 'TON',
        handle: ton.connectHandle,
        finished: ton.connected,
        sucess: (
          <Address address={ton.address} disconnect={disconnectTon}>
            <TonIcon />
          </Address>
        ),
      },
      {
        type: 'tg-premium',
        name: 'Telegram Premium',
        handle: () => {
          WebApp.openTelegramLink(`https://t.me/premium`);
        },
        finished: wiseScore?.identityScore?.tgPremium > 0,
        sucess: <TgPremiumIcon />,
      },
      {
        type: 'tg',
        name: 'Telegram',
        handle: tg.loginFn,
        finished: tg.connected,
        sucess: (
          <Tooltip title={tg.userName}>
            <TgIcon fill='#229ED9' />
          </Tooltip>
        ),
      },
      {
        type: 'evm',
        name: 'EVM',
        handle: evm.connectHandle,
        finished: evm.connected,
        sucess: (
          <Address address={ton.address}>
            <EthIcon />
          </Address>
        ),
        selfTask: canConnectEvm
          ? null
          : ({ children }) => (
              <Tooltip
                title={() => (
                  <>
                    <p>For now, you could bind EVM address in web browser.</p>
                    <a
                      target='_blank'
                      href={`${window.location.origin}/edit-attestation`}
                      className='block hover:text-white underline hover:underline break-all'
                    >
                      {window.location.origin}/edit-attestation
                    </a>
                  </>
                )}
              >
                {children}
              </Tooltip>
            ),
      },
      {
        type: 'x',
        name: 'Twitter',
        handle: tw.loginFn,
        finished: tw.connected,
        sucess: (
          <Tooltip title={tw.userName}>
            <XIcon />
          </Tooltip>
        ),
      },
      {
        type: 'dc',
        name: 'Discord',
        handle: dc.loginFn,
        finished: dc.connected,
        sucess: (
          <Tooltip title={dc.userName}>
            <DcIcon />
          </Tooltip>
        ),
      },
    ];
  }, [evm, ton, canConnectEvm, wiseScore, socialList]);
  // const pioneerList = useMemo(() => {
  //   return [
  //     {
  //       type: 'notcoin',
  //       name: 'Notcoin Ranger',
  //       handle: () => {
  //         navigate(`/wise-score/identity/1/abtain`);
  //       },
  //       finished: wiseScore?.identityScore?.notCoinHolderScore > 0,
  //       sucess: (
  //         <Link to='/wise-score/identity/1/ranger'>
  //           <NotcoinIcon />
  //         </Link>
  //       ),
  //     },
  //   ];
  // }, [wiseScore]);
  return (
    <div className='space-y-5'>
      <div className='space-y-3'>
        <div>
          <h2 className='text-base font-medium'>{modlueConf.omni.title}</h2>
          <p className='text-xs text-white/40'>{modlueConf.omni.desc}</p>
        </div>
        <div className='grid grid-cols-3 gap-3'>
          {omniList.map(v => {
            return (
              <div
                key={v.type}
                className='flex flex-col justify-between items-center'
              >
                <div className='flex items-center justify-center gap-y-1 size-10 rounded-full bg-white/10'>
                  <Task {...v} />
                </div>

                <span className='text-xs'>{v.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className='space-y-3'>
        <div>
          <h2 className='text-base'>{modlueConf.pioneer.title}</h2>
          <p className='text-xs text-white/40'>{modlueConf.pioneer.desc}</p>
        </div>
        <div className='grid grid-cols-3 gap-3'>
          {pioneerList.map(v => {
            return (
              <div
                key={v.type}
                className='flex flex-col justify-between items-center'
              >
                <div className='flex items-center justify-center gap-y-1 size-10 rounded-full bg-white/10'>
                  <Task {...v} />
                </div>

                <span className='text-xs'>{v.name}</span>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}
