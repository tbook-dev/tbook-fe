import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useAmbassadorLevels } from '@/hooks/useAmbassador';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { preloadBatchImage } from '@/utils/common';
import lv0cat from '@/images/cat/0.png';
import lv1cat from '@/images/cat/1.png';
import LockIcon from '@/images/icon/svgr/lock.svg?react';
import { formatStandard, formatImpact } from '@tbook/utils/lib/conf';
import { divide } from 'lodash';
import { Link } from 'react-router-dom';

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
  tpointsNum = 0,
  setDisplayLevel,
  color = '#63691D',
  wiseScoreNum: totalScore,
}) => {
  const { data: list = [] } = useAmbassadorLevels();
  const userConf = levelMap[dispalyLevel];
  return Array.isArray(list) && list.length > 0 ? (
    <Swiper
      slidesPerView={1.1}
      spaceBetween={10}
      initialSlide={userLevel}
      className="h-[120px] w-full"
      onSlideChange={(s) => {
        setDisplayLevel(s.activeIndex);
      }}
    >
      {list.map((v) => {
        return (
          <SwiperSlide key={v.level} className="relative">
            <div
              className={clsx(
                'p-5 space-y-3 rounded-xl relative',
                userConf?.bg
              )}
              style={{ color }}
            >
              <div className="flex items-baseline gap-x-2.5">
                <div className=" font-bold text-3xl">Lv {v.level}</div>
                <Link
                  className="text-xs font-thin flex items-center gap-x-1"
                  to="/wise-score"
                >
                  WISE Credit Score {formatImpact(totalScore)}
                  <ArrowIcon stroke={color} />
                </Link>
              </div>
              <div className="relative w-[192px] h-1 rounded-full bg-white/40 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{
                    width:
                      userLevel === v.level
                        ? `${
                            v.nextLevelPointsNum === 0
                              ? 100
                              : divide(tpointsNum * 100, v.nextLevelPointsNum)
                          }%`
                        : 0,
                  }}
                  transition={{ ease: 'easeOut', duration: 1 }}
                />
              </div>
              <Link
                className="text-xs font-thin flex items-center gap-x-1"
                to="/event/renaissance"
              >
                TPoints{' '}
                {formatStandard(
                  userLevel === v.level ? tpointsNum : v.nextLevelPointsNum
                )}
                <ArrowIcon stroke={color} />
              </Link>
            </div>
            <img
              src={userConf?.cat}
              className="size-[112px] absolute top-0 right-0"
            />
            {userLevel >= v.level ? null : (
              <div
                className="absolute bottom-1 right-2 px-1.5 py-0.5 rounded-2.5xl bg-white/40 flex items-center gap-x-0.5 text-xs"
                style={{ color: color }}
              >
                <LockIcon className="size-[14px]" fill={color} />
                to unlock
              </div>
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
