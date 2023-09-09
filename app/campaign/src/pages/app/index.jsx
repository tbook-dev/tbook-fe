import { useResponsive } from 'ahooks'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useQueryClient } from 'react-query'
import { twLogin, getTwLoginUrl, verifyCredential } from '@/api/incentive'
import { useParams } from 'react-router-dom'
import giftIcon from '@/images/icon/gift.svg'
import pointIcon from '@/images/icon/point.svg'
import nftIcon from '@/images/icon/nft.svg'
import rewardIcon from '@/images/icon/reward.svg'
// import verifiedIcon from '@/images/icon/verified.svg'
import Modal from '@/components/modal'
import useUserInfo from '@/hooks/useUserInfoQuery'
import useProjectQuery from '@/hooks/useProjectQuery'
import useCampaignQuery from '@/hooks/useCampaignQuery'
import TextMore from '@/components/textMore'
import { Spin } from 'antd'
import endCampaign from '@/images/end-campaign.png'
import { message } from 'antd'
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useWalletClient, useSignMessage } from 'wagmi'
import useSignIn from '@/hooks/useSignIn'
import WithVerify from '@/components/withVerify'
import { getNonce } from '@/utils/web3'
import { host } from '@/api/incentive'
import { getCrenditialType } from '@/utils/conf'
import RewardClaim from './rewardClaim'

const notStartList = [2, 0]
const endList = [3, 4, 5]
const endText = 'This campaign has ended.'
const errorMsg =
  'Please click the link and finish the task first. If you have fulfilled the requirement, please try again in 30s.'

