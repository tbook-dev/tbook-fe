import AmbassadorIcon from '@/images/icon/svgr/ambassador.svg?react';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';
import CheckedIcon from '@/images/icon/svgr/checked.svg?react';
import RhombusIcon from '@/images/icon/svgr/rhombus.svg?react';
import ArrowIcon from '@/images/icon/svgr/arrow.svg?react';
import {
  ambassadorRequrements,
  useApplyAmbassadorMutation,
} from '@/hooks/useAmbassador';
import useWiseScore from '@/hooks/useWiseScore';
import { useUserScratchInfo } from '@/hooks/useUserRenaissance';
import { formatImpact } from '@tbook/utils/lib/conf';
import { Link } from 'react-router-dom';
import Button from './components/button';
import Nav from './components/nav';
import { ConfigProvider, message } from 'antd';

export default function Ambassador() {
  const { totalScore, isLoaded: isWisescoreLoaded } = useWiseScore();
  const [messageApi, contextHolder] = message.useMessage();

  const { data } = useUserScratchInfo();
  const tpoint = data?.tPoints ?? 0;
  const isTpointLoaded = !!data;
  const openMessage = (content, onClose) => {
    messageApi.open({
      icon: null,
      content: (
        <div className="px-3 py-2 backdrop-blur-md rounded-xl">{content}</div>
      ),
      className: 'mt-10',
      onClose,
    });
  };
  const userSituation = [
    {
      name: 'WISE Credit Score',
      valueDescription: `${formatImpact(totalScore)}`,
      icon: <AmbassadorIcon className="size-7" />,
      value: totalScore,
      isLoaded: isWisescoreLoaded,
      link: '/wise-score',
    },
    {
      name: 'TPoints',
      valueDescription: `${formatImpact(tpoint)}`,
      icon: <TpointIcon className="size-7" />,
      value: tpoint,
      isLoaded: isTpointLoaded,
      link: '/event/renaissance',
    },
  ];
  const isQualified = ambassadorRequrements.every(
    (v, idx) => userSituation[idx].value >= v.minValue
  );
  const applyAmbassadorMutation = useApplyAmbassadorMutation();
  const handleClick = async () => {
    const res = await applyAmbassadorMutation.mutateAsync();
    if (res.success) {
      openMessage(
        <>
          <p>Applied Successfully!</p>
          <p>We will contact you once it is approved.</p>
        </>
      );
    } else {
      openMessage(
        <>
          <p>Failed to apply!</p>
          <p>{res.message}</p>
        </>
      );
    }
  };
  return (
    <div className="fixed inset-x-0 top-0 min-h-screen pt-14 pb-32 space-y-6 px-5 lg:px-0 mx-auto bg-gradient-to-b from-[#904BF6]/60 to-30% to-black">
      <Nav algin="top" justify="center" to="/wise-score/invite">
        <h2 className="text-2xl w-[240px]">
          Apply to Become a TBook Ambassador
        </h2>
      </Nav>

      <div className="p-4 rounded-xl bg-white/10 space-y-8">
        <div className="space-y-5">
          <h3 className="text-sm">
            Become Ambassadors, unlock exclusive bonuses!
          </h3>
          {userSituation.map((item, idx) => {
            console.log(item.value >= ambassadorRequrements[idx].minValue);
            return (
              <div
                key={item.name}
                className="text-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-x-2">
                  <div className="size-10 flex items-center justify-center rounded-full bg-white/5">
                    {item.icon}
                  </div>
                  <p>{ambassadorRequrements[idx].descriptionFull}</p>
                </div>
                {!item.isLoaded ? (
                  <div className="h-6 w-7 bg-[#904BF6]/40 animate-pulse" />
                ) : item.value >= ambassadorRequrements[idx].minValue ? (
                  <CheckedIcon className="size-6" />
                ) : (
                  <span className="text-[#904BF6]">Not qualified</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-x-2.5">
          {Array.from({ length: 2 }).map((_, idx) => {
            return (
              <>
                <div className="w-20 h-px bg-white/10" key={idx} />
                {idx < 1 && <RhombusIcon key={'1-' + idx} />}
              </>
            );
          })}
        </div>

        <div className="space-y-5 text-center">
          <h2 className="text-sm"> Your WISE Credit Score & Tpoints</h2>
          <div className="flex items-center justify-center gap-x-4">
            {userSituation.map((v, idx, arr) => {
              return (
                <>
                  <div
                    key={v.name}
                    className="text-center flex flex-col items-center relative w-[140px]"
                  >
                    {!v.isLoaded ? (
                      <div className="h-6 w-7 bg-[#904BF6]/40 animate-pulse" />
                    ) : (
                      <h2 className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#C668F9] to-[#6381F2] from-5% to-100%">
                        {v.valueDescription}
                      </h2>
                    )}
                    <Link to={v.link} className="flex items-center">
                      <p className="text-xs font-thin bg-clip-text text-transparent bg-gradient-to-r from-[#C668F9] to-[#6381F2] from-5% to-100%">
                        {v.name}
                      </p>
                      <ArrowIcon stroke="#6381F2" className="size-3" />
                    </Link>
                  </div>
                  {idx !== arr.length - 1 && (
                    <div className="h-6 w-px bg-[#C668F9]/40" key={idx} />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>

      <Button
        disabled={!isQualified || applyAmbassadorMutation.isLoading}
        className="h-10 w-[310px] absolute left-1/2  bottom-10 -translate-x-1/2 font-syne font-bold"
        onClick={handleClick}
        isLoading={applyAmbassadorMutation.isLoading}
      >
        Apply Now
      </Button>
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
