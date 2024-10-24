import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import pointIcon from '@/images/icon/point.svg';
import LazyImage from '@/components/lazyImage';
import { memo } from 'react';
import { cn } from '@/utils/conf';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { formatImpact } from '@tbook/utils/lib/conf';
const sizeMap = {
  large: {
    swiper: 'size-[200px]',
    point: 'w-44',
    picUrl: 'w-44',
  },
  small: {
    swiper: 'size-7',
    point: 'w-5',
    picUrl: 'w-7',
  },
  default: {
    swiper: 'size-20',
    point: 'w-14',
    picUrl: 'w-20',
  },
};
const RewardSwiper = ({ rewardList, className, size, setDisplayIdx }) => {
  const conf = sizeMap[size ?? 'default'] ?? sizeMap.default;
  return (
    <Swiper
      className={cn('size-20 flex-none', conf.swiper, className)}
      modules={[EffectCards]}
      effect="cards"
      grabCursor={true}
      onSwiper={() => {
        setDisplayIdx(0);
      }}
      onSlideChange={(s) => {
        setDisplayIdx(s.activeIndex);
      }}
    >
      {rewardList.map((r) => {
        return (
          <SwiperSlide key={r.id}>
            {r.type === 'point' &&
              (size === 'large' ? (
                <div className="w-full h-full bg-[#CFF469] rounded-xl flex flex-col justify-center items-center gap-x-2 z-0">
                  <img src={pointIcon} className={conf.point} />
                  <p className={cn('text-[#503658] font-bold', 'text-2xl')}>
                    {formatImpact(r.number)} Pts
                  </p>
                </div>
              ) : (
                <div className="w-full h-full bg-[#CFF469] rounded flex justify-center items-center gap-x-2">
                  <LazyImage
                    className={cn('object-center object-cover', conf.point)}
                    src={pointIcon}
                    alt={`${r.type} picturl`}
                  />
                </div>
              ))}
            {(r.type === 'nft' || r.type === 'sbt') && (
              <div className="w-full h-full bg-[#12172F] rounded-xl flex justify-center items-center gap-x-2">
                <LazyImage
                  className={cn(
                    'rounded-full object-center object-cover',
                    conf.picUrl
                  )}
                  src={r.picUrl}
                  alt={`${r.type} picturl`}
                />
              </div>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default memo(RewardSwiper);
