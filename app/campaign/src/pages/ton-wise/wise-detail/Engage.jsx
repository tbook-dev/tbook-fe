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
import CredentialIcon from '@/images/icon/svgr/credential.svg?react';
import useWiseScore from '@/hooks/useWiseScore';
import useTonToolkit from '@/components/ton/useTon';
import Address from '../components/tipAddress';
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Task from '../components/task';
import Button from '../components/button';
import { formatImpact } from '@tbook/utils/lib/conf';

const modlueConf = {
  credential: 'Obtained Credentials',
  footprint: 'Onchain Footprint',
};

export default function Engage () {
  const { data: wiseScore } = useWiseScore();
  const navigate = useNavigate();
  const credentialList = useMemo(() => {
    return [
      {
        type: 'credential',
        name: `${formatImpact(1000)} Credentials`,
        handle: () => {},
        finished: true,
        sucess: <CredentialIcon />,
      },
    ];
  }, []);
  const footprintList = useMemo(() => {
    return [
      {
        type: 'toncoin',
        name: 'Toncoin LP',
        handle: () => {
          navigate(`/wise-score/identity/not-coin/abtain`);
        },
        finished: wiseScore?.identityScore?.notCoinHolderScore > 0,
        sucess: (
          <Link to='/wise-score/identity/not-coin/ranger'>
            <TonIcon />
          </Link>
        ),
      },
      {
        type: 'notcoin',
        name: 'Notcoin LP',
        handle: () => {
          navigate(`/wise-score/identity/not-coin/abtain`);
        },
        finished: wiseScore?.identityScore?.notCoinHolderScore > 0,
        sucess: (
          <Link to='/wise-score/identity/not-coin/ranger'>
            <NotcoinIcon />
          </Link>
        ),
      },
    ];
  }, []);
  return (
    <div className='space-y-5'>
      <div className='space-y-3'>
        <div className='flex items-center justify-between'>
          <h2 className='text-base'>{modlueConf.credential}</h2>
          <Button>Improve</Button>
        </div>
        <div className='grid grid-cols-3 gap-3'>
          {credentialList.map(v => {
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
      <div className='space-y-3'>
        <h2 className='text-base'>{modlueConf.footprint}</h2>
        <div className='grid grid-cols-3 gap-3'>
          {footprintList.map(v => {
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
    </div>
  );
}
