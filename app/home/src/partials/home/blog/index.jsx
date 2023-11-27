import { Title, Desc } from '@/components/Para'
import p1 from './pics/1.png'
import p2 from './pics/2.png'
import p3 from './pics/3.png'
import p4 from './pics/4.png'

const moduleConf = {
  title: 'Blog',
  desc: 'Browse our latest news & resources',
  list: [
    {
      idx: 1,
      picUrl: p1,
      createTime: 'Apr, 13 2023',
      title: 'Why most of web3 token economies fail',
      link: 'https://tbookcommunity.medium.com/why-most-of-web3-token-economies-fail-5b1185a037c8'
    },
    {
      idx: 2,
      picUrl: p2,
      createTime: 'May, 20 2023',
      title:
        'Explaining the Four Pillars of Token Economics and the VE Token Model',
      link: 'https://tbookcommunity.medium.com/explaining-the-four-pillars-of-token-economics-and-the-ve-token-model-6b2291a17d27'
    },
    {
      idx: 3,
      picUrl: p3,
      createTime: 'Jun, 13 2023',
      title: 'Why Token Incentives Matter a World for the Web3 Economy',
      link: 'https://tbookcommunity.medium.com/why-token-incentives-matter-a-world-for-the-web3-economy-24b95d0826e4'
    },
    {
      idx: 4,
      picUrl: p4,
      createTime: 'Sep, 13 2023',
      title:
        'HashKey Group Plans to Issue HSK Ecological Points: An Overview of Rights and Distribution Mechanisms',
      link: 'https://tbookcommunity.medium.com/hashkey-group-plans-to-issue-hsk-ecological-points-an-overview-of-rights-and-distribution-287fa847067d'
    }
  ]
}

export default function Blog () {
  const blogs = moduleConf.list.slice(0, -1)
  const last = moduleConf.list[moduleConf.list.length - 1]
  return (
    <section
      id='blog'
      className='bx min-h-screen lg:py-[100px] flex flex-col justify-between'
    >
      <div className='flex flex-col items-center gap-y-6 px-6 lg:px-0 pt-[140px] pb-[70px] lg:pt-6 lg:pb-16'>
        <Title text={moduleConf.title} />
        <Desc text={moduleConf.desc} />
      </div>
      <div className='grid lg:grid-cols-2 lg:gap-x-10 px-6 lg:px-0 space-y-8 lg:space-y-0 lg:space-x-0 mb-9'>
        <div className='lg:flex lg:flex-col lg:gap-y-6'>
          {blogs.map(blog => {
            return (
              <a
                href={blog.link}
                target='_blank'
                key={blog.idx}
                className='bg-[#F8F8F8] rounded-xl p-5 flex flex-col lg:flex-row lg:gap-x-6 gap-y-6'
              >
                <img
                  src={blog.picUrl}
                  alt='blog'
                  className='w-full lg:w-[196px] lg:h-[164px] object-center'
                />
                <div className='space-y-6 text-black mb-6'>
                  <p className='text-base'>{blog.createTime}</p>
                  <h3 className='text-xl'>{blog.title}</h3>
                </div>
              </a>
            )
          })}
        </div>

        <a
          className='bg-[#F8F8F8] rounded-xl p-5 flex flex-col gap-y-6 lg:gap-y-16'
          href={last.link}
          target='_blank'
        >
          <img src={last.picUrl} alt='' />
          <div className='space-y-6 lg:space-y-8 text-black mb-6'>
            <p className='text-base'>{last.createTime}</p>
            <h3 className='text-xl'>{last.title}</h3>
            <button className='hidden lg:block w-max rounded-lg bg-[#131517] hover:opacity-70 text-white text-xl px-[30px] py-2.5 font-medium'>
              Read Blog
            </button>
          </div>
        </a>
      </div>
    </section>
  )
}
