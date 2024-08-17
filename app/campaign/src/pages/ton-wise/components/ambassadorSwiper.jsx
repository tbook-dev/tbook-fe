import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useAmbassadorLevels } from '@/hooks/useAmbassador';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const levelMap = {
  0: {
    color: '#63691D',
    bg: 'bg-gradient-to-b from-[#EEECC0] to-[#D0D86F]',
    img: '',
  },
  1: {
    color: '#63691D',
    bg: 'bg-gradient-to-b from-[#EEECC0] to-[#D0D86F]',
    img: '',
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
const AmbassadorSwiper = ({ userLevel = 0 }) => {
  const { data: list = [] } = useAmbassadorLevels();
  const userConf = levelMap[userLevel];
  console.log({ userConf, userLevel });
  return Array.isArray(list) && list.length > 0 ? (
    <Swiper slidesPerView={1.1} spaceBetween={10} className="h-[120px] w-full">
      {list.map((v) => {
        return (
          <SwiperSlide key={v.level}>
            <div
              className={clsx('p-5 space-y-3 rounded-xl', userConf?.bg)}
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

export default AmbassadorSwiper;
