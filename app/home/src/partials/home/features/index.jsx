import bgMp4 from '@/images/banner.mp4'
const pageConf = {
  h2: [
    <h2 key='1'>Customizable</h2>,
    <h2 key='2'>
      Incentive <span className='line1'>Campaigns</span>
    </h2>
  ],
  desc: 'Layer incentive campaigns, engage the core community, and build authentic community asset. Diverse and Easily Integrated Credential Templates. TBOOK provides a variety of credential templates across both onchain and offchain '
}
export default function () {
  return (
    <section className='relative overflow-hidden lg:h-[900px] lg:flex lg:flex-col lg:justify-center'>
      <video
        className=' w-full object-cover object-center mb-9 lg:mb-0 lg:absolute lg:inset-0 lg:h-full'
        autoPlay
        loop
        muted
      >
        <source src={bgMp4} type='video/mp4' />
        Your browser does not support the video tag. Please update your browser.
      </video>
      <main className='relative bx text-left space-y-6 px-6 lg:px-0 mb-[130px] lg:mb-0'>
        <div className='text-[24px] lg:text-[40px] leading-[38px] lg:leading-[40px] font-medium'>
          {pageConf.h2}
        </div>
        <p className='text-base lg:text-xl lg:leading-8'>{pageConf.desc}</p>
      </main>
    </section>
  )
}
