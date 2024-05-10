import { useResponsive } from 'ahooks';
import LazyImage from '@/components/lazyImage';
import pcTip from '@/images/pcTip.png';

const pcTipText = 'Please visit the website in a web browser.';
export default function LargeScreenOnly ({ text = pcTipText }) {
  const { pc } = useResponsive();

  return !pc ? (
    <div className='px-4 flex flex-col gap-y-4 justify-between h-full pt-20'>
      <LazyImage
        src={pcTip}
        alt='background'
        className='w-full  min-h-[374px] object-cover object-center'
      />
      <h2 className='text-2xl font-extrabold text-center'>{text}</h2>
    </div>
  ) : null;
}
