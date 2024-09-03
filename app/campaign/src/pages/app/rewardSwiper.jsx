import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import pointIcon from '@/images/icon/point.svg';
import LazyImage from '@/components/lazyImage';
import { memo } from 'react';
import { cn } from '@/utils/conf';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { formatImpact } from '@tbook/utils/lib/conf';
const RewardSwiper = ({ rewardList, size, setDisplayIdx }) => (
  <Swiper
    className={cn('size-20 flex-none', size === 'large' && 'size-[200px]')}
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
        <SwiperSlide key={r.id} className="rounded-xl">
          {r.type === 'point' && (
            <div className="w-full h-full bg-[#CFF469] rounded-xl flex flex-col justify-center items-center gap-x-2">
              <img
                src={pointIcon}
                className={cn('w-14', size === 'large' && 'w-44')}
              />
              <p
                className={cn(
                  'text-[#503658] font-bold text-xs',
                  size === 'large' && 'text-2xl'
                )}
              >
                {formatImpact(r.number)} Pts
              </p>
            </div>
          )}
          {(r.type === 'nft' || r.type === 'sbt') && (
            <div className="w-full h-full bg-[#12172F] rounded-xl flex justify-center items-center gap-x-2">
              <LazyImage
                className={cn(
                  'size-14 rounded-full object-center object-cover',
                  size === 'large' && 'size-44'
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

export default memo(RewardSwiper);
