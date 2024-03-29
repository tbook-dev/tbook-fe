import logoSvg from '@/images/icon/logo.svg'
import bannerUrl from '@/images/aboard-banner.png'
import bannerBg from '@/images/aboard-bg.png'
import metaMask from '@/images/icon/metamask.svg'
import walletconnect from '@/images/icon/walletconnect.svg'
import useSignIn from '@/hooks/useSignIn'
import Button from '@/components/button'
import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { host } from '@/api/incentive'
import { useState } from 'react'
import Slide from './slide'

const titleList = ['Incentivize core', 'communities', 'and builders']
const p = 'grant easily and optimize continuously '

const h1 = 'Get Started on TBOOK'
const h1Text =
  ['Build a collaborative community with TBOOK from now.',
    'Connect your wallet and start setting up Campaigns.']

export default function Aboard() {
  const { isConnected } = useAccount()
  const navigate = useNavigate()
  const { loading, handleSignIn, signMessage } = useSignIn()
  const [autoFetch, setAutoFetch] = useState(true)

  const clickSignIn = async useWc => {
    setAutoFetch(false)
    await handleSignIn(useWc)
    await signMessage()
  }

  useEffect(() => {
    if (isConnected && autoFetch) {
      fetch(`${host}/info`, {
        method: 'GET',
        credentials: 'include'
      }).then(r => {
        console.log({ autoFetch })
        if (!autoFetch) return
        let p
        if (r.status === 401) {
          p = handleSignIn()
        } else {
          p = r.json()
        }
        p.then(res => {
          if (res?.projects?.length === 0) {
            navigate('/new-project')
          } else {
            navigate('/')
          }
        })
      })
    }
  }, [isConnected, autoFetch])

  return (
    <div className='flex h-screen bg-[#121212]'>
      <div className='select-none	w-1/2 overflow-hidden min-h-full relative p-12 flex flex-col justify-center'>
        <Slide />
      </div>

      <div className='w-1/2  flex items-center justify-center'>
        <div className='w-[560px]'>
          <img src={logoSvg} className='w-8 h-8 mb-8' alt='logo' />
          <h1 className='text-5xl font-extrabold mb-4'>{h1}</h1>
          {
            h1Text.map((v,idx)=>{
              return <p className='text-base font-medium' key={idx}>{v}</p>
            })
          }
          
          <div className='mt-10 space-y-6'>
            {isConnected ? (
              <div className='flex items-center gap-x-4'>
                <w3m-button />
                Loading……
              </div>
            ) : (
              <>
                <Button
                  className='w-full text-base font-bold text-white'
                  onClick={() => clickSignIn(false)}
                  loading={loading}
                >
                  <img src={metaMask} className='mr-3 w-5 h-5 object-contain' />
                  MetaMask
                </Button>
                <Button
                  className='w-full text-base font-bold text-white'
                  onClick={() => clickSignIn(true)}
                >
                  <img
                    src={walletconnect}
                    className='mr-3 w-5 h-5 object-contain'
                  />
                  WalletConnect
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
