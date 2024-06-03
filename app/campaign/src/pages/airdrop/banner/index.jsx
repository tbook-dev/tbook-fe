import bannerUrl from '@/images/airdrop.png';
import LazyImage from '@/components/lazyImage';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { formatDollarV2, formatImpact } from '@tbook/utils/lib/conf';
import { useDispatch } from 'react-redux';
import { setConnectWalletModal } from '@/store/global';
import { Skeleton } from 'antd';
import useGameCheckAirdrop from '@/hooks/useGameCheckAirdrop';

const moduleConf = {
  url: bannerUrl,
  link: 'https://snapshot.org/#/carryprotocol.eth/proposal/0x3bef9d91719c16e53f2d9b135f3994f6ae6aedad6b543ae9b32f4bd2610ab7c6',
  title: (
    <div className='font-zen-dot text-3xl text-white'>
      <span className='text-color1 mr-1'>GAME</span> Airdrop for CRE Community
    </div>
  ),
  getDesc1: blockHeight => {
    return (
      <>
        <p className='text-[#C6C6C6] text-base'>
          The airdrop is determined based on the snapshot proposal, which is:
        </p>

        <p className='text-[#C6C6C6] text-base'>
          <a
            href={moduleConf.link}
            target='_blank'
            className='text-[#3A82F7] underline hover:text-[#3A82F7] break-words me-1'
          >
            {moduleConf.link}
          </a>
          CRE holders will receive GAME tokens based on their holdings at block
          height {formatDollarV2(blockHeight)}. The entire airdrop will be
          conducted in 4 phases. Check if you are eligible for the airdrop now!
        </p>
      </>
    );
  },
  getDesc2: ({ value, symbol }) => {
    return (
      <div className='text-[#D4D4D8] text-sm space-y-2'>
        <p>
          According the airdrop rules, you are eligible to claim{' '}
          <span className='text-base text-white'>
            {`${formatImpact(value)} ${symbol}`}
          </span>
        </p>
        <p>
          Please ensure that you complete the claim within the validity time.
          Otherwise, you will miss the airdrop.
        </p>
      </div>
    );
  },
};
export default function Banner () {
  const { userLogined, firstLoad } = useUserInfo();
  const { totalNum, blockHeight } = useGameCheckAirdrop();

  const dispath = useDispatch();
  const handleConnectWallet = () => {
    dispath(setConnectWalletModal(true));
  };

  return (
    <section className='flex justify-between gap-x-16 text-[#C6C6C6]'>
      <div className='flex-auto space-y-8 w-[700px]'>
        {moduleConf.title}
        {!firstLoad ? (
          <Skeleton />
        ) : (
          <>
            <div>{moduleConf.getDesc1(blockHeight)}</div>
            {userLogined ? (
              moduleConf.getDesc2({ value: totalNum, symbol: 'GAME' })
            ) : (
              <div className='flex items-center text-sm'>
                <button
                  onClick={handleConnectWallet}
                  className='me-1 text-[#904BF6] text-base font-medium underline'
                >
                  Connect wallet
                </button>
                to check the GAME you are eligible to claim
              </div>
            )}
          </>
        )}
      </div>

      <LazyImage
        src={moduleConf.url}
        className='flex-none w-[436px] h-[275px] object-cover object-center'
        fetchpriority='high'
        alt='main banner'
      />
    </section>
  );
}
