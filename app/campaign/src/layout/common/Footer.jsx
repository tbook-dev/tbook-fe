import { useResponsive } from 'ahooks';
import clsx from 'clsx';

const footText = `© 2024 TBOOK All Rights Reserved`;
const chanelTips = [
  `For any inquiries or feedbacks of TBook products, please don't hesitate to reach out to us via Telegram:`,
  ` https://t.me/tbookincentive`,
];

export default function Footer () {
  const { pc } = useResponsive();
  return (
    <footer className='bx text-xs text-center text-white/60 border-t border-white/10'>
      <h5 className={clsx('py-2', pc ? 'flex justify-center gap-x-1' : '')}>
        <p>{chanelTips[0]}</p>
        <a
          href={chanelTips[1]}
          target='_blank'
          className='underline hover:text-white transition-all'
        >
          {chanelTips[1]}
        </a>
      </h5>
      <p className='py-3'>{footText}</p>
    </footer>
  );
}
