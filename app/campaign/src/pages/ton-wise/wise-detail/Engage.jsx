import { useMemo } from 'react';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import NotcoinIcon from '@/images/icon/svgr/notcoin.svg?react';
import CredentialIcon from '@/images/icon/svgr/credential.svg?react';
import EthIcon from '@/images/icon/svgr/eth.svg?react';
import RefreshIcon from '@/images/icon/svgr/refresh.svg?react';
import useWiseScore from '@/hooks/useWiseScore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Task from '../components/task';
import Button from '../components/button';
import { formatImpact } from '@tbook/utils/lib/conf';

const modlueConf = {
  credential: 'Obtained Credentials',
  footprint: 'Onchain Footprint',
};

export default function Engage() {
  const { data: wiseScore } = useWiseScore();
  const navigate = useNavigate();
  const credentialList = useMemo(() => {
    const credentialScore = wiseScore?.engagementScore?.credentialScore ?? 0;
    return [
      {
        type: 'credential',
        name: `${formatImpact(credentialScore)} Credential${
          credentialScore > 1 ? 's' : ''
        }`,
        handle: () => {},
        finished: true,
        sucess: <CredentialIcon />,
      },
    ];
  }, [wiseScore]);
  const footprintList = useMemo(() => {
    const tonTransactionsScore =
      wiseScore?.engagementScore?.tonTransactionsScore ?? 0;
    const notCoinTransactionScore =
      wiseScore?.engagementScore?.notCoinTransactionScore ?? 0;
    const evmTransactionsScore =
      wiseScore?.engagementScore?.evmTransactionsScore ?? 0;
    const tonStakeScore = wiseScore?.engagementScore?.tonStakeScore ?? 0;
    const tonLiquidityProvideScore =
      wiseScore?.engagementScore?.tonLiquidityProvideScore ?? 0;
    return [
      {
        type: 'toncoin',
        name: 'Toncoin Ranger',
        handle: () => {
          navigate(`/wise-score/identity/1/abtain`);
        },
        finished: tonTransactionsScore > 0,
        sucess: (
          <Link to="/wise-score/identity/1/ranger">
            <TonIcon />
          </Link>
        ),
      },
      {
        type: 'notcoin',
        name: 'Notcoin Ranger',
        handle: () => {
          navigate(`/wise-score/identity/2/abtain`);
        },
        finished: notCoinTransactionScore > 0,
        sucess: (
          <Link to="/wise-score/identity/2/ranger">
            <NotcoinIcon />
          </Link>
        ),
      },
      // {
      //   type: 'eth',
      //   name: 'ETH Ranger',
      //   handle: () => {
      //     navigate(`/wise-score/identity/3/abtain`);
      //   },
      //   finished: evmTransactionsScore > 0,
      //   sucess: (
      //     <Link to='/wise-score/identity/3/ranger'>
      //       <EthIcon />
      //     </Link>
      //   ),
      // },
      // {
      //   type: 'toncoinStaker',
      //   name: 'Toncoin Staker',
      //   handle: () => {
      //     navigate(`/wise-score/identity/4/abtain`);
      //   },
      //   finished: tonStakeScore > 0,
      //   sucess: (
      //     <Link to="/wise-score/identity/4/ranger" className="relative">
      //       <TonIcon />
      //       <span className="text-xs absolute -bottom-1 right-[-7px] font-medium">
      //         %
      //       </span>
      //     </Link>
      //   ),
      // },
      {
        type: 'toncoinLiquidityProvider',
        name: 'Liquidity Provider',
        handle: () => {
          navigate(`/wise-score/identity/5/abtain`);
        },
        finished: tonLiquidityProvideScore > 0,
        sucess: (
          <Link to="/wise-score/identity/5/ranger" className="relative">
            <TonIcon />
            <RefreshIcon className="size-3 absolute -bottom-1 right-[-7px]" />
          </Link>
        ),
      },
    ];
  }, [wiseScore]);
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium">{modlueConf.credential}</h2>
          <Link to="/ton-explore">
            <Button>Improve</Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {credentialList.map((v) => {
            return (
              <div
                key={v.type}
                className="flex flex-col justify-between items-center"
              >
                <div className="flex items-center justify-center gap-y-1 size-10 rounded-full bg-white/10">
                  <Task {...v} />
                </div>
                <span className="text-xs">{v.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-base">{modlueConf.footprint}</h2>
        <div className="grid grid-cols-3 gap-3">
          {footprintList.map((v) => {
            return (
              <div
                key={v.type}
                className="flex flex-col justify-between items-center"
              >
                <div className="flex items-center justify-center gap-y-1 size-10 rounded-full bg-white/10">
                  <Task {...v} />
                </div>

                <span className="text-xs">{v.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
