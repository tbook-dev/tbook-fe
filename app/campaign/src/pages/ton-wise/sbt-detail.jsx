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
    if (res.code === 200) {
      // window.open(res?.link, '_blank');
      WebApp.openLink(res?.link, { try_instant_view: true });
    } else {
      messageAPI.error(res.message ?? 'mint unkonwn error!');
    }
  };
  const sbtList = useMemo(() => {
    return [
      {
        text: 'WISE SBT I',
        img: <SBTIcon className="size-[200px]" />,
        isOpen: true,
        type: 1,
      },
      {
        text: 'WISE Credit SBT',
        img: <SBT20KIcon className="size-[200px]" />,
        isOpen: false,
        type: 2,
      },
      {
        text: 'WISE Credit SBT',
        img: <SBT50KIcon className="size-[200px]" />,
        isOpen: false,
        type: 3,
      },
      {
        text: 'WISE Credit SBT',
        img: <SBT200KIcon className="size-[200px]" />,
        isOpen: false,
        type: 4,
      },
      {
        text: 'WISE Credit SBT',
        img: <SBT500KIcon className="size-[200px]" />,
        isOpen: false,
        type: 5,
      },
      {
        text: 'WISE Credit SBT',
        img: <SBT1MIcon className="size-[200px]" />,
        isOpen: false,
        type: 6,
      },
    ];
  }, []);
  const sbt = sbtList.find((v) => v.type === Number(type));
  return (
    <div className="flex-auto w-full pb-10 space-y-6 px-5 mt-3 lg:px-0 mx-auto">
      <Nav to="/wise-score" title="WISE SBT" />

      <div className="flex flex-col items-center gap-y-10">
        {sbt?.img}
        <div className="space-y-8 w-full">
          <div className="space-y-2 text-center">
            <h4 className="text-xl font-zen-dot">Congratulations!</h4>
            <div>
              <p className="text-sm font-thin text-white/60">
                You are eligible to mint {sbt.text} !
              </p>
              <p className="text-sm font-thin text-white/60">
                After minting, the SBT will appear soon.
              </p>
            </div>
          </div>
          <Button
            disabled={!sbt?.isOpen || mutation.isLoading}
            className={'w-full h-10 disabled:opacity-40'}
            isLoading={mutation.isLoading}
            onClick={handleClick}
          >
            Mint
          </Button>
        </div>
      </div>
      {messageContext}
    </div>
  );
}
