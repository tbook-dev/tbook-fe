import Banner from '@/partials/home/banner'
import Solution from '@/partials/home/solution'
import Features from '@/partials/home/features'
import About from '@/partials/home/about'
import Blog from '@/partials/home/blog'
import Calendly from '@/partials/calendly'

export default function Home () {
  return (
    <div className='w-full text-[#131517] mb-4'>
      <Banner />
      <Solution />
      <Features />
      <About />
      <Blog />
      <Calendly />
    </div>
  )
}
