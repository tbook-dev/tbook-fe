import bannerUrl from '@/images/airdrop.png';
import LazyImage from '@/components/lazyImage';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { formatDollarV2 } from '@tbook/utils/lib/conf';

const moduleConf = {
  url: bannerUrl,
  title: (
    <div className='font-zen-dot text-3xl text-white'>
      <span className='text-color1 mr-1'>GAME</span> Airdrop for CRE Community
    </div>
  ),
  getDesc1: blockHeight => {
    return (
      <p className='text-[#71717A] text-base'>
        The airdrop is determined based on the snapshot proposal, which is:
        <a className='text-[#3A82F7] underline hover:text-[#3A82F7]'>
          https://snapshot.org/#/carryprotocol.eth/proposal/0x3bef9d91719c16e53f2d9b135f3994f6ae6aedad6b543ae9b32f4bd2610ab7c6
        </a>
        CRE holders will receive GAME tokens based on their holdings at block
        height {formatDollarV2(blockHeight)}. The entire airdrop will be
        conducted in 4 phases. Check if you are eligible for the airdrop now!
      </p>
    );
  },
  getDesc2: ({ value, symbol }) => {
    return (
      <div>
        <p>
          According the airdrop rules, you are eligible to claim{' '}
          <span>
            `${formatDollarV2(value)} ${symbol}`
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
  const { userLogined } = useUserInfo();

  return (
    <section className='flex justify-between gap-x-[80px] text-[#C6C6C6]'>
      <div className='flex-auto'>
        {moduleConf.title}
        <div>{moduleConf.getDesc1(1000)}</div>
        {userLogined ? (
          moduleConf.getDesc2({ value: 10000, symbol: 'GAME' })
        ) : (
          <div className='flex items-center text-white text-sm'>
            <button className='me-1 text-[#904BF6] text-base font-medium underline'>
              Connect wallet
            </button>
            to check the GAME you are eligible to claim
          </div>
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
