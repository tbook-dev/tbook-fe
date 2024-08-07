import { ConfigProvider, message } from 'antd';
import { useMemo } from 'react';
import moduleConf from './conf';
import { formatImpact } from '@tbook/utils/lib/conf';
import { cn } from '@/utils/conf';
import { Link } from 'react-router-dom';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import CheckedIcon from '@/images/icon/svgr/checked.svg?react';
import ArrowIcon from '@/images/icon/svgr/arrow.svg?react';
import useWallet from '@/hooks/useWallet';
import { useEarnCheck } from '@/hooks/useUserRenaissance';
import { LoadingOutlined } from '@ant-design/icons';
import WebApp from '@twa-dev/sdk';
import {
  VITE_TBOOK_TG_CHANNEL,
  VITE_TBOOK_TG_GROUP,
  VITE_TBOOK_BOOST_TG_CHANNEL,
} from '@/utils/tma';
// const isStaging = import.meta.env.VITE_HOST_EVN === 'staging';

export default function Earn() {
  const [messageApi, contextHolder] = message.useMessage();

  const { getWallets } = useWallet();
  const [tonAddressStatus] = getWallets('ton');
  const checkedValues = useEarnCheck();
  // const openMessage = (content, onClose) => {
  //   messageApi.open({
  //     icon: null,
  //     content: (
  //       <div className="px-3 py-4 backdrop-blur-md rounded-xl">{content}</div>
  //     ),
  //     className: 'mt-10',
  //     onClose,
  //   });
  // };
  const onboarding = useMemo(() => {
    const { channel, group, boost } = checkedValues;
    return [
      {
        title: 'Connect TON Wallet',
        desc: (
          <div className="flex items-center">
            <img src={moduleConf.url.tpoint} className="size-3 me-1" />
            +5,000 TPoints
          </div>
        ),
        img: <TonIcon width={24} height={24} />,
        isActive: !tonAddressStatus.connected,
        handle: tonAddressStatus.connectHandle,
        isLoading: false,
      },
      {
        title: 'Join TBook channel',
        desc: (
          <div className="flex items-center">
            <img src={moduleConf.url.tpoint} className="size-3 me-1" />
            +2,000 TPoints
          </div>
        ),
        img: <TgIcon width={24} height={24} />,
        isActive: !channel.finished,
        isLoading: channel.isLoading,
        handle: () => {
          WebApp.openTelegramLink(VITE_TBOOK_TG_CHANNEL);
        },
      },
      {
        title: 'Join TBook group',
        desc: (
          <div className="flex items-center">
            <img src={moduleConf.url.tpoint} className="size-3 me-1" />
            +2,000 TPoints
          </div>
        ),
        img: <TgIcon width={24} height={24} />,
        isActive: !group.finished,
        isLoading: group.isLoading,
        handle: () => {
          WebApp.openTelegramLink(VITE_TBOOK_TG_GROUP);
        },
      },
      {
        title: 'Boost channel',
        desc: (
          <div className="flex items-center">
            <img src={moduleConf.url.tpoint} className="size-3 me-1" />
            +2,000 TPoints
          </div>
        ),
        img: <span className="text-2xl">🌟</span>,
        isActive: !boost.finished,
        isLoading: boost.isLoading,
        handle: () => {
          WebApp.openTelegramLink(VITE_TBOOK_BOOST_TG_CHANNEL);
        },
      },
    ];
  }, [tonAddressStatus, checkedValues]);

  return (
    <div className="space-y-3 px-4 pb-10 mx-auto overflow-hidden transition-all shadow-xl">
      <div className="relative flex items-center justify-center">
        <Link to="/event/renaissance" className="absolute left-0">
          {moduleConf.svg.back}
        </Link>
        <h2 className="text-2xl font-syne font-extrabold text-center">Earn</h2>
      </div>
      <div className="space-y-5">
        <div className="space-y-3">
          <h3 className="text-syne text-base">Onboarding</h3>
          <div className="space-y-3">
            {onboarding.map((b) => {
              return (
                <button
                  disabled={!b.isActive}
                  key={b.title}
                  onClick={b.handle}
                  className={cn(
                    'w-full text-start flex items-center justify-between gap-x-2 px-4 py-3 rounded-lg border border-[#FFEAB5] bg-linear14',
                    {
                      'opacity-40': !b.isActive,
                    }
                  )}
                >
                  <div className="flex items-center justify-between gap-x-2">
                    {b.img}
                    <div className="space-y-2">
                      <h4 className="text-[#FFDFA2] text-base font-syne font-semibold">
                        {b.title}
                      </h4>

                      <div className="text-[#FFDFA2]/60 text-sm">{b.desc}</div>
                    </div>
                  </div>
                  {b.isLoading ? (
                    <LoadingOutlined />
                  ) : b.isActive ? (
                    <ArrowIcon />
                  ) : (
                    <CheckedIcon fill="#FFDFA2" width="32px" height="32px" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Message: {
              contentBg: `rgba(255, 223, 162, 0.15)`,
              contentPadding: 0,
            },
          },
        }}
      >
        {contextHolder}
      </ConfigProvider>
    </div>
  );
}
