import { useResponsive } from 'ahooks';
import { useMemo, useState } from 'react';
import useDeFi from '@/hooks/useDeFi';
import { cn } from '@/utils/conf';
import { preloadBatchImage } from '@/utils/common';
import Page404 from '@/pages/404';
import Header from '@/layout/ton/HeaderTransparent';
import Bg1 from '@/images/event/normis.svg';
import useWallet from '@/hooks/useWallet';
import Button from '@/components/button';
import TonIcon from '@/images/icon/svgr/ton2.svg?react';
import { shortAddress } from '@tbook/utils/lib/conf';
import exampleURL from '@/images/event/normie-sbt-example.svg';
import useNormieAirdrop from '@/hooks/useNormieAirdrop';
import GroupCard from '@/pages/app/groupCard';
import useCampaignQuery from '@/hooks/useCampaignQuery';
import LazyImage from '@/components/lazyImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import StarIcon from '@/images/icon/svgr/star.svg?react';
import CheckedIcon from '@/images/icon/svgr/checked4.svg?react';
import { claimSBT } from '@/api/incentive';
import { jumpLink } from '@/utils/tma';
import { useTelegram } from '@/hooks/useTg';
import { message } from 'antd';

preloadBatchImage([Bg1]);
const SBTLoading = () => (
  <div className="relative space-y-1 pb-10">
    <div className="rounded-lg w-full aspect-square bg-[#1f1f1f] animate-pulse" />
    <div className="rounded h-4 w-3/4 mx-auto bg-[#1f1f1f] animate-pulse" />
  </div>
);
const Arrow = ({ disabled, className, onClick }) => {
  return (
    <button
      disabled={disabled}
      className="rounded-full bg-black/10 backdrop-blur"
      onClick={onClick}
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          className,
          disabled ? 'cursor-pointer' : 'cursor-not-allowed'
        )}
      >
        <path
          d="M31.9584 19.8542L22.8802 28.5L31.9584 37.1458"
          stroke={disabled ? '#666' : 'white'}
          strokeOpacity="0.5"
          strokeWidth="3.45833"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
