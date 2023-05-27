import Button from '@/components/button'
import bg from '@/images/home-bg.png'

export default function () {
  return (
    <div
      className='w-full  bg-[center_top_1rem]'
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className='w-[800px] mx-auto pt-[280px]'>
        <div className='text-center mb-8'>
          <h2 className='text-colorful1 font-bold text-6xl'>
            Incentivize core
          </h2>
          <h2 className='text-colorful1 font-bold text-6xl'>
            communities and builders
          </h2>
          <p className='text-white text-3xl'>
            grant easily and optimize continuously
          </p>
        </div>
        <div className='flex justify-center'>
          <Button type='primary' className='mr-6'>
            Get Started
          </Button>
          <Button>Developer Center</Button>
        </div>
      </div>
    </div>
  )
}
