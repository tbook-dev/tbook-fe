import Nav from './components/nav';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import SBT20KIcon from '@/images/icon/svgr/sbt20K.svg?react';
import SBT50KIcon from '@/images/icon/svgr/sbt50K.svg?react';
import SBT200KIcon from '@/images/icon/svgr/sbt200K.svg?react';
import SBT500KIcon from '@/images/icon/svgr/sbt500K.svg?react';
import SBT1MIcon from '@/images/icon/svgr/sbt1M.svg?react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Button from './components/button';
import { useMintSBTMutation } from '@/hooks/useWiseScore';
import { message } from 'antd';
import WebApp from '@twa-dev/sdk';

export default function SBTDetail() {
  const { type } = useParams();
  const mutation = useMintSBTMutation();
  const [messageAPI, messageContext] = message.useMessage();
  const handleClick = async () => {
    const res = await mutation.mutateAsync({ type });
    if (res?.link) {
      // window.open(res?.link, '_blank');
      WebApp.openLink(res?.link, { try_instant_view: true });
    } else {
      messageAPI.error(res.message ?? 'mint unkonwn error!');
    }
  };
  const sbtList = useMemo(() => {
    return [
      {
        name: 'WISE Credit SBT',
        img: <SBTIcon className="size-[100px]" />,
        isOpen: true,
        type: 1,
        desc: {
          title: 'About the SBT',
          text: [
            `The TON WISE Credit SBT is your WISE Credit Score in token form. The higher your SBT level, the more you’re rewarded - and trusted - by top Web3 projects.`,
            `Your WISE Credit Score captures your on-chain and off-chain behaviors to showcase your influence. It is cross-chain, cross-platform and analyzes data across many different metrics.`,
          ],
        },
      },
      {
        name: 'WISE Credit SBT',
        img: <SBT20KIcon className="size-[100px]" />,
        isOpen: false,
        type: 2,
        desc: {
          title: 'About the SBT',
          text: [
            `The TON WISE Credit SBT is your WISE Credit Score in token form. The higher your SBT level, the more you’re rewarded - and trusted - by top Web3 projects.`,
            `Your WISE Credit Score captures your on-chain and off-chain behaviors to showcase your influence. It is cross-chain, cross-platform and analyzes data across many different metrics.`,
          ],
        },
      },
      {
        name: 'WISE Credit SBT',
        img: <SBT50KIcon className="size-[100px]" />,
        isOpen: false,
        type: 3,
        desc: {
          title: 'About the SBT',
          text: [
            `The TON WISE Credit SBT is your WISE Credit Score in token form. The higher your SBT level, the more you’re rewarded - and trusted - by top Web3 projects.`,
            `Your WISE Credit Score captures your on-chain and off-chain behaviors to showcase your influence. It is cross-chain, cross-platform and analyzes data across many different metrics.`,
          ],
        },
      },
      {
        name: 'WISE Credit SBT',
        img: <SBT200KIcon className="size-[100px]" />,
        isOpen: false,
        type: 4,
        desc: {
          title: 'About the SBT',
          text: [
            `The TON WISE Credit SBT is your WISE Credit Score in token form. The higher your SBT level, the more you’re rewarded - and trusted - by top Web3 projects.`,
            `Your WISE Credit Score captures your on-chain and off-chain behaviors to showcase your influence. It is cross-chain, cross-platform and analyzes data across many different metrics.`,
          ],
        },
      },
      {
        name: 'WISE Credit SBT',
        img: <SBT500KIcon className="size-[100px]" />,
        isOpen: false,
        type: 5,
        desc: {
          title: 'About the SBT',
          text: [
            `The TON WISE Credit SBT is your WISE Credit Score in token form. The higher your SBT level, the more you’re rewarded - and trusted - by top Web3 projects.`,
            `Your WISE Credit Score captures your on-chain and off-chain behaviors to showcase your influence. It is cross-chain, cross-platform and analyzes data across many different metrics.`,
          ],
        },
      },
      {
        name: 'WISE Credit SBT',
        img: <SBT1MIcon className="size-[100px]" />,
        isOpen: false,
        type: 6,
        desc: {
          title: 'About the SBT',
          text: [
            `The TON WISE Credit SBT is your WISE Credit Score in token form. The higher your SBT level, the more you’re rewarded - and trusted - by top Web3 projects.`,
            `Your WISE Credit Score captures your on-chain and off-chain behaviors to showcase your influence. It is cross-chain, cross-platform and analyzes data across many different metrics.`,
          ],
        },
      },
    ];
  }, []);
  const sbt = sbtList.find((v) => v.type === Number(type));
  return (
    <div className="flex-auto w-full pb-10 space-y-6 px-5 mt-3 lg:px-0 mx-auto">
      <Nav title="WISE SBT" />

      <div className="flex flex-col items-center gap-y-4">
        {sbt?.img}
        <div className="space-y-8 w-full">
          <div className="space-y-5 text-center">
            <h4 className="text-xl">{sbt.name}</h4>
            <div className="px-5 py-4 bg-white/10 rounded-xl text-left space-y-4">
              <h3 className="text-base">{sbt.desc.title}</h3>
              <div className="space-y-5">
                {sbt.desc.text.map((v, i) => {
                  return (
                    <p key={i} className="text-sm font-thin text-white/60">
                      {v}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="space-y-1 w-full">
            <Button
              disabled={!sbt?.isOpen || mutation.isLoading}
              className={'w-full h-10 disabled:opacity-40'}
              isLoading={mutation.isLoading}
              onClick={handleClick}
            >
              Mint SBT on Ton Society
            </Button>
            <p className="text-xs text-white/60 font-thin">
              The minting process takes place on Ton Society. It usually takes
              1-3 days. For minting updates and results, please check on Ton
              Society.
            </p>
          </div>
        </div>
      </div>
      {messageContext}
    </div>
  );
}
