import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useAmbassadorLevels } from '@/hooks/useAmbassador';
import { motion } from 'framer-motion';

const levelMap = {
  1: {
    bg: '',
    color: '#63691D',
  },
  2: {
    bg: '',
    color: '#63691D',
  },
};
const ArrowIcon = ({ stroke, ...props }) => (
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
      stroke="#63691D"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const AmbassadorSwiper = ({ userLevel }) => {
  const { data: list = [] } = useAmbassadorLevels();
  console.log({ list });
  const userConf = levelMap[userLevel];
  return Array.isArray(list) && list.length > 0 ? (
    <Swiper>
      {list.map((v) => {
        return (
          <SwiperSlide key={v.level}>
            <div
              className="p-5 h-[129px] space-y-3"
              style={{ color: userConf?.color }}
            >
              <div className="flex items-baseline gap-x-2.5">
                <div className="font-sf font-bold text-3xl">Lv {v.level}</div>
                <div className="text-xs font-thin flex items-center gap-x-1">
                  WISE Credit Score 150K <ArrowIcon stroke={userConf?.color} />
                </div>
              </div>
              <div className="relative w-[192px] h-1 rounded-full bg-white/40">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ backgroundColor: userConf?.color }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ ease: 'easeOut', duration: 1 }}
                />
              </div>
              <div className="text-xs font-thin flex items-center gap-x-1">
                TPoints 10,000 <ArrowIcon stroke={userConf?.color} />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  ) : (
    <div key="empty"></div>
  );
};
