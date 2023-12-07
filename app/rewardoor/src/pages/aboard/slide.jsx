import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import slide1 from '@/images/aboard/slide1.png'
import slide2 from '@/images/aboard/slide2.png'
import slide3 from '@/images/aboard/slide3.png'
import slide4 from '@/images/aboard/slide4.png'

const conf = [
  {
    img: slide1,
    title: 'Incentivize core communities and builders',
    desc: 'Empower core communities and builders through strategic incentives, fostering sustained growth and engagement. '
  },
  {
    img: slide2,
    title: 'Comprehensive Support for Various Incentive Scenarios',
    desc: 'From marketing events to governance rewards and social plans, real-time feedback help projects to refine and optimize their incentive strategies.'
  },
  {
    img: slide3,
    title: 'Safe and Flexible Asset Vesting and Management',
    desc: 'Manage various web3 incentive assets with TBOOK. Safeguard the security of the whole asset lifecycle through multi-channel identity verification.'
  },
  {
    img: slide4,
    title:
      'Smart airdrop and intelligent token-economics design based on simulation',
    desc: 'Analyze diverse data sources and budgets to create airdrop strategies. Integrate various data to streamline the design and implementation of token-economics.'
  }
]

export default function Slide () {
  return (
    <Swiper
      className='w-full h-full rounded-2.5xl'
      modules={[Pagination]}
      style={{
        '--swiper-theme-color': '#fff',
        '--swiper-pagination-bullet-inactive-color': '#fff'
      }}
      pagination={{
        clickable: true
      }}
    >
      {conf.map((v, idx) => {
        return (
          <SwiperSlide key={idx}>
            <div className='bg-black h-full py-10 flex flex-col justify-center overflow-y-auto'>
              <div className='flex justify-center'>
                <img
                  src={v.img}
                  alt='slide'
                  className='w-full h-[450px] object-contain object-center'
                />
              </div>

              <div className='mx-4'>
                <h2 className='text-[32px] font-extrabold mb-4'>{v.title}</h2>
                <p className='text-base font-medium'>{v.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
