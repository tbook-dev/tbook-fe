import shareIcon from '@/images/icon/share.svg';
import shareBlackIcon from '@/images/icon/share-black.svg';
import { getTMAsahreLink } from '@/utils/tma';
import { useTelegram } from '@/hooks/useTg';

export default function TMAsahreLink ({ data, text, isBot = false, color = 'light'}) {
  const { isTMA } = useTelegram()
  const TMAsahreLink = getTMAsahreLink({ data, text, isBot });
  const iconSrc = color === 'light' ? shareIcon : shareBlackIcon;
  return (
    isTMA && (
      <a
        href={TMAsahreLink}
        className='size-10 fixed top-16 right-4 cursor-pointer z-[11]'
      >
        <img alt='share icon' src={ iconSrc } className='rounded-lg size-10 backdrop-blur-md' />
      </a>
    )
  );
}
