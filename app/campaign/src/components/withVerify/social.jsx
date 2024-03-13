import Lottie from 'lottie-react'
import redirectJSON from '@/images/social/loading.json'
// import tbook from '@/images/social/tbook.svg'
import failedSvg from '@/images/social/logo-error2.svg'
import sucessSvg from '@/images/social/logo-ok2.svg'
import useSocial from '@/hooks/useSocial'
import { useSelector } from 'react-redux'
import { Modal } from 'antd'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  setShowSocialRedirectModal,
  setShowMergeAccountModal
} from '@/store/global'
import { useResponsive } from 'ahooks'

// import sucessSvg from '@/images/social/sucess.svg'
// import failedSvg from '@/images/social/fail.svg'
// import occupiedSvg from '@/images/social/occupied.svg'

const Result = ({ title, desc }) => {
  return (
    <div className='px-7 pt-4 text-center'>
      {title && (
        <h2 className='text-white text-lg font-medium mb-2'>{title}</h2>
      )}
      <p className='text-xs text-[#A1A1A2]'>{desc}</p>
    </div>
  )
}

// loading, sucess, failed, occupied
export default function Social () {
  const { pc } = useResponsive()
  const { type, status, desc } = useSelector(
    s => s.global.socialRedirectModalData
  )
  //   const navigate = useNavigate();
  const dispath = useDispatch()
  const showSocialRedirectModal = useSelector(
    s => s.global.showSocialRedirectModal
  )

  const { getfnByName } = useSocial()
  const { failText, loginFn } = getfnByName(type)
  const handleCloseModal = useCallback(() => {
    dispath(setShowSocialRedirectModal(false))
  }, [])

  const handleMergeAccount = useCallback(() => {
    handleCloseModal()
    setTimeout(() => {
      dispath(setShowMergeAccountModal(true))
    }, 200);
  }, [])

  return (
    <Modal
      title={null}
      footer={null}
      closable={pc}
      open={showSocialRedirectModal}
      onCancel={handleCloseModal}
      centered
    >
      <div className=''>
        {status === 'loading' && (
          <div className='flex flex-col items-center'>
            <div className='w-14 lg:w-20 h-14 lg:h-20  mb-4 lg:mb-8'>
              <Lottie animationData={redirectJSON} loop={true} />
            </div>
            <Result desc='We are verifying the account connection results...' />
          </div>
        )}

        {status === 'sucess' && (
          <div className='flex flex-col items-center'>
            <img src={sucessSvg} className='w-14 lg:w-20 h-14 lg:h-20' />
            <Result title='Account authorized successfully!' desc={desc} />
          </div>
        )}
        {status === 'failed' && (
          <div className='flex flex-col items-center'>
            <img src={failedSvg} className='w-14 lg:w-20 h-14 lg:h-20' />
            <Result
              title='Failed to authorize'
              desc={failText || 'Please try again later.'}
            />
            <div className='w-[312px] mx-auto text-white mt-8 space-y-3'>
              <button
                className='bg-[#904BF6] h-[42px] w-full shadow-s4 rounded hover:opacity-70'
                onClick={() => {
                  loginFn(true)
                }}
              >
                Try again
              </button>
            </div>
          </div>
        )}
        {status === 'occupied' && (
          <div className='flex flex-col items-center'>
            <img src={failedSvg} className='w-14 lg:w-20 h-14 lg:h-20' />
            <Result
              title='Failed to authorize'
              desc={desc || 'Account occupied!'}
            />
          </div>
        )}

        {status === 'occupied-merge' && (
          <div className='-mx-6'>
            <div className='flex flex-col items-center'>
              <img src={failedSvg} className='w-14 lg:w-20 h-14 lg:h-20' />
              <Result
                title='Failed to authorize'
                desc={desc || 'Account occupied!'}
              />
            </div>
            <div className='px-4 py-3 flex flex-col-reverse gap-y-3 lg:px-6 lg:flex-row lg:justify-end lg:gap-x-3'>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-70 sm:w-auto'
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                type='button'
                className='inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm sm:w-auto hover:opacity-70'
                onClick={handleMergeAccount}
              >
                I want to merge
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
