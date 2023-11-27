import bgMp4 from './contact.mp4'
import { Desc } from '@/components/Para'

const moduleConf = {
  title: 'Build with us',
  desc: 'Join Our Exclusive Community! Follow us for Exclusive Updates, Insights, and Special Offers.',
  btn: 'Book a demo',
  caLink: 'https://calendly.com/keylasue/30min'
}

export default function ContactCalendly () {
  const handleClick = () => {
    Calendly?.initPopupWidget({ url: moduleConf.caLink })
  }
  return (
    <section
      id='contact'
      className='relative overflow-hidden py-20 lg:pb-[100px] line3 video-mask'
    >
      <video
        className='absolute inset-0 h-full w-full object-cover object-center'
        autoPlay
        loop
        muted
      >
        <source src={bgMp4} type='video/mp4' />
        Your browser does not support the video tag. Please update your browser.
      </video>

      <main className='relative text-center bx lg:w-[610px] space-y-10 z-10'>
        <div className='space-y-6 text-center lg:mb-10'>
          <Desc text={moduleConf.title} />
          <p className='text-base'>{moduleConf.desc}</p>
        </div>

        <div className='flex justify-center'>
          <button
            onClick={handleClick}
            className='rounded-lg bg-[#131517] hover:opacity-70 text-white text-xl px-[30px] py-2.5 font-medium'
          >
            {moduleConf.btn}
          </button>
        </div>
      </main>
    </section>
  )
}
