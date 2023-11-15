// import Typed from '@/components/Type'
// import banner from '@/images/banner-01.png'
// import { Button } from "@tbook/ui";
// import { conf } from "@tbook/utils";

// const { appLink, myLink } = conf;
import bgMp4 from '@/images/banner.mp4'
const pageConf = {
  h1: [
    {
      text: 'Incentive, ',
      className: ''
    },
    {
      text: 'Expand',
      className: 'text-[#006EE9] font-semibold'
    },
    {
      text: ', and Evaluate: ',
      className: ''
    },
    {
      text: 'Powering ',
      className: 'text-[#F8B917] font-semibold'
    },
    {
      text: 'Web3 Success',
      className: ''
    }
  ],
  desc: 'Empower core communities and builders through strategic incentives, fostering sustained growth and engagement.'
}
export default function () {
  return (
    <section
      id='home'
      className='relative overflow-hidden pt-[180px] pb-[200px] lg:pt-[230px] lg:pb-[326px]'
    >
      <video
        className='absolute inset-0 h-full w-full object-cover'
        autoPlay
        loop
        muted
      >
        <source src={bgMp4} type='video/mp4' />
        Your browser does not support the video tag. Please update your browser.
      </video>
      <main className='relative text-center bx'>
        <h1 className='text-[32px] leading-[38px] font-medium px-6 lg:text-[60px] lg:leading-[72px] mb-6 lg:mb-10'>
          {pageConf.h1.map(v => {
            return <span className={v.className}>{v.text}</span>
          })}
        </h1>
        <p className='text-base lg:text-xl lg:w-[750px] lg:mx-auto'>
          {pageConf.desc}
        </p>
      </main>
    </section>
  )
}
