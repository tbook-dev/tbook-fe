import useWiseScore from '@/hooks/useWiseScore';
import { useMemo, memo, useState, useCallback } from 'react';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import ArrowIcon from '@/images/icon/svgr/arrow.svg?react';
import RefreshIcon from '@/images/icon/svgr/refresh.svg?react';
import XIcon from '@/images/icon/svgr/x.svg?react';
import TgPremiumIcon from '@/images/icon/svgr/tg-premium.svg?react';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import DcIcon from '@/images/icon/svgr/dc.svg?react';
import NotcoinIcon from '@/images/icon/svgr/notcoin.svg?react';
import useWallet from '@/hooks/useWallet';
import useSocial from '@/hooks/useSocial';
import { stonfi, premiumLink } from '@/utils/tma';
import WebApp from '@twa-dev/sdk';
import { message } from 'antd';
import Telegram from '../modal/telegram';
import Discord from '../modal/discord';
import useWiseSocialMutation from '@/hooks/useWiseSocialMutation';

function Insights() {
  const { data: wiseScore } = useWiseScore();
  const { getWallets } = useWallet('ton');
  const { socialList } = useSocial();
  const [ton] = getWallets(['ton']);
  const [discord, twitter] = socialList;
  const [messageApi, contextHolder] = message.useMessage();
  const mutation = useWiseSocialMutation(messageApi);
  const [tgOpen, setTg] = useState(false);
  const [dcOpen, setDc] = useState(false);
  const handleTgClose = useCallback(() => {
    setTg(false);
  }, []);
  const handleDcClose = useCallback(() => {
    setDc(false);
  }, []);
  const openstonfi = useCallback(() => WebApp.openTelegramLink(stonfi), []);
  const todos = useMemo(() => {
    const tonTransactionsScore =
      wiseScore?.engagementScore?.tonTransactionsScore ?? 0;
    const notCoinTransactionScore =
      wiseScore?.engagementScore?.notCoinTransactionScore ?? 0;
    const tonLiquidityProvideScore =
      wiseScore?.engagementScore?.tonLiquidityProvideScore ?? 0;
    const tgPremiumScore = wiseScore?.identityScore?.tgPremiumScore ?? 0;
    return [
      {
        key: 1,
        name: 'Connect TON wallet',
        show: !ton.connected,
        description: (
          <div className="flex items-center gap-x-1 text-xs font-thin">
            <span className="text-[#6381F2] px-1 py-0.5 rounded border border-[#6381F2]/10 bg-[#6381F2]/20">
              Connected TON wallet
            </span>
            <span className="text-white/60">will improve by 10K</span>
          </div>
        ),
        icon: <TonIcon className="size-10" />,
        handle: () => {
          ton.connectHandle();
        },
      },
      {
        key: 2,
        name: 'Have transaction of Toncoin',
        show: tonTransactionsScore === 0,
        description: (
          <div className="flex items-center gap-x-1 text-xs font-thin">
            <span className="text-[#6BE4C9] px-1 py-0.5 rounded border border-[#6BE4C9]/10 bg-[#6BE4C9]/20">
              Toncoin Ranger
            </span>
            <span className="text-white/60">will improve by 50K</span>
          </div>
        ),
        icon: <TonIcon className="size-10" />,
        handle: openstonfi,
      },
      {
        key: 3,
        show: tonLiquidityProvideScore === 0,
        name: 'Provide liquidity on TON',
        description: (
          <div className="flex items-center gap-x-1 text-xs font-thin">
            <span className="text-[#6BE4C9] px-1 py-0.5 rounded border border-[#6BE4C9]/10 bg-[#6BE4C9]/20">
              Liquidity Provider
            </span>
            <span className="text-white/60">will improve by 10K</span>
          </div>
        ),
        icon: (
          <div className="relative">
            <TonIcon className="size-10" />
            <RefreshIcon className="absolute bottom-0 right-0 size-3" />
          </div>
        ),
        handle: openstonfi,
      },
      {
        key: 4,
        show: !twitter.connected,
        name: 'Connect X Account',
        description: (
          <div className="flex items-center gap-x-1 text-xs font-thin">
            <span className="text-[#6381F2] px-1 py-0.5 rounded border border-[#6381F2]/10 bg-[#6381F2]/20">
              X User
            </span>
            <span className="text-white/60">will improve by 10K</span>
          </div>
        ),
        icon: <XIcon className="size-10" />,
        handle: () => {
          twitter.loginFn();
        },
      },
      {
        key: 5,
        show: tgPremiumScore === 0,
        name: 'Subscribe to Telegram Premium',
        description: (
          <div className="flex items-center gap-x-1 text-xs font-thin">
            <span className="text-[#6381F2] px-1 py-0.5 rounded border border-[#6381F2]/10 bg-[#6381F2]/20">
              Telegram Premium
            </span>
            <span className="text-white/60">will improve by 10K</span>
          </div>
        ),
        icon: <TgPremiumIcon className="size-10" />,
        handle: () => {
          WebApp.openTelegramLink(premiumLink);
        },
      },
      {
        key: 6,
        show: true,
        name: 'Submit telegram channel/group',
        description: (
          <div className="flex items-center gap-x-1 text-xs font-thin">
            <span className="text-[#66B1DF] px-1 py-0.5 rounded border border-[#66B1DF]/10 bg-[#66B1DF]/20">
              Telegram Fans
            </span>
            <span className="text-white/60">can improve by 1K~10K</span>
          </div>
        ),
        icon: <TgIcon className="size-10" fill="#0098EA" />,
        handle: () => {
          setTg(true);
        },
      },
      {
        key: 7,
        show: !discord.connected,
        name: 'Connect Discord Account',
        description: (
          <div className="flex items-center gap-x-1 text-xs font-thin">
            <span className="text-[#66B1DF] px-1 py-0.5 rounded border border-[#66B1DF]/10 bg-[#66B1DF]/20">
              Discord Fans
            </span>
            <span className="text-white/60">can improve by 1K~10K</span>
          </div>
        ),
        icon: <DcIcon className="size-10" fill="#5865F2" />,
        handle: () => {
          discord.loginFn();
        },
      },
      {
        key: 8,
        show: true,
        name: 'Submit discord server',
        description: (
          <div className="flex items-center gap-x-1 text-xs font-thin">
            <span className="text-[#66B1DF] px-1 py-0.5 rounded border border-[#66B1DF]/10 bg-[#66B1DF]/20">
              Discord Fans
            </span>
            <span className="text-white/60">can improve by 1K~10K</span>
          </div>
        ),
        icon: <DcIcon className="size-10" fill="#5865F2" />,
        handle: () => {
          setDc(true);
        },
      },
      {
        key: 9,
        show: notCoinTransactionScore === 0,
        name: 'Have transaction of Notcoin',
        description: (
          <div className="flex items-center gap-x-1 text-xs font-thin">
            <span className="text-[#6BE4C9] px-1 py-0.5 rounded border border-[#6BE4C9]/10 bg-[#6BE4C9]/20">
              Notcoin Ranger
            </span>
            <span className="text-white/60">will improve by 50K</span>
          </div>
        ),
        icon: <NotcoinIcon className="size-10" />,
        handle: openstonfi,
      },
    ];
  }, [wiseScore, ton, discord, twitter, WebApp]);
  return (
    <div className="space-y-4">
      <h1 className="text-sm">
        Collect These Credentials to Improve Your Credit!
      </h1>
      <div className="space-y-5">
        {todos
          .filter((v) => v.show)
          .map((todo) => {
            return (
              <button
                key={todo.key}
                onClick={todo.handle}
                className="flex items-center justify-between w-full btn-click"
              >
                <div className="flex items-center gap-x-2">
                  {todo.icon}
                  <div className="space-y-2">
                    <h3 className="text-base text-left">{todo.name}</h3>
                    {todo.description}
                  </div>
                </div>
                <ArrowIcon className="size-4" stroke="#fff" />
              </button>
            );
          })}
      </div>
      <Telegram open={tgOpen} onClose={handleTgClose} mutation={mutation} />
      <Discord open={dcOpen} onClose={handleDcClose} mutation={mutation} />
      {contextHolder}
    </div>
  );
}

export default memo(Insights);
