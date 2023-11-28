import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Mousewheel, Autoplay } from 'swiper'
import useWindowSize from '@/hooks/useWindowSize'
import VideoPlayer from '@/components/video'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'

import clsx from 'clsx'
import { useResponsive } from 'ahooks'
import { forwardRef, useState } from 'react'
import v1 from './solution1.mp4'
import v2 from './solution2.mp4'
import v3 from './solution3.mp4'
import v4 from './solution4.mp4'
import h5Video from './h5solution.mp4'

const moduleConf = [
  {
    title: 'Optimization of the Overall Project Token Economics',
    desc: '',
    list: [
      {
        title: <h2>Evaluate the <span className="text-[#006EE9]">tokenomics allocation </span>plan</h2>,
        desc: 'Tbook helps to integrate multidimensional data aggregation to ensure efficient allocation of resources, including onchain data, incentive data, and private domain data, to provide comprehensive support for intelligent incentive decision-making.'
      },
      {
        title: <h2>Community <span className="text-[#006EE9]">profiling</span> & token airdrop incentive <span className="text-[#006EE9]">simulation</span></h2>,
        desc: 'Multiple user label management, simulating airdrop incentive effects in various scenarios to optimize capital efficiency.'
      }
    ],
    video: v1
  },
  {
    title: 'Optimizable Incentive Campaigns',
    desc: 'Layer incentive campaigns, engage the core community, and build authentic community assets. ',
    list: [
      {
        title: <h2>Diverse <span className="text-[#006EE9]">Credential Templates</span></h2>,
        desc: 'TBOOK provides a variety of credential templates across both onchain and offchain scenarios, catering to both web2 and web3. '
      },
      {
        title: <h2>Real-time feedback on <span className="text-[#006EE9]">incentive effect</span></h2>,
        desc: 'Enables real time iterative optimization of incentive strategies.'
      },
      {
        title: <h2>One stop incentive <span className="text-[#006EE9]">data insight</span> integration</h2>,
        desc: 'All the data around incentive campaigns  can be integrated into your own dashboard pages by using the advanced settings, including participation, convert ratio, asset claiming and more.'
      }
    ],
    video: v2
  },
  {
    title: 'Streamline incentive assets lifecycle',
    desc: '',
    list: [
      {
        title: <h2>Build authentic <span className="text-[#006EE9]">community assets</span></h2>,
        desc: 'The most fair asset minting should reflect the contributions of core community users. Minting assets corresponding to users based on their contributions is a very sustainable asset minting approach.'
      },
      {
        title: <h2>Multiple asset <span className="text-[#006EE9]">vesting</span> template</h2>,
        desc: 'Flexible and proven asset claim vesting mechanism to optimize capital efficiency.TBOOK offers an integrated asset management dashboard, making it easy to control incentive costs and maximize asset utilization.'
      }
    ],
    video: v3
  },
  {
    title: 'Community Governance',
    desc: '',
    list: [
      {
        title: <h2>Multiple <span className="text-[#006EE9]">governance template</span></h2>,
        desc: 'We provide rich and effective governance solutions, assisting protocols and applications in different scenarios to combine governance solutions that best suit their objectives'
      },
      {
        title: <h2>One stop <span className="text-[#006EE9]">token governance</span> platform</h2>,
        desc: 'We provide a one-stop token governance tool that supports governance needs for different scenarios and proposals. It manages the voting progress and encourages participation in the voting process.'
      },
      {
        title: <h2><span className="text-[#006EE9]">Governance incentive</span> program</h2>,
        desc: 'You can flexibly combine governance proposals based on strategies such as liquidity, delegation, staking, etc. Additionally, we offer appropriate incentive programs to encourage the community to foster a positive governance culture.'
      }
    ],
    video: v4
  }
]
const Slides = (_, ref) => {
  const [swiper, setSwiper] = useState(null)
  const [swiperIdx, setIdx] = useState(0)
  const { height } = useWindowSize()
  const { pc } = useResponsive()

  return (
    <div className='min-h-screen' ref={ref}>
      {pc ? (
        <Swiper
          className='h-screen'
          style={{ height: Math.max(840, height ?? 0) }}
          modules={[EffectFade, Mousewheel]}
          onSwiper={setSwiper}
          mousewheel={{ releaseOnEdges: true }}
          effect='fade'
          fadeEffect={{ crossFade: true }}
          pagination={{
            el: '.swiper-pagination',
            type: 'progressbar'
          }}
          onSlideChange={swiper => {
            setIdx(swiper?.activeIndex)
          }}
        >
          {moduleConf.map((v, idx) => (
            <SwiperSlide
              key={idx}
              className='relative h-screen video-mask line2'
            >
              <VideoPlayer
                src={v.video}
                className='w-full  object-cover object-center mb-9 lg:mb-0 lg:absolute lg:inset-0 lg:h-full'
              />

              <div className='z-10 bx relative lg:h-full lg:flex lg:flex-col lg:justify-between '>
                <div className='lg:h-16' />
                <div className='space-y-4 text-base'>
                  {v.title}
                  {v.desc && <h2 className='text-2xl w-[630px]'>{v.desc}</h2>}
                </div>

                <div className='lg:space-y-10 lg:w-[554px]'>
                  {v.list.map((v, idx) => (
                    <div
                      key={idx}
                      className='space-y-2 border-l lg:pl-4 border-l-[rgb(161,161,162)]/[0.25]'
                    >
                      <div className='text-xl font-medium'>{v.title}</div>
                      <p className='text-[#717374] text-base'>{v.desc}</p>
                    </div>
                  ))}
                </div>

                <div className={clsx('mb-20', idx === swiperIdx ? '' : '')}>
                  <div className='grid grid-cols-4 space-x-5 mb-4 w-[700px]'>
                    {moduleConf.map((v, idx) => (
                      <div
                        key={idx}
                        className={clsx(
                          'text-xs cursor-pointer',
                          swiperIdx === idx
                            ? 'text-[#131517]'
                            : 'text-[#717374]'
                        )}
                        onClick={() => {
                          swiper?.slideTo(idx)
                        }}
                      >
                        <p>{`${idx + 1}`.padStart(2, '0')}</p>
                        <p>{v.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className='grid grid-cols-4 space-x-5 h-1  w-[700px]'>
                    <div
                      className={clsx(
                        'col-start-1 bg-[rgb(161,161,162)]/[0.20] rounded-[10px]',
                        {
                          'col-end-2': swiperIdx === 0,
                          'col-end-3': swiperIdx === 1,
                          'col-end-4': swiperIdx === 2,
                          'col-end-5': swiperIdx === 3
                        }
                      )}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className='h-screen video-mask relative overflow-hidden line5'>
          <VideoPlayer
            src={h5Video}
            className='absolute inset-0 h-full w-full object-cover object-center'
          />
          <Swiper
            className='h-screen m-solotuion'
            modules={[Autoplay, EffectFade]}
            loop
            speed={200}
            effect='fade'
            fadeEffect={{ crossFade: true }}
            autoplay={{
              delay: 2000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false
            }}
          >
            {moduleConf.map((v, idx) => (
              <SwiperSlide
                key={idx}
                className='flex flex-col justify-end gap-y-5 px-6 transition-opacity pb-[100px]'
              >
                <div className='text-xs'>{v.title}</div>

                <div className='space-y-5'>
                  {v.list.map((v, idx) => (
                    <div
                      key={idx}
                      className='space-y-2 lg:border-l lg:pl-4 lg:border-l-[rgb(161,161,162)]/[0.25]'
                    >
                      <div className='text-sm font-medium'>{v.title}</div>
                      <p className='text-[#717374] text-xs'>{v.desc}</p>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}
export default forwardRef(Slides)
