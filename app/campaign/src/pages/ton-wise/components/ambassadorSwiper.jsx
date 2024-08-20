import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useAmbassadorLevels } from '@/hooks/useAmbassador';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { preloadBatchImage } from '@/utils/common';
import lv0cat from '@/images/cat/0.png';
import lv1cat from '@/images/cat/1.png';
import LockIcon from '@/images/icon/svgr/lock.svg?react';

preloadBatchImage([lv0cat, lv1cat]);

const levelMap = {
  0: {
    bg: 'bg-gradient-to-b from-[#EEECC0] to-[#D0D86F]',
    cat: lv0cat,
  },
  1: {
    bg: 'bg-gradient-to-br from-[#dfeec0] to-[#B4d86f]',
    cat: lv1cat,
  },
};
export const ArrowIcon = ({ stroke = '#63691D', ...props }) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.125 2.25L7.875 6 4.125 9.75"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const AmbassadorSwiper = ({
  userLevel = 0,
  dispalyLevel = 0,
  setDisplayLevel,
  color = '#63691D',
}) => {
  const { data: list = [] } = useAmbassadorLevels();
  const userConf = levelMap[dispalyLevel];
  const isGranted = userLevel >= dispalyLevel;

  return Array.isArray(list) && list.length > 0 ? (
    <Swiper
      slidesPerView={1.1}
      spaceBetween={10}
      className="h-[120px] w-full"
      onSlideChange={(s) => {
        setDisplayLevel(s.activeIndex);
      }}
    >
      {list.map((v) => {
        return (
          <SwiperSlide key={v.level} className="relative">
            {({ isActive }) => (
              <>
                <div
                  className={clsx(
                    'p-5 space-y-3 rounded-xl relative',
                    userConf?.bg
                  )}
                  style={{ color }}
                >
                  <div className="flex items-baseline gap-x-2.5">
                    <div className="font-sf font-bold text-3xl">
                      Lv {v.level}
                    </div>
                    <div className="text-xs font-thin flex items-center gap-x-1">
                      WISE Credit Score 150K <ArrowIcon stroke={color} />
                    </div>
                  </div>
                  <div className="relative w-[192px] h-1 rounded-full bg-white/40">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ ease: 'easeOut', duration: 1 }}
                    />
                  </div>
                  <div className="text-xs font-thin flex items-center gap-x-1">
                    TPoints 10,000 <ArrowIcon stroke={color} />
                  </div>
                </div>
                <img
                  src={userConf.cat}
                  className="size-[112px] absolute top-0 right-0"
                />
                {isGranted
                  ? null
                  : isActive && (
                      <div
                        className="absolute bottom-1 right-2 px-1.5 py-0.5 rounded-2.5xl bg-white/40 flex items-center gap-x-0.5 text-xs"
                        style={{ color: color }}
                      >
                        <LockIcon className="size-[14px]" fill={color} />
                        to unlock
                      </div>
                    )}
              </>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  ) : (
    <div
      key="empty"
      className={clsx(
        'h-[120px] w-full',
        'p-5 space-y-3 rounded-xl relative',
        'animate-pulse bg-[#1f1f1f]/30'
      )}
    ></div>
  );
};

export default AmbassadorSwiper;
