import logo from '@tbook/share/images/icon/logo.svg'
import twitter from '@/images/icon/twitter.svg'
import { links } from './Header'

const moduleConf = {
  title: 'TBOOK',
  desc: `  Explore more effective and equitable incentive protocols to
  accelerate the web3 world.`,
  twitterLink: `https://twitter.com/realtbook?s=21&t=ccMMXb68Jav5nnocUz9JLw`,
  navigation: {
    title: 'Navigation',
    links
  },
  help: {
    title: 'Help',
    links: [
      {
        text: 'How to set up an Incentive Campaign with TBOOK?',
        link: ''
      },
      {
        text: 'How to track the performance of your incentive campaigns?',
        link: ''
      },
      {
        text: 'How to Get Role ID in Discord',
        link: ''
      },
      {
        text: 'TBOOK Telegram Bot Settings',
        link: ''
      },
      {
        text: 'How to set up an NFT as a reward?',
        link: ''
      }
    ]
  },
  copyright: '© 2023 TBOOK All rights reserved'
}

export default function Footer () {
  return (
    <footer>
      <div className='flex flex-col items-center bx lg:flex-row lg:justify-between gap-y-10 lg:gap-y-0 pt-10 lg:pt-[70px] pb-[130px] lg:pb-16'>
        <div className='w-[255px]'>
          <div className='flex flex-col items-center justify-between gap-y-6 lg:gap-y-10 lg:items-start '>
            <div className='flex items-center gap-x-3'>
              <img src={logo} className='w-8' />
              <h2 className='text[36px] leading-[36px] font-medium'>
                {moduleConf.title}
              </h2>
            </div>
            <p className='text-[#333]'>{moduleConf.desc}</p>

            <div>
              <h3 className='font-bold text-c9 mb-[30px] hidden lg:block'>
                Contact us
              </h3>
              <div className='flex items-center'>
                <a href={moduleConf.twitterLink} target='_blank'>
                  <img src={twitter} className='w-6' />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-x-6 text-center gap-y-6 lg:gap-y-0 lg:text-left'>
          <div className='flex flex-col gap-y-4 w-[200px] mx-auto'>
            <h2 className='font-bold bold text-xl'>
              {moduleConf.navigation.title}
            </h2>
            {moduleConf.navigation.links.map(link => {
              return (
                <a
                  key={link.anchor}
                  href={`#${link.anchor}`}
                  className='text-[#131517] text-base font-medium hover:opacity-70'
                >
                  {link.text}
                </a>
              )
            })}
          </div>
          <div className='flex flex-col gap-y-4 w-[275px] mx-auto'>
            <h2 className='font-bold bold text-xl'>{moduleConf.help.title}</h2>
            {moduleConf.help.links.map((link,idx) => {
              return (
                <a
                  key={idx}
                  href={`#${link.text}`}
                  target='_blank'
                  className='text-[#131517] text-base font-medium hover:opacity-70'
                >
                  {link.text}
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <div className='py-8 bx text-xs text-center'>{moduleConf.copyright}</div>
    </footer>
  )
}
