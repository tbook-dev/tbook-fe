import Banner from '@/partials/home/banner'
import Solution from '@/partials/home/solution'

// import Features from '@/partials/home/features'
// import Partners from '@/partials/home/partners'
// import Product from '@/partials/home/product'
// import Testimonial from '@/partials/home/testimonial'
// import Subscribe from '@/partials/subscribe'
// import Calendly from '@/partials/calendly'

export default function Home () {
  return (
    <div className='w-full text-[#131517] mb-4'>
      <Banner />
      <Solution />
      {/* <Features />
      <Product />
      <Partners />
      <Testimonial /> */}
      {/* <Calendly /> */}
      {/* <Subscribe /> */}
    </div>
  )
}
