import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { sum } from 'lodash'
import Banner from '@/partials/home/banner'
import Solution from '@/partials/home/solution'
import Features from '@/partials/home/features'
import About from '@/partials/home/about'
import Blog from '@/partials/home/blog'
import Calendly from '@/partials/calendly'
import Footer from '@/layout/Footer'

const papaModules = [
  {
    component: <Banner />,
    height: 1,
    speed: 0.5
  },
  {
    component: <Solution />,
    height: 1,
    speed: 0.5
  },
  {
    component: <Features />,
    height: 1,
    speed: 0.5
  },
  {
    component: <About />,
    height: 1,
    speed: 0.5
  },
  {
    component: <Blog />,
    height: 1,
    speed: 0.5
  },
  {
    component: (
      <div>
        <Calendly />
        <Footer />
      </div>
    ),
    height: 1,
    speed: 1.5
  }
]

export default function Home () {
  return (
    <div className='w-screen h-screen text-[#131517] relative'>
      <Parallax pages={sum(papaModules.map(v => v.height))}>
        <ParallaxLayer sticky={{ start: 1, end: 3 }}>
          <p>Scroll down</p>
        </ParallaxLayer>
        {papaModules.map((module, index) => {
          const currentOffset = sum(
            papaModules.slice(0, index).map(v => v.height)
          )
          return (
            <ParallaxLayer
              key={index}
              offset={currentOffset}
              speed={module.speed}
            >
              {module.component}
            </ParallaxLayer>
          )
        })}
      </Parallax>
    </div>
  )
}
