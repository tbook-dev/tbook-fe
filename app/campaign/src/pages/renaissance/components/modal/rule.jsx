import Drawer from '@/components/drawer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import moduleConf from '../../conf';
import Button from '../ui/button';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';

export default function Modal ({ open, onCancel }) {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = () => {
    if (swiper.isEnd) {
      onCancel();
    } else {
      swiper.slideTo(activeIndex + 1);
    }
  };
  return (
    <Drawer open={open} onCancel={onCancel} title={null}>
      <div
        className='renaissance_rule_pagination px-8 pt-8 pb-12 bg-white/10 text-white w-full'
        style={{
          '--swiper-theme-color': 'white',
        }}
      >
        <Swiper
          onSwiper={s => {
            setActiveIndex(0);
            setSwiper(s);
          }}
          autoHeight
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          onSlideChange={s => {
            setActiveIndex(swiper.activeIndex);
          }}
        >
          <SwiperSlide>
            <div className='space-y-5 mb-8'>
              <h2 className='text-3xl font-syne text-center'>What to win?</h2>
              <div className='space-y-8 text-sm'>
                <p>
                  Get ready to scratch and win from a massive pool of prizes!
                  🌟💰
                </p>
                <div className='text-xs grid grid-cols-4'>
                  {moduleConf.rewards.list.map(v => {
                    return (
                      <div
                        key={v.name}
                        className='flex flex-col items-center gap-y-3'
                      >
                        <img src={v.picUrl} className='size-12' />
                        <p className='text-[#FFDFA2]/60'>{v.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='space-y-5 mb-8'>
              <h2 className='text-3xl font-syne text-center'>
                Dive into mystery
              </h2>
              <div className='space-y-8 text-sm'>
                <p>
                  🧐WISE Score represents your on-chain reputation with:
                  📈Wealth, Identity, Social and Engage. 🐈Generate WISE Score,
                  showcase your contributions and impact on TON ! 🎮💎
                </p>
                <p>Let’s scratch happy, earn more, and thrive together! 🚀💰</p>
                <div className='text-center text-[120px] leading-[120px]'>
                  💅
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='space-y-5 mb-8'>
              <h2 className='text-3xl font-syne text-center'>How to earn?</h2>
              <div className='space-y-8 text-sm'>
                <p>
                  🕹️Log in TBook mini app to get 10 free scratch cards every
                  day. 🧧🧧🧧
                </p>
                <p>
                  📣Invite friends to earn more lucky cards and boost
                  TPoints.🎉🎉
                </p>
                <div className='text-center text-[120px] leading-[120px]'>
                  🎊
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <Button className='w-full text-sm font-syne' onClick={handleClick}>
          {activeIndex !== 2 ? `Next` : `Let's get start`}
        </Button>
      </div>
    </Drawer>
  );
}
