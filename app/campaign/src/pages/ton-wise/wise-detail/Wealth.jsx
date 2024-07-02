import { useMemo, memo } from 'react';
import WebApp from '@twa-dev/sdk';
import { Tooltip } from 'antd';
import useWiseScore from '@/hooks/useWiseScore';
import CheckedIcon from '@/images/icon/svgr/checked.svg?react';

function Wealth () {
  const { data } = useWiseScore();

  const actionList = useMemo(() => {
    return [
      {
        title: 'New Money on TON',
        tip: null,
        onClick: () => {
          WebApp.openTelegramLink(`https://t.me/ston_app_bot/swap`);
        },
        isFinished: data?.wealthScore?.tonWealthScore > 0,
      },
      {
        title: 'New Money on ETH',
        tip: 'Deposit ETH into your wallet to improve your wealth score.',
        isFinished: data?.wealthScore?.ethWealthScore > 0,
      },
    ];
  }, [data]);
  return (
    <div className='space-y-1'>
      {actionList.map(a => {
        return (
          <div
            key={a.title}
            className='flex justify-between items-center border border-white/30 rounded-lg px-5 py-1.5 text-sm text-white'
          >
            {a.title}

            {a.isFinished ? (
              <CheckedIcon />
            ) : a.tip ? (
              <Tooltip title={a.tip}>
                <button className='font-medium px-3 py-1.5 rounded bg-[#904BF6]  hover:opacity-70'>
                  Improve
                </button>
              </Tooltip>
            ) : (
              <button
                onClick={a.onClick}
                className='font-medium px-3 py-1.5 rounded bg-[#904BF6] hover:opacity-70 btn-click'
              >
                Improve
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(Wealth);
