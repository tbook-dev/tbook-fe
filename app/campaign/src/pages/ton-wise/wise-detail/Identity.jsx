import useWallet from '@/hooks/useWallet';
import useSocial from '@/hooks/useSocial';
import Done from './Done';
import { useTelegram } from '@/hooks/useTg';
import { Tooltip } from 'antd';
import { useMemo } from 'react';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import EthIcon from '@/images/icon/svgr/eth.svg?react';
import LockIcon from '@/images/icon/svgr/lock.svg?react';
import useTonToolkit from '@/components/ton/useTon';
import Address from '../components/tipAddress';

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

  // const identityStatus = walletStatus
  //   .map(v => ({
  //     ...v,
  //     handle: v.connectHandle,
  //   }))
  //   .concat(
  //     socialList.map(v => ({
  //       ...v,
  //       handle: () => {
  //         v.loginFn(false);
  //       },
  //       type: v.name,
  //     }))
  //   )
  //   .filter(v => !v.connected);
  const omniList = useMemo(() => {
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
    ];
  }, [evm, ton, canConnectEvm]);

  return (
    <div className='pt-6 space-y-5'>
      <div className='space-y-3'>
        <div>
          <h2 className='text-base'>{modlueConf.omni.title}</h2>
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
                  {v.finished ? (
                    v.sucess
                  ) : v.selfTask ? (
                    <v.selfTask className='hover:opacity-70 btn-click'>
                      <LockIcon />
                    </v.selfTask>
                  ) : (
                    <button
                      onClick={v.handle}
                      className='hover:opacity-70 btn-click'
                    >
                      <LockIcon />
                    </button>
                  )}
                </div>

                <span className='text-xs'>{v.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
