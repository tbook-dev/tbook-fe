import { useMemo, memo } from 'react';
import WebApp from '@twa-dev/sdk';
import { Tooltip } from 'antd';
import useWiseScore from '@/hooks/useWiseScore';
import CheckedIcon from '@/images/icon/svgr/checked.svg?react';
import { stonfi } from '@/utils/tma';
import Button from '../components/button';

function Wealth() {
  const { data } = useWiseScore();
  const actionList = useMemo(() => {
    return [
      {
        title: 'New Money on TON',
        tip: null,
        onClick: () => {
          WebApp.openTelegramLink(stonfi);
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
    <div className="space-y-1">
      {actionList.map((a) => {
        return (
          <div
            key={a.title}
            className="flex justify-between items-center border border-white/30 rounded-lg px-5 py-1.5 text-sm text-white"
          >
            {a.title}
            {a.isFinished ? (
              <CheckedIcon width="32px" height="32px" />
            ) : a.tip ? (
              <Tooltip title={a.tip}>
                <Button>Improve</Button>
              </Tooltip>
            ) : (
              <Button onClick={a.onClick}>Improve</Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(Wealth);
