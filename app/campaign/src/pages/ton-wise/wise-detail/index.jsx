import { formatImpact } from '@tbook/utils/lib/conf';
import clsx from 'clsx';
import { useState } from 'react';
import Identity from './Identity';
import Social from './Social';
import Engage from './Engage';
import useWiseScore from '@/hooks/useWiseScore';
import Wealth from './Wealth';
const wiseType = {
  wealth: 1,
  identity: 2,
  social: 3,
  engagement: 4,
};
const modlueConf = {
  btnList: [
    {
      type: 'wealth',
      value: wiseType.wealth,
      display: 'Wealth',
      component: Wealth,
    },
    {
      type: 'identity',
      value: wiseType.identity,
      display: 'Identity',
      component: Identity,
    },
    {
      type: 'social',
      value: wiseType.social,
      display: 'Social',
      component: Social,
    },
    {
      type: 'engagement',
      value: wiseType.engagement,
      display: 'Engage',
      component: Engage,
    },
  ],
};

export default function WiseDetail() {
  const { wealthScore, identityScore, socialScore, engagementScore } =
    useWiseScore();

  const [currentBtn, setCurrentBtn] = useState(wiseType.social);
  const wiseScoreMap = {
    [wiseType.wealth]: formatImpact(wealthScore),
    [wiseType.identity]: formatImpact(identityScore),
    [wiseType.social]: formatImpact(socialScore),
    [wiseType.engagement]: formatImpact(engagementScore),
  };

  const CurrentComponent = modlueConf.btnList.find(
    (v) => v.value === currentBtn
  )?.component;

  return (
    <div className="pb-10">
      <div className="flex justify-between -mx-5 px-5 pb-4 border-b border-[#CFDBD5]/[0.15]">
        {modlueConf.btnList.map((v) => {
          const isCurrent = v.value === currentBtn;
          return (
            <button
              className={clsx(
                isCurrent
                  ? 'text-white after:absolute after:inset-x-0 after:bottom-[-17px] after:h-0.5 after:bg-white'
                  : 'text-white/40',
                'flex flex-col items-center gap-y-2 relative'
              )}
              key={v.value}
              onClick={() => {
                setCurrentBtn(v.value);
              }}
            >
              <span className="font-zen-dot text-sm">
                {wiseScoreMap[v.value]}
              </span>
              <span>{v.display}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-3">
        <CurrentComponent />
      </div>
    </div>
  );
}
