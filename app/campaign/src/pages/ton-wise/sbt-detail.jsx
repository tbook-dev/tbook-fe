import Nav from './components/nav';
import sbtPNG from '@/images/wise/rewards/sbt.png';
import Sbt2kIcon from '@/images/icon/svgr/sbt2k.svg?react';
import Sbt5kIcon from '@/images/icon/svgr/sbt5k.svg?react';
import Sbt20kIcon from '@/images/icon/svgr/sbt20k.svg?react';
import Sbt50kIcon from '@/images/icon/svgr/sbt50k.svg?react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Button from './components/button';

export default function SBTDetail() {
  const { type } = useParams();
  const sbtList = useMemo(() => {
    return [
      {
        text: 'WISE SBT I',
        img: <img src={sbtPNG} className="size-[200px]" />,
        isOpen: true,
        type: 1,
      },
      {
        text: 'WISE Credit SBT',
        img: <Sbt2kIcon width="200px" height="200px" />,
        isOpen: false,
        type: 2,
      },
      {
        text: 'WISE Credit SBT',
        img: <Sbt5kIcon width="200px" height="200px" />,
        isOpen: false,
        type: 3,
      },
      {
        text: 'WISE Credit SBT',
        img: <Sbt20kIcon width="200px" height="200px" />,
        isOpen: false,
        type: 4,
      },
      {
        text: 'WISE Credit SBT',
        img: <Sbt50kIcon width="200px" height="200px" />,
        isOpen: false,
        type: 5,
      },
    ];
  }, []);
  const sbt = sbtList.find((v) => v.type === Number(type));
  return (
    <div className="flex-auto w-full pb-10 space-y-6 px-5 mt-3 lg:px-0 mx-auto">
      <Nav title="WISE SBT" />

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
            disabled={!sbt?.isOpen}
            className={'w-full h-10 disabled:opacity-40'}
            onClick={() => {
              window.open(
                'https://society.ton.org/welcome/3222fb13-79f8-40fc-8db3-1b05b4662991',
                '_blank'
              );
            }}
          >
            Mint
          </Button>
        </div>
      </div>
    </div>
  );
}
