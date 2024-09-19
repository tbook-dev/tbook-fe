import { useResponsive } from 'ahooks';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const footText = `© 2024 TBOOK All Rights Reserved`;
const chanelTips = [
  `For any inquiries or feedbacks of TBook products, please don't hesitate to reach out to us via Telegram:`,
  ` https://t.me/tbookincentive`,
];

export default function Footer ({theme}) {
  const showFooterTip = useSelector(state => state.global.showFooterTip);
  const { pc } = useResponsive();

  return (
    <footer className='w-full'>
      <div className={ clsx("text-xs text-center border-t bx", theme === 'light' ? 'text-black/60 border-black/10' : "text-white/60 border-white/10")}>
        {showFooterTip && (
          <h5 className={clsx('py-2', pc ? 'flex justify-center gap-x-1' : '')}>
            <p>{chanelTips[0]}</p>
            <a
              href={chanelTips[1]}
              target='_blank'
              className={ clsx("underline transition-all", theme === 'light' ? 'hover:text-black' : 'hover:text-white') }
            >
              {chanelTips[1]}
            </a>
          </h5>
        )}

        <p className='py-3'>{footText}</p>
      </div>
    </footer>
  );
}
