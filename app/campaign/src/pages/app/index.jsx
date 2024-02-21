import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { logUserReport } from '@/api/incentive'
import { useParams } from 'react-router-dom'
import pointIcon from '@/images/icon/point-modal.svg'
import arrow3Icon from '@/images/icon/arrow3.svg'
import useUserInfo from '@/hooks/useUserInfoQuery'
import useCampaignQuery from '@/hooks/useCampaignQuery'
import RichMore from "@/components/textMore/rich";
import { Skeleton, Statistic } from 'antd'
import { message } from 'antd'
import { useSignMessage } from 'wagmi'
import { host } from '@/api/incentive'
import { useDispatch } from 'react-redux'
import { setLoginModal } from '@/store/global'
import LazyImage from '@/components/lazyImage'
import { formatImpact } from '@tbook/utils/lib/conf'
import ColorCaptial from '@/components/colorCaptial'
import { formatDollar } from '@tbook/utils/lib/conf'
import ViewReward from './viewReward'
import Credential from './credential'
const { Countdown } = Statistic

const prompt =
  'You may get the rewards once you have accomplished all tasks in the group!'

export default function () {
  const [messageApi, contextHolder] = message.useMessage()
  const dispath = useDispatch()
  const { campaignId } = useParams()
  const { user, twitterConnected, userLogined } = useUserInfo()
  const {
    data: page,
    isLoading,
    campaignNotStart,
    campaignEnd,
    campaignOngoing
  } = useCampaignQuery(campaignId)

  const { signMessageAsync } = useSignMessage()
  const [viewIdx, setViewIdx] = useState(null)
  const [subIdx, setSubIdx] = useState(null)
  const [viewType, setViewType] = useState(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)

  const [rawDatas, setRawDatas] = useState({})
  const [signed, setSigned] = useState({})

  const signIn = useCallback(() => {
    dispath(setLoginModal(true))
  }, [])

  const handleCancel = useCallback(() => {
    setViewModalOpen(false)
    setViewIdx(null)
    setSubIdx(null)
    setViewType(null)
  }, [])
  const viewModalData = useMemo(() => {
    if (viewIdx !== null && viewType !== null && subIdx !== null && page) {
      try {
        const group = page?.groups?.[viewIdx]
        let data = {}
        if (viewType === 'nft') {
          data = group.nftList[subIdx]
        } else {
          data = group.pointList[subIdx]
        }
        return { ...data, type: viewType }
      } catch (e) {
        console.log(e)
        return null
      }
    } else {
      return null
    }
  }, [viewIdx, subIdx, viewType, page])
  const setViewModalDataCallbcak = useCallback(
    (idx, subIdx, type) => {
      if (userLogined) {
        setViewIdx(idx)
        setSubIdx(subIdx)
        setViewType(type)
        setViewModalOpen(true)
      } else {
        signIn()
      }
    },
    [userLogined]
  )
  const signCredential = async credential => {
    if (signed[credential.credentialId]) {
      messageApi.warning('Already signed, verify please')
      return
    }
    const m = rawDatas[credential.credentialId]
    const sign = await signMessageAsync({ message: m })
    const d = new URLSearchParams()
    d.append('sign', sign)
    fetch(`${host}/campaignSign/${credential.credentialId}/verify`, {
      method: 'POST',
      'content-type': 'application/x-www-form-urlencoded',
      body: d,
      credentials: 'include'
    })
      .then(r => r.json())
      .then(d => {
        if (!d['success']) {
          alert(d['error'])
        }
      })
  }

  useEffect(() => {
    const gs = page?.groups
    if (gs && gs.length > 0) {
      const signs = gs
        .flatMap(g => g.credentialList)
        .filter(c => c.labelType == 10)
      signs.forEach(c => {
        fetch(`${host}/campaignSign/${c.credentialId}`, {
          method: 'GET',
          credentials: 'include'
        })
          .then(r => r.json())
          .then(d => {
            if (d['code'] == 0) {
              setRawDatas(() => {
                const nd = {}
                nd[c.credentialId] = d['data']
                return { ...rawDatas, ...nd }
              })
            } else {
              setSigned(() => {
                return { ...signed, [c.credentialId]: true }
              })
            }
          })
      })
    }
  }, [page])
  useEffect(() => {
    if (userLogined && campaignOngoing) {
      const key=`logUserCampaignLogin-${campaignId}`
      if (!localStorage.getItem(key)) {
        logUserReport({
          userId: user?.userId,
          campaignId,
          address: user?.wallet,
          isTwitterLogin: twitterConnected
        })
        localStorage.setItem(key, '1')
      }
    }
  }, [userLogined, campaignOngoing])

  return (
    <div className='space-y-2.5 lg:pt-5 lg:w-[1200px] mx-auto pb-16 lg:py-2  text-t-1'>
      <section className='overflow-hidden mb-16 lg:flex lg:justify-between lg:gap-x-[80px]'>
        <div className='w-full h-[172px] lg:w-[566px] lg:h-[275px] lg:flex-none lg:order-last object-cover object-center'>
          <LazyImage
            src={page?.campaign?.picUrl}
            alt='main banner'
            className='w-full h-full object-cover object-center'
          />
        </div>

        <div className='p-4 lg:p-0 lg:flex-auto'>
          {isLoading ? (
            <Skeleton active />
          ) : (
            <>
              <h2 className='text-xl  font-bold  mb-5 lg:text-4xl lg:mb-8 font-zen-dot'>
                <ColorCaptial text={page?.campaign?.name} />
              </h2>

              <div className='text-sm lg:text-base font-normal mb-8 text-[#C4C4C4]'>
                <RichMore value={page?.campaign?.description} />
              </div>
              <div className='flex items-center text-sm text-[#A1A1A2] mb-4'>
                <span className='mr-1 text-sm font-medium text-white'>
                  {formatDollar(page?.participation?.participantNum)}
                </span>
                participant{page?.participation?.participantNum > 1 ? 's' : ''}
              </div>

              <div className='flex items-center gap-x-1 text-sm text-[#A1A1A2]'>
                {campaignEnd ? (
                  <div>This campaign has ended.</div>
                ) : campaignNotStart ? (
                  <>
                    <div>start in</div>
                    <Countdown
                      value={page?.campaign?.startAt}
                      format='D[d] H[h] m[m] s[s]'
                      valueStyle={{
                        color: '#fff',
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 500
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div>End in</div>
                    <Countdown
                      value={page?.campaign?.endAt}
                      format='D[d] H[h] m[m] s[s]'
                      valueStyle={{
                        color: '#fff',
                        fontSize: '14px',
                        lineHeight: '20px',
                        fontWeight: 500
                      }}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {isLoading && (
        <div className='px-5 lg:px-0 rounded-lg lg:rounded-2xl py-3'>
          <Skeleton />
        </div>
      )}

      <section className='px-4 lg:px-0 space-y-4 lg:space-y-8'>
        {page?.groups?.map((group, index) => {
          return (
            <div
              key={index}
              className='rounded-lg flex flex-col lg:flex-row  lg:overflow-hidden lg:items-stretch'
            >
              <div className='lg:w-[634px] lg:bg-[#160b25] lg:px-8 lg:py-5 lg:flex lg:flex-col'>
                <h3 className='text-base font-bold mb-8 lg:hidden font-zen-dot'>
                  Tasks and Rewards
                </h3>
                <p className='hidden lg:block text-sm mb-4'>{prompt}</p>
                <div className='space-y-4 mb-8'>
                  {group.credentialList?.map(redential => (
                    <Credential
                      redential={redential}
                      key={redential.credentialId}
                      showVerify={!(campaignNotStart || campaignEnd)}
                      signCredential={signCredential}
                    />
                  ))}
                </div>
              </div>

              <div className='lg:w-[566px] pb-4  lg:bg-[#1c0e2f] lg:px-8 lg:pb-0 lg:flex lg:flex-col lg:justify-center'>
                <p className='text-xs mb-4 lg:hidden'>{prompt}</p>
                <div className='space-y-4 lg:space-y-0 lg:divide-y lg:divide-[#281545]'>
                  {group.nftList?.map((nft, idx) => {
                    return (
                      <div
                        key={nft.nftId}
                        className='p-5 rounded-lg bg-linear1 lg:bg-none lg:px-0 lg:py-8 flex lg:flex-row-reverse lg:gap-x-8 lg:rounded-none'
                      >
                        <div className='flex-auto flex flex-col justify-between'>
                          <div>
                            <h2 className='text-sm lg:text-base text-[#A1A1A2]'>
                              nft
                            </h2>
                            <h3 className='text-base lg:text-lg font-medium'>
                              {nft.name}
                            </h3>
                          </div>
                          <button
                            className='flex items-center w-max text-sm font-medium'
                            onClick={() =>
                              setViewModalDataCallbcak(index, idx, 'nft')
                            }
                          >
                            <span className='text-color1'>View Rewards</span>
                            <img src={arrow3Icon} />
                          </button>
                        </div>
                        <img
                          src={nft.picUrl}
                          className='w-20 h-20 lg:w-[120px] lg:h-[120px] object-center rounded-lg flex-none'
                        />
                      </div>
                    )
                  })}

                  {group.pointList?.map(point => {
                    return (
                      <div
                        key={point.pointId}
                        className='p-5 rounded-lg  bg-linear1 lg:bg-none lg:px-0 lg:py-8 flex lg:flex-row-reverse lg:gap-x-8 lg:rounded-none'
                      >
                        <div className='flex-auto flex flex-col justify-between'>
                          <div>
                            <h2 className='text-sm lg:text-base text-[#A1A1A2]'>
                              points
                            </h2>
                            <h3 className='text-base lg:text-lg font-medium'>
                              {formatImpact(point.number)}
                              <span className='ml-1'>points</span>
                            </h3>
                          </div>
                          <button
                            className='flex items-center w-max text-sm font-medium'
                            onClick={() =>
                              setViewModalDataCallbcak(index, 0, 'point')
                            }
                          >
                            <span className='text-color1'>View Rewards</span>
                            <img src={arrow3Icon} />
                          </button>
                        </div>
                        <img
                          src={pointIcon}
                          className='w-20 h-20 lg:w-[120px] lg:h-[120px] object-center rounded-lg flex-none'
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {viewModalData && (
        <ViewReward
          data={viewModalData}
          open={viewModalOpen}
          onCancel={handleCancel}
        />
      )}

      {contextHolder}
    </div>
  )
}