const Normis = () => {
  const { pc } = useResponsive();
  const { getWallets } = useWallet();
  const [ton] = getWallets(['ton']);
  const { data: defi } = useDeFi();
  const { data: normie } = useNormieAirdrop();
  const { groupList: groups, campaignOngoing: defiOngoing } = useCampaignQuery(
    defi?.campaignId
  );
  const [messageApi, contextHolder] = message.useMessage();
  const { isTMA } = useTelegram();
  const [displayIdx, setDisplayIdx] = useState(0);

  const allSBT =
    normie?.normieVerifyResult?.map((c) => ({
      ...c,
      sbtId: c.sbt?.sbtId,
      url: c.sbt?.picUrl,
      name: c.sbt?.name,
      credentialName: c.credentialName,
      claimedType: c.sbt?.claimedType ?? 0,
      uniqueLink: c.sbt?.uniqueLink,
      claimed: c.sbt?.claimedType >= 3,
      granted: c.sbt?.claimedType >= 2,
    })) ?? [];
  const userSBTs = allSBT.filter((c) => c.claimedType >= 2);
  // console.log({ defi, defiOngoing, isLoading, userSBTs, allSBT });
  const tonHoldlerSBT = allSBT[0];
  const handleSBT = async (sbt) => {
    if (sbt.uniqueLink) {
      jumpLink(res.link, pc, isTMA);
    } else {
      try {
        const res = await claimSBT(sbt.sbtId);
        if (res?.link) {
          jumpLink(res.link, pc, isTMA);
        } else {
          messageApi.error(res?.message ?? 'mint unkonwn error!');
        }
      } catch (error) {
        console.log(error);
        messageApi.error(error.message ?? 'mint unkonwn error!');
      }
    }
  };
  const slides = useMemo(() => {
    return [
      {
        bg: Bg1,
        show: true,
        content: (
          <div className="space-y-5 font-bold text-[#503658]">
            <div className="text-[40px]">
              <h2>Normis Airdrop:</h2>
              <h2>SBT Frenzy!</h2>
            </div>
            <div className="text-[26px]">
              <h2>The Open League S6</h2>
              <h2>airdrop campaign</h2>
            </div>
          </div>
        ),
      },
      {
        name: 'tonConnect',
        className: 'bg-[#503658]',
        show: !ton.connected,
        content: (
          <div className="space-y-5">
            <div className="text-2xl font-bold text-[#E5AB8A]">
              <h2>Connect Wallet to See which</h2>
              <h2>SBTs are waiting for you to claim</h2>
            </div>
            {ton.connected ? (
              <div className="pl-1 pr-5 h-12 flex items-center gap-x-1 bg-white text-black font-bold text-base rounded-3xl w-max mx-auto">
                <TonIcon className="size-10" />
                {shortAddress(ton.address)}
              </div>
            ) : (
              <Button
                type="white"
                className="px-5 py-4 font-bold text-base rounded-3xl mx-auto"
              >
                Connect TON wallet
              </Button>
            )}
          </div>
        ),
      },
      {
        className: 'bg-[#22306D] justify-start pt-20',
        show: true,
        content: (
          <div className="space-y-10 font-bold  text-[#ABEDBB] text-left">
            <h2 className="text-2xl text-[#F36EBD] text-center">
              Boost your chances for the Normie Airdrop!
            </h2>
            <div className="text-lg space-y-6">
              {[
                'Dive in and engage with App Battle projects!',
                'uExplore the six DeFi protocols in Late Night DeFi!',
                'Stock up on TON Coins!',
                'Collect tons of SBTs from the Normie campaign!',
              ].map((v, k) => (
                <div className="flex items-start gap-x-2 pl-2" key={k}>
                  <i className="size-2 rounded-full bg-[#ABEDBB] flex-none mt-4" />
                  {v}
                </div>
              ))}
            </div>
            <div className="text-2xl text-center">
              Get ready—this is your moment! 🎉 Don't miss out!
            </div>
          </div>
        ),
      },
      {
        className: 'bg-[#22306D] justify-start py-20',
        show: true,
        content: (
          <div className="space-y-5">
            <div
              className={cn(
                'grid py-2 grid-cols-5 gap-x-1 gap-y-2 max-h-[250px] overflow-auto',
                userSBTs.length > 0 && 'shadow-md'
              )}
            >
              {normie ? (
                // userSBTs
                userSBTs.map((sbt, i) => {
                  return (
                    <div className="flex flex-col gap-y-1.5" key={i}>
                      <div
                        className="w-full rounded-xl bg-[#071029] relative"
                        key={i}
                        onClick={() => {
                          handleSBT(sbt);
                        }}
                      >
                        <LazyImage
                          src={sbt.url}
                          className="rounded-xl aspect-square"
                        />
                        {sbt.granted && (
                          <>
                            <StarIcon className="absolute -left-2 -top-2 scale-50" />
                            <StarIcon className="absolute left-2 -top-2 scale-50 size-4 rotate-[75deg]" />
                          </>
                        )}
                      </div>
                      <div
                        className={cn(
                          'font-bold text-[10px]',
                          sbt.granted ? 'text-[#CFF469]' : 'text-white'
                        )}
                      >
                        {sbt.name}
                        {sbt.granted && (
                          <CheckedIcon className="inline-block" />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <SBTLoading />
              )}
            </div>

            <div className="text-[#ABEDBB] text-sm font-normal space-y-3">
              <p>
                Based on your on-chain activity, the SBTs above are the ones
                you're eligible to claim!
              </p>
              <p>
                Meet the following requirements, the most dedicated can unlock
                over 10 in total!
              </p>
            </div>
            {normie ? (
              <Swiper
                spaceBetween={15}
                slidesPerView={3}
                slidesPerGroup={3}
                modules={[Pagination]}
                pagination={{ clickable: true }}
                loopFillGroupWithBlank
                loop
                autoHeight
                style={{
                  '--swiper-theme-color': 'white',
                  '--swiper-pagination-bullet-inactive-color': '#666',
                  // '--swiper-navigation-size': '16px',
                }}
              >
                {allSBT.map((v, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div className="relative space-y-1 pb-10">
                        <LazyImage
                          src={v.url}
                          alt={`${v.name}`}
                          className="rounded-lg aspect-square"
                        />
                        <p className="text-xs text-center text-[#ABEDBB]">
                          {v.credentialName}
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            ) : (
              <div className="grid grid-cols-3 gap-x-4">
                {Array.from({ length: 3 })
                  .fill(1)
                  .map((_, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <SBTLoading />
                      </SwiperSlide>
                    );
                  })}
              </div>
            )}
          </div>
        ),
      },
      {
        className: 'bg-[#3C00E4] justify-start py-20 w-full',
        show: true,
        content: (
          <div className="space-y-10">
            <div className="text-[#C0AFD0] text-2xl font-bold">
              Engage with Core DeFi!
            </div>

            <div className="space-y-2 lg:space-y-3">
              {groups.map((group, i) => {
                return (
                  <GroupCard
                    key={group.id}
                    group={group}
                    showVerify={defiOngoing}
                    endAt={1726738389000}
                    status={1}
                    defaultExpand={i === 0}
                  />
                );
              })}
            </div>

            <div className="text-[#ABEDBB]/40 text-sm font-normal pb-12">
              <p> Guess what? There are 23 Normis-series SBTs!</p>
              <p>
                Check out App League to
                <a
                  className="ml-1 underline underline-offset-4"
                  target="_blank"
                  href="https://ton.org/open-league?filterBy=forProjects"
                >
                  explore them all!
                </a>
              </p>
            </div>
          </div>
        ),
      },
      {
        className: 'bg-[#F36EBD] justify-start py-20',
        show: true,
        content: (
          <div className="space-y-12">
            <div className="text-[#22306D] text-2xl font-bold">
              Royal TON Hodler!
            </div>

            <div
              className="space-y-1.5 flex flex-col items-center"
              onClick={() => {
                handleSBT(tonHoldlerSBT);
              }}
            >
              <div className="relative py-2">
                <LazyImage
                  src={exampleURL}
                  alt="ton sbt picUrl"
                  className="size-[164px]"
                />
                {tonHoldlerSBT?.granted && (
                  <>
                    <StarIcon className="absolute -left-3 top-2" />
                    <StarIcon className="absolute left-3 -top-1 scale-75 size-4 rotate-[75deg]" />
                  </>
                )}
              </div>

              <div
                className={cn(
                  'text-base text-center font-bold',
                  tonHoldlerSBT?.granted && 'text-[#CFF469]'
                )}
              >
                Toncoin Holder
                {tonHoldlerSBT?.granted && (
                  <CheckedIcon className="inline-block size-4" />
                )}
              </div>
            </div>

            <div className="text-[#22306D] text-base font-bold pb-12">
              <p>Get Toncoin.</p>
              <p>Claim Toncoin Holder SBT</p>
            </div>
          </div>
        ),
      },
    ].filter((c) => c.show);
  }, [setDisplayIdx, defi, groups, ton]);
  const CurrentFrame = slides[displayIdx];

  return pc ? (
    <Page404 />
  ) : (
    <div className="fixed top-0 left-0 inset-0 z-10 h-screen overflow-auto">
      {contextHolder}
      <Header />
      <div className="flex h-0.5 items-center gap-x-2 px-10 mx-auto absolute inset-0 top-14 z-10">
        {slides.map((v, idx) => (
          <div
            className={cn(
              'h-0.5 rounded-full',
              idx === displayIdx ? 'bg-white' : 'bg-white/30'
            )}
            style={{ width: `${(1 / slides.length) * 100}%` }}
            key={v.key}
          />
        ))}
      </div>
      <div
        className={cn(
          'relative px-4 flex flex-col items-center justify-center min-h-screen',
          'bg-cover bg-center',
          CurrentFrame.className
        )}
        style={{
          backgroundImage: `url(${CurrentFrame.bg})`,
        }}
      >
        <div className="text-center w-full">{CurrentFrame.content}</div>
        <div
          className={cn(
            'fixed inset-x-0 bottom-14 w-[310px] flex justify-between items-center mx-auto z-10',
            displayIdx > 0 ? 'justify-between' : 'justify-end'
          )}
        >
          {displayIdx > 0 && (
            <Arrow
              onClick={() =>
                setDisplayIdx((v) => {
                  return displayIdx === 0 ? slides.length - 1 : v - 1;
                })
              }
            />
          )}

          <Arrow
            disabled={CurrentFrame.name === 'tonConnect' && !ton.connected}
            className="rotate-180"
            onClick={() =>
              setDisplayIdx((v) => {
                return displayIdx === slides.length - 1 ? 0 : v + 1;
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Normis;
