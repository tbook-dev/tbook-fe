import Lottie from 'lottie-react'
import redirectJSON from '@/images/social/redirect.json'
import tbook from '@/images/social/tbook.svg'

// import sucessSvg from '@/images/social/sucess.svg'
// import failedSvg from '@/images/social/fail.svg'
// import occupiedSvg from '@/images/social/occupied.svg'

const Result = ({ title, desc }) => {
  return (
    <div className='px-7 pt-4 text-center'>
      { title && <h2 className='text-white text-base font-medium mb-2'>{title}</h2> }
      <p className='text-sm text-[#9a89ae]'>{desc}</p>
    </div>
  )
}

// loading, sucess, failed, occupied
export default function RedirectSocial ({ status = 'loading', desc = '' }) {
  return (
    <div className='pt-[100px] lg:pt-[200px]'>
      {status === 'loading' && (
        <div className='flex flex-col items-center'>
          <div className='w-14 lg:w-20  mb-4 lg:mb-8'>
            <Lottie animationData={redirectJSON} loop={true} />
          </div>
          <Result
            desc='We are verifying the account connection results.'
          />
        </div>
      )}

      {status === 'sucess' && (
        <div className='flex flex-col items-center'>
          <img src={tbook} className='w-14 lg:w-20' />
          <Result title='Account authorized successfully!' />
        </div>
      )}
      {status === 'failed' && (
        <div className='flex flex-col items-center'>
          <img src={tbook} className='w-14 lg:w-20' />
          <Result
            title='Account authorization failed'
            desc={
              desc ||
              'We regret that the account authorization has failed. Please try again later.'
            }
          />
        </div>
      )}
      {status === 'occupied' && (
        <div className='flex flex-col items-center'>
          <img src={tbook} className='w-14 lg:w-20' />
          <Result title='Account occupied' desc={desc || 'Account occupied!'} />
        </div>
      )}
    </div>
  )
}
