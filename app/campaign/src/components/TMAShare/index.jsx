import shareIcon from '@/images/icon/share.svg';
import { getTMAsahreLink } from '@/utils/tma';
import { useTelegram } from '@/hooks/useTg';

export default function TMAsahreLink ({ data, isBot = false}) {
  const { isTMA } = useTelegram();
  const TMAsahreLink = getTMAsahreLink(data, isBot);

  return (
    isTMA && (
      <a
        href={TMAsahreLink}
        className='size-10 fixed top-16 right-4 cursor-pointer z-[11]'
      >
        <img alt='share icon' src={shareIcon} className='size-10 backdrop-blur-md rounded-lg' />
      </a>
    )
  );
}
