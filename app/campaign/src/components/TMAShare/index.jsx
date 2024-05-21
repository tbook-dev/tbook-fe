import shareIcon from '@/images/icon/share.svg';
import { getTMAsahreLink } from '@/utils/tma';
import { useTelegram } from '@/hooks/useTg';

export default function TMAsahreLink ({ data }) {
  const { isTMA } = useTelegram();
  const TMAsahreLink = getTMAsahreLink(data);

  return (
    isTMA && (
      <a
        href={TMAsahreLink}
        className='size-10 fixed top-16 right-4 cursor-pointer z-10'
      >
        <img alt='share icon' src={shareIcon} className='size-10' />
      </a>
    )
  );
}
