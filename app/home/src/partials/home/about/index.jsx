import { Title, Desc } from '@/components/Para'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { useResponsive } from 'ahooks'
import 'swiper/css'
import 'swiper/css/navigation'
import clsx from 'clsx'

const moduleConf = {
  title: 'About',
  desc: 'What they say about us',
  list: [
    {
      id: 1,
      quote:
        'Since using this platform, our team has been more motivated and engaged than ever before. The ability to mix and match different credentials has incentivized everyone to work harder and collaborate better. Thank you for creating such an innovative solution!',
      author: 'Chari Zhang / CEO of Read2n',
      position: 'CEO of Read2n'
    },
    {
      id: 2,
      quote:
        'Since using this platform, our team has been more motivated and engaged than ever before. The ability to mix and match different credentials has incentivized everyone to work harder and collaborate better. Thank you for creating such an innovative solution!',
      author: 'Chari Zhang / CEO of Read2n',
      position: 'CEO of Read2n'
    },
    {
      id: 3,
      quote:
        'Since using this platform, our team has been more motivated and engaged than ever before. The ability to mix and match different credentials has incentivized everyone to work harder and collaborate better. Thank you for creating such an innovative solution!',
      author: 'Chari Zhang / CEO of Read2n',
      position: 'CEO of Read2n'
    },
    {
      id: 4,
      quote:
        'Since using this platform, our team has been more motivated and engaged than ever before. The ability to mix and match different credentials has incentivized everyone to work harder and collaborate better. Thank you for creating such an innovative solution!',
      author: 'Chari Zhang / CEO of Read2n',
      position: 'CEO of Read2n'
    },
    {
      id: 5,
      quote:
        'Since using this platform, our team has been more motivated and engaged than ever before. The ability to mix and match different credentials has incentivized everyone to work harder and collaborate better. Thank you for creating such an innovative solution!',
      author: 'Chari Zhang / CEO of Read2n',
      position: 'CEO of Read2n'
    },
    {
      id: 6,
      quote:
        'Since using this platform, our team has been more motivated and engaged than ever before. The ability to mix and match different credentials has incentivized everyone to work harder and collaborate better. Thank you for creating such an innovative solution!',
      author: 'Chari Zhang / CEO of Read2n',
      position: 'CEO of Read2n'
    },
    {
      id: 7,
      quote:
        'Since using this platform, our team has been more motivated and engaged than ever before. The ability to mix and match different credentials has incentivized everyone to work harder and collaborate better. Thank you for creating such an innovative solution!',
      author: 'Chari Zhang / CEO of Read2n',
      position: 'CEO of Read2n'
    }
  ]
}
const Card = ({ id, isActive, quote, author, position }) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-start gap-y-5 px-8 py-6 bg-[#F7FBFE] rouned-[25px]',
        !isActive && 'opacity-40'
      )}
    >
      <svg
        width='68'
        height='72'
        viewBox='0 0 68 72'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.6281 22.587C13.7116 22.3252 14.8191 22.1933 15.93 22.194C24.7275 22.194 31.8572 30.342 31.8572 40.389C31.8572 50.439 24.7275 58.587 15.93 58.587C7.1325 58.587 0 50.442 0 40.389C0 40.095 0.005625 39.798 0.0196875 39.504H0C0 24.339 10.8 12 24.075 12V18.108C19.7691 18.108 15.7978 19.782 12.6281 22.587ZM48.2738 22.587C49.3369 22.329 50.4394 22.194 51.57 22.194C60.3675 22.194 67.5 30.342 67.5 40.389C67.5 50.439 60.3675 58.587 51.57 58.587C42.7725 58.587 35.6428 50.442 35.6428 40.389C35.6428 40.095 35.6484 39.798 35.6625 39.504H35.6428C35.6428 24.339 46.4428 12 59.7178 12V18.108C55.4091 18.108 51.4434 19.782 48.2738 22.587Z'
          fill='#131517'
        />
      </svg>
      <h3 className='text-base leading-8 lg:text-[24px]'>{quote}</h3>
      <div className='space-y-2'>
        <h4 className='text-[#67646A] text-xs'>{author}</h4>
        <p className='text-[#131517] text-xs'>{position}</p>
      </div>
    </div>
  )
}
export default function About () {
  const { pc } = useResponsive()
  return (
    <section className='lg:pt-[110px] lg:pb-[90px] space-y-8 lg:space-y-[120px]'>
      <div className='flex flex-col items-center gap-y-6'>
        <Title text={moduleConf.title} />
        <Desc text={moduleConf.desc} />
      </div>

      <div
        className='px-6 lg:px-0'
        style={{
          '--swiper-navigation-size': '16px',
          '--swiper-navigation-color': '#4B4C4D'
        }}
      >
        <Swiper
          modules={[Navigation]}
          slidesPerView='auto'
          spaceBetween={pc ? 32 : 48}
          centeredSlides
          initialSlide={Math.floor(moduleConf.list.length / 2)}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
          }}
        >
          {moduleConf.list.map(v => (
            <SwiperSlide key={v.id} style={{ width: pc ? 620 : undefined }}>
              {({ isActive }) => <Card isActive={isActive} {...v} />}
            </SwiperSlide>
          ))}
        </Swiper>
        {pc && (
          <div className='relative w-[72px] pt-10 pb-[90px] h-7 mx-auto'>
            <div className='swiper-button-prev'></div>
            <div className='swiper-button-next'></div>
          </div>
        )}
      </div>
    </section>
  )
}