export default function () {
  const [messageApi, contextHolder] = message.useMessage()
  const { pc } = useResponsive()
  const { open } = useWeb3Modal()
  const { handleSignIn } = useSignIn()
  const { campaignId } = useParams()
  const queryClient = useQueryClient()
  const { data: page, firstLoad } = useCampaignQuery(campaignId)
  const { data: project } = useProjectQuery(page?.campaign?.projectId)
  const { twitterConnected, userLogined, discordConnected, telegramConnected } =
    useUserInfo()
  const [rewardModalIdx, setRewardModalIdx] = useState(-1)
  const { signMessageAsync } = useSignMessage()
  const twLinkRef = useRef(null)
  const [twLink, setTwLink] = useState('')

  const [nonce, setNonce] = useState('')

  const { data: walletClient, isError, isLoading } = useWalletClient()

  const { address, isConnected, isDisconnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      getNonce(address).then(r => {
        setNonce(() => r)
      })
    }
  }, [isConnected, address])

  const twLoginCurrent = async () => {
    const res = await getTwLoginUrl()
    localStorage.setItem('redirect_url', location.href)
    setTwLink(() => res['url'])
  }
  const discardLogin = async () => {}

  useEffect(() => {
    if (twLink) {
      twLinkRef.current.click()
    }
  }, [twLink])

  const signIn = async () => {
    const sign = await signMessageAsync({ message: nonce })
    const d = new URLSearchParams()
    d.append('address', address)
    d.append('sign', sign)
    const response = await fetch(`${host}/authenticate`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: d
    })
    console.log('status:', response.status)
    response.text().then(b => console.log('body', b))
    response.headers.forEach((value, key) => {
      console.log(key, value)
    })
    console.log(document.cookie)
    await queryClient.refetchQueries('userInfo')
  }

  const handleCancel = useCallback(() => {
    setRewardModalIdx(-1)
  }, [])
  const handleVerify = useCallback(async redential => {
    try {
      const res = await verifyCredential(redential.credentialId)
      if (res.isVerified) {
        queryClient.refetchQueries(['campaignDetail', campaignId])
      } else {
        messageApi.error(errorMsg)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  if (!firstLoad) {
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <Spin spinning />
      </div>
    )
  }
  const campaignNotStart = notStartList.includes(page?.campaign?.status)
  const campaignEnd = endList.includes(page?.campaign?.status)

  return (
    <div className='space-y-2.5 px-2.5 lg:px-0 lg:w-[880px] mx-auto pb-16 lg:pt-10 lg:pb-20  text-t-1'>
      <section className='rounded-lg overflow-hidden bg-white lg:rounded-2xl lg:space-y-10'>
        <img
          src={page?.campaign?.picUrl}
          className='w-full  h-[120px] lg:h-[294px] object-cover object-center'
        />

        <div className='p-2.5'>
          <div className='mb-2.5'>
            <h2 className='text-base font-bold text-lt-1 mb-1.5'>
              {page?.campaign?.name}
            </h2>
            <h4 className='flex items-center gap-x-1.5 text-sm font-semibold'>
              <img
                src={project?.avatarUrl}
                className='w-3.5 h-3.5 object-contain mr-2 rounded-full'
              />
              <span className='text-c-9'>by {project?.projectName}</span>
            </h4>
          </div>

          <div className='text-sm font-normal text-c-6'>
            <TextMore text={page?.campaign?.description} />
          </div>
        </div>
      </section>

      {campaignEnd ? (
        <div className='flex justify-center items-center'>
          <div>
            <img src={endCampaign} className='w-[150px] mx-auto' />
            <p className='text-c-9 text-2xl'>{endText}</p>
          </div>
        </div>
      ) : (
        <section className='space-y-2.5 tetx-t-1'>
          {page?.groups?.map((group, index) => {
            const hasPoit = group.pointList?.length > 0
            const hasNFT = group.nftList?.length > 0

            return (
              <div
                key={index}
                className='px-2.5 py-2 lg:px-5 lg:py-4 rounded-lg lg:rounded-2xl flex flex-col gap-y-2.5 lg:gap-y-5 bg-white'
              >
                <h3 className='text-xs text-c-9 lg:text-[20px] font-normal'>
                  Tasks and Rewards
                </h3>
                <div>
                  {group.credentialList?.map((redential, index) => {
                    const credentialType = getCrenditialType(
                      redential.labelType
                    )
                    const sysConnectedMap = {
                      twitter: twitterConnected,
                      discord: discordConnected,
                      telegram: telegramConnected
                    }
                    const sycLoginFnMap = {
                      twitter: twLoginCurrent,
                      discord: () => {
                        console.log('todo')
                      },
                      telegram: () => {
                        console.log('todo')
                      }
                    }

                    return (
                      <div
                        key={index}
                        className='flex items-center justify-between h-10'
                      >
                        <div className='flex items-center gap-x-1 flex-auto'>
                          <img
                            src={redential.picUrl}
                            className='w-5 h-5 object-contain'
                          />
                          <div
                            className='truncate text-base text-c-6'
                            dangerouslySetInnerHTML={{
                              __html: redential.displayExp
                            }}
                          />
                        </div>
                        {campaignNotStart ? null : redential.isVerified ? (
                          <span className='text-base whitespace-nowrap text-c-9'>
                            Verified
                          </span>
                        ) : (
                          <WithVerify
                            className='text-base text-blue-1 whitespace-nowrap'
                            handleFn={
                              isConnected
                                ? userLogined
                                  ? sysConnectedMap[credentialType]
                                    ? () => handleVerify(redential)
                                    : sycLoginFnMap[credentialType]
                                  : signIn
                                : open
                            }
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                <div className='h-0.5 bg-[#F1F4FA]' />
                <div className='flex items-center gap-x-2.5 text-xs'>
                  <div
                    className='text-blue-1 flex items-center gap-x-1.5 bg-[#f5f8fd] px-2.5 py-1 cursor-pointer rounded'
                    onClick={() => {
                      setRewardModalIdx(index)
                    }}
                  >
                    <img src={giftIcon} className='w-3 h-3' />
                    View Rewards
                  </div>
                  {hasPoit && (
                    <div className='text-c-9 flex items-center gap-px'>
                      <img src={pointIcon} className='w-4 h-4' />
                      Points
                    </div>
                  )}
                  {hasNFT && (
                    <div className='text-c-9 flex items-center gap-px'>
                      <img src={nftIcon} className='w-4 h-4' />
                      Points
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </section>
      )}

      <Modal open={rewardModalIdx >= 0} onCancel={handleCancel}>
        {rewardModalIdx >= 0 && (
          <div className='text-t-1 -mx-2 relative'>
            <img
              src={rewardIcon}
              className='w-[60px] h-[60px] absolute left-1/2 -translate-x-1/2 top-[-50px]'
            />
            <h2 className='text-lg lg:text-4xl mb-1.5 font-medium'>Reward</h2>
            <p className='text-sm text-c-6 mb-8'>
              You may get following rewards once you have accomplished all tasks
              in the group!
            </p>
            <div className='text-base'>
              <RewardClaim group={page?.groups?.[rewardModalIdx]} />
            </div>
          </div>
        )}
      </Modal>
      {contextHolder}
      <a
        href={twLink}
        ref={twLinkRef}
        mc-deep-link='false'
        style={{ visibility: 'hidden' }}
      ></a>
    </div>
  )
}
