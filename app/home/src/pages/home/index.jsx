import Banner from '@/partials/home/banner'
import Solution from '@/partials/home/solution'
import About from '@/partials/home/about'
import Blog from '@/partials/home/blog'
import Calendly from '@/partials/calendly'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Home () {
  const main = useRef()
  const scrollTween = useRef()
  useGSAP(
    () => {
      const panels = gsap.utils.toArray(main.current?.children)
      let tops = panels.map(panel =>
        ScrollTrigger.create({ trigger: panel, start: 'top top' })
      )

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: () =>
            panel.offsetHeight < window.innerHeight
              ? 'top top'
              : 'bottom bottom'
        })
      })

      ScrollTrigger.create({
        snap: {
          snapTo: (progress, self) => {
            let panelStarts = tops.map(st => st.start),
              snapScroll = gsap.utils.snap(panelStarts, self.scroll())
            return gsap.utils.normalize(
              0,
              ScrollTrigger.maxScroll(window),
              snapScroll
            )
          },
          duration: 1
        }
      })
    },
    [],
    main
  )

  const goToSection = i => {
    scrollTween.current = gsap.to(window, {
      scrollTo: { y: i * window.innerHeight, autoKill: false },
      duration: 1,
      id: 'scrollTween',
      onComplete: () => (scrollTween.current = null),
      overwrite: true
    })
  }

  return (
    <div className='w-full text-[#131517] mb-4' ref={main}>
      <Banner />
      <Solution />
      <About />
      <Blog />
      <Calendly />
    </div>
  )
}
