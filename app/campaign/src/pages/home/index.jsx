import banner from '@/images/banner.png'
import bannerlg from '@/images/banner-lg.png'
import { useResponsive } from 'ahooks'
import { useState, useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { twLogin, verifyCredential } from '@/api/incentive'
import { useParams } from 'react-router-dom'
import Accordion from '@/components/accordion'
import giftIcon from '@/images/icon/gift.svg'
import pointIcon from '@/images/icon/point.svg'
import verifiedIcon from '@/images/icon/verified.svg'
import Modal from '@/components/modal'
import useUserInfo from '@/hooks/useUserInfoQuery'
import useProjectQuery from '@/hooks/useProjectQuery'
import useCampaignQuery from '@/hooks/useCampaignQuery'
import TextMore from '@/components/textMore'
import { Spin } from 'antd'
import endCampaign from '@/images/end-campaign.png'
import { message } from 'antd'
import { useWeb3Modal } from '@web3modal/react'
import { useAccount } from 'wagmi'
import useSignIn from '@/hooks/useSignIn'

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
  const { isConnected } = useAccount()
  const { campaignId } = useParams()
  const queryClient = useQueryClient()
  const { data: page, firstLoad } = useCampaignQuery(campaignId)
  const { data: project } = useProjectQuery(page?.campaign?.projectId)
  const { twitterConnected, userLogined } = useUserInfo()
  const [rewardModalIdx, setRewardModalIdx] = useState(-1)
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
    <div className='space-y-8 px-4 lg:px-0 lg:w-[880px] mx-auto pt-8 pb-16 lg:pt-10 lg:pb-20 h-[300px] text-t-1'>
      <section className='space-y-5 lg:space-y-10'>
        <div>
          <h2 className='text-2xl font-bold mb-3'>{page?.campaign?.name}</h2>
          <h4 className='flex items-center gap-x-1 text-sm font-semibold'>
            <img
              src={project?.avatarUrl}
              className='w-8 h-8 object-contain mr-2 rounded-full'
            />
            <span className='text-c-6'>by</span>
            <span>{project?.projectName}</span>
          </h4>
        </div>

        <img
          src={page?.campaign?.picUrl ?? (pc ? bannerlg : banner)}
          className='w-full rounded-2.5xl h-[130px] lg:h-[294px] object-cover object-center'
        />

        <div className='text-xs font-medium'>
          <TextMore text={page?.campaign?.description} />
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
        <section className='space-y-5 tetx-t-1'>
          {page?.groups?.map((group, index) => {
            const hasPoit = group.pointList?.length > 0
            return (
              <Accordion
                key={index}
                title={
                  <h3 className='text-base lg:text-[20px] font-medium'>
                    Reward Group {index + 1}
                  </h3>
                }
                fixedAreo={
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-2 text-base text-t-1'>
                      {hasPoit && (
                        <div className='flex items-center gap-x-1'>
                          <img src={pointIcon} className='w-[14px] h-[14px]' />
                          Points
                        </div>
                      )}
                    </div>
                    <img
                      src={giftIcon}
                      className='w-8 h-8 cursor-pointer'
                      onClick={() => {
                        setRewardModalIdx(index)
                      }}
                    />
                  </div>
                }
              >
                <div className='space-y-3'>
                  {group.credentialList?.map((redential, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between h-10'
                    >
                      <div className='flex items-center gap-x-1.5 pr-2 flex-auto'>
                        <img
                          src={redential.picUrl}
                          className='w-6 h-6 object-contain'
                        />
                        <div
                          className='truncate'
                          dangerouslySetInnerHTML={{
                            __html: redential.displayExp
                          }}
                        />
                      </div>
                      {campaignNotStart ? null : redential.isVerified ? (
                        <img src={verifiedIcon} className='w-8 h-8' />
                      ) : (
                        <button
                          className='text-sm lg:text-base font-medium text-[#1D9BF0] underline whitespace-nowrap'
                          onClick={
                            isConnected
                              ? userLogined
                                ? twitterConnected
                                  ? () => handleVerify(redential)
                                  : twLogin
                                : handleSignIn
                              : open
                          }
                        >
                          {/* {twitterConnected ? "Verify" : "Connect Twitter"} */}
                          Verify
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Accordion>
            )
          })}
        </section>
      )}

      <Modal open={rewardModalIdx >= 0} onCancel={handleCancel}>
        {rewardModalIdx >= 0 && (
          <div className='text-t-1 -mx-2'>
            <h2 className='text-xl lg:text-4xl mb-2 font-bold'>
              Reward Group {rewardModalIdx + 1}
            </h2>
            <p className='text-xs font-medium mb-10'>
              You may get these rewards once all tasks done！
            </p>
            <div className='text-base'>
              {page?.groups?.[rewardModalIdx] && (
                <div className='flex items-center gap-x-2.5'>
                  <img src={pointIcon} className='w-8 h-8' />
                  <span className='font-semibold'>
                    {page?.groups?.[rewardModalIdx]?.pointList?.[0]?.number}{' '}
                    Points
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
      {contextHolder}
    </div>
  )
}
