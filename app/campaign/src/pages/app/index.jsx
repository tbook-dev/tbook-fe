import { useResponsive } from 'ahooks'
import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { verifyCredential } from '@/api/incentive'
import { useParams, Link, useNavigate } from 'react-router-dom'
import pointIcon from '@/images/icon/point.svg'
import arrow3Icon from '@/images/icon/arrow3.svg'
import useUserInfo from '@/hooks/useUserInfoQuery'
import useCampaignQuery from '@/hooks/useCampaignQuery'
import TextMore from '@/components/textMore'
import { Skeleton, Statistic } from 'antd'
import { message } from 'antd'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useSignMessage } from 'wagmi'
import WithVerify from '@/components/withVerify'
import { host, verifyTbook } from '@/api/incentive'
import { getCrenditialType } from '@/utils/conf'
import { useDispatch } from 'react-redux'
import { setLoginModal, setConnectWalletModal } from '@/store/global'
import useSocial from '@/hooks/useSocial'
import LazyImage from '@/components/lazyImage'
import VerifyStatus, {
  verifyStatusEnum
} from '@/components/withVerify/VerifyStatus'
import { getSnapshotIdBylink } from '@tbook/snapshot/api'
import ColorCaptial from '@/components/colorCaptial'
import { formatDollar } from '@tbook/utils/lib/conf'
import ViewReward from './viewReward'
const { Countdown } = Statistic

const errorMsg = (
  <>
    Please click the link and finish the task first.
    <br /> If you have fulfilled the requirement, please try again in 30s.
  </>
)
const prompt =
  'You may get the rewards once you have accomplished all tasks in the group!'

export default function () {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const { pc } = useResponsive()
  const dispath = useDispatch()
  const { open } = useWeb3Modal()
  // const { handleSignIn } = useSignIn();
  const { campaignId, projectId } = useParams()
  const queryClient = useQueryClient()
  const {
    data: page,
    isLoading,
    campaignNotStart,
    campaignEnd
  } = useCampaignQuery(campaignId)
  const {
    twitterConnected,
    userLogined,
    discordConnected,
    telegramConnected,
    wallectConnected
  } = useUserInfo()
  const { signMessageAsync } = useSignMessage()
  const { getSocialByName } = useSocial()
  const { isConnected } = useAccount()
  const [viewIdx, setViewIdx] = useState(null)
  const [subIdx, setSubIdx] = useState(null)
  const [viewType, setViewType] = useState(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)

  const [rawDatas, setRawDatas] = useState({})
  const [signed, setSigned] = useState({})

  const canUseWallect = useMemo(() => {
    return isConnected && wallectConnected
  }, [isConnected, wallectConnected])
  const signIn = useCallback(() => {
    dispath(setLoginModal(true))
  }, [])
  const connectWallect = useCallback(() => {
    dispath(setConnectWalletModal(true))
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
  const handleVerify = useCallback(async redential => {
    let hasError = false
    try {
      const res = await verifyCredential(redential.credentialId)
      if (res.isVerified) {
        hasError = false
        await queryClient.refetchQueries(['campaignDetail', campaignId])
      } else {
        hasError = true
      }
    } catch (error) {
      hasError = true
    }

    if (hasError) {
      messageApi.error(errorMsg)
      throw new Error(error.message)
    }
  }, [])

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

  return (
    <div className='space-y-2.5 pt-3 lg:pt-5 lg:w-[1200px] mx-auto pb-16 lg:py-2  text-t-1'>
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
                <TextMore text={page?.campaign?.description} />
              </div>
              <div className='flex items-center text-sm text-[#A1A1A2] mb-4'>
                <span className='mr-1 text-sm font-medium text-white'>
                  {formatDollar(page?.participation?.participantNum)}
                </span>
                participant
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
                  {group.credentialList?.map((redential, index) => {
                    const credentialType = getCrenditialType(
                      redential.labelType
                    )
                    const isSnapshotType = redential.labelType === 12
                    const snapshotId = getSnapshotIdBylink(redential.link)

                    const sysConnectedMap = {
                      twitter: twitterConnected,
                      discord: discordConnected,
                      telegram: telegramConnected,
                      tbook: true
                    }
                    const sycLoginFnMap = {
                      twitter: getSocialByName('twitter').loginFn,
                      discord: getSocialByName('discord').loginFn,
                      telegram: getSocialByName('telegram').loginFn
                    }
                    // 点击任务，除了跳转外的额外处理。
                    const taskMap = {
                      8: async () => {
                        // log event, 需要任意登录即可
                        if (userLogined) {
                          await verifyTbook(redential.credentialId)
                          await handleVerify(redential)
                        } else {
                          signIn()
                        }
                      },
                      10: () => {
                        if (canUseWallect) {
                          signCredential(redential)
                        } else {
                          connectWallect()
                        }
                      },
                      12: () => {
                        // 当前页面不需要登录
                        window.open(
                          `/app/${projectId}/snapshot/${campaignId}/${redential.credentialId}/${snapshotId}`,
                          '_blank'
                        )
                      }
                    }
                    return (
                      <div
                        key={index}
                        className='border border-[#904BF6] lg:hover:border-[#904BF6] lg:border-[#281545] p-4 rounded-lg bg-linear1 lg:bg-none space-y-5'
                      >
                        <div className='flex items-center justify-between w-full'>
                          <div className='flex items-center gap-x-1 flex-auto w-[calc(100%_-_45px)]'>
                            <img
                              src={redential.picUrl}
                              className='w-5 h-5 object-contain'
                            />
                            <div
                              onClick={
                                typeof taskMap[redential.labelType] ===
                                'function'
                                  ? taskMap[redential.labelType]
                                  : null
                              }
                              className='truncate text-sm max-w-[calc(100%_-_30px)]'
                              dangerouslySetInnerHTML={{
                                __html: pc
                                  ? redential.intentDisplayExp
                                  : redential.displayExp
                              }}
                            />
                          </div>
                          {redential.isVerified ? (
                            <span className='flex items-center gap-x-1 text-md whitespace-nowrap'>
                              <VerifyStatus status={verifyStatusEnum.Sucess} />
                              Verified
                            </span>
                          ) : campaignNotStart ||
                            campaignEnd ||
                            !userLogined ? null : (
                            <WithVerify
                              sysConnectedMap={sysConnectedMap}
                              sycLoginFnMap={sycLoginFnMap}
                              credentialType={credentialType}
                              handleFn={() => handleVerify(redential)}
                            />
                          )}
                        </div>
                        {isSnapshotType && snapshotId && (
                          <Link
                            target='_blank'
                            className='text-base font-medium'
                            to={`/app/${projectId}/snapshot/${campaignId}/${redential.credentialId}/${snapshotId}`}
                          >
                            <h2 className='border-t mt-4 pt-5 border-[#281545]'>
                              Would you use TBOOK to incentivize your community?
                            </h2>
                          </Link>
                        )}
                      </div>
                    )
                  })}
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
                              {point.number}
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
