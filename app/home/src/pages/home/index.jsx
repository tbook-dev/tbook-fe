import 'swiper/css'
import 'swiper/css/navigation'

import Banner from '@/partials/banner'
import Features from '@/partials/features'
import Partners from '@/partials/partners'
import Product from '@/partials/product'
import Testimonial from '@/partials/testimonial'
// import Calendly from "@/partials/calendly";
import Subscribe from '@/partials/subscribe'
import Calendly from '@/partials/calendly'

export default function Home () {
  return (
    <div className='w-full text-[#202124] mb-4 px-4 lg:px-0'>
      <Banner />
      <Features />
      <Product />
      <Partners />
      <Testimonial />
      {/* <Calendly /> */}
      <Subscribe />
    </div>
  )
}
