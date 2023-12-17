// back,no longer used

import { useEffect, useMemo, useCallback } from 'react'
import pointIcon from '@/images/icon/point.svg'
import nftIcon from '@/images/icon/nft.svg'
import { credentialStatus, incentiveMethodList } from '@/utils/conf'
import {
  claimCampaign,
  getNftClaimInfo,
  updateClaimed,
  getNFTSupportedChains
} from '@/api/incentive'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import {
  useAccount,
  useSwitchNetwork,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi'
import {
  getNetwork,
  prepareWriteContract,
  writeContract,
  waitForTransaction
} from '@wagmi/core'
import abi from '@/abi/st'
import clsx from 'clsx'
import WithClaim from './withClaim'
import RewardStatus from './timeDown'
import { message, Popover } from 'antd'
import noticeSvg from '@/images/icon/notice.svg'
import useUserInfoQuery from '@/hooks/useUserInfoQuery'
import { useDispatch } from 'react-redux'
import { setConnectWalletModal } from '@/store/global'

//TODO: use chainId from NFT
const chainId = import.meta.env.VITE_CHAIN_ID
const stContract = import.meta.env.VITE_SPACESTATION_CONTRACT
export default function RewardClaim ({ group }) {
  const dispath = useDispatch()
  const queryClient = useQueryClient()
  const { campaignId } = useParams()
  const { address, isConnected, ...others } = useAccount()
  const { switchNetworkAsync, data: currentChain } = useSwitchNetwork()
  const [loading, updateLoading] = useState(false)
  const [supportChains, setSupportChains] = useState([])
  const { wallectConnected } = useUserInfoQuery()
  useEffect(() => {
    const getData = async () => {
      const contractChains = await getNFTSupportedChains()
      setSupportChains(contractChains)
    }
    getData()
  }, [])

  const handleClaim = async () => {
    updateLoading(true)
    try {
      console.log('handleClaimPoint')
      await claimCampaign(group.id)
    } catch (error) {
      console.log(error)
    }
    await queryClient.refetchQueries(['campaignDetail', campaignId])
    updateLoading(false)
  }
  const canUseWallect = useMemo(() => {
    return isConnected && wallectConnected
  }, [isConnected, wallectConnected])

  const connectWallect = useCallback(() => {
    dispath(setConnectWalletModal(true))
  }, [])

  const handleClaimNFT = async nft => {
    try {
      updateLoading(true)
      const info = await getNftClaimInfo(nft.nftId, nft.groupId)

      if (getNetwork().chain?.id != nft.chainId) {
        await switchNetworkAsync(nft.chainId)
      }
      if (nft.chainId != getNetwork().chain?.id) {
        message.error('wrong network, please switch in your wallet')
        return
      }
      const currentInfo = supportChains.find(c => c.chainId == nft.chainId)

      const config = await prepareWriteContract({
        address: currentInfo.stationContractAddress,
        abi: abi,
        functionName: 'claim',
        args: [
          info.cid,
          info.nftAddress,
          info.dummyId,
          info.powah,
          info.account,
          info.sign
        ]
      })
      const r = await writeContract(config)

      const data = await waitForTransaction({ hash: r.hash })
      console.log('transaction log: ', data)
      await updateClaimed(
        nft.nftId,
        nft.groupId,
        data.transactionHash,
        info.dummyId
      )
      await queryClient.refetchQueries(['campaignDetail', campaignId])
      updateLoading(false)
    } catch (error) {
      if (
        error.shortMessage &&
        error.shortMessage.indexOf('Already minted') >= 0
      ) {
        message.error('Claim failed: Already minted')
      } else {
        message.error('Claim failed')
      }
      console.log(error)
      updateLoading(false)
    }
    // await queryClient.refetchQueries(['campaignDetail', campaignId])
  }

  return (
    <div className='space-y-4'>
      {group.nftList?.map(nft => {
        const itemStatus = credentialStatus.find(
          v => v.value === nft.claimedType
        )
        const incentiveMethodItem =
          incentiveMethodList.find(v => v.value === nft.methodType) ||
          incentiveMethodList[0]

        return (
          <div key={nft.nftId}>
            <div className='flex items-center gap-x-0.5 mb-2'>
              <img src={nftIcon} className='w-4 h-4' />
              <span className='text-[#131517] text-sm'>nft</span>
            </div>
            <div className='flex mb-2.5'>
              <div className='flex flex-col gap-y-1.5 text-c-9 text-sm flex-auto'>
                <p>{nft.name}</p>
                <div className='flex items-center gap-x-1 lowercase'>
                  <img
                    src={incentiveMethodItem?.icon}
                    className='w-3 h-4'
                    alt='nft'
                  />
                  {incentiveMethodItem?.title}
                  <Popover
                    content={
                      <div className='max-w-[calc(100vw_-_60px)]'>
                        {incentiveMethodItem?.pop}
                      </div>
                    }
                    trigger='click'
                    placement='top'
                  >
                    <img src={noticeSvg} className='w-3 h-3' alt='notice' />
                  </Popover>
                </div>
              </div>
              <div className='w-12 h-12 p-1.5 rounded'>
                <img
                  src={nft.picUrl}
                  className={clsx(
                    'w-full h-full',
                    itemStatus.value === 5 && 'grayscale'
                  )}
                  alt='nft'
                />
              </div>
            </div>
            <RewardStatus showTimeClock={itemStatus.showTimeClock} />
            <WithClaim
              handleFn={async () => {
                if (canUseWallect) {
                  await handleClaimNFT(nft)
                } else {
                  connectWallect()
                }
              }}
              item={itemStatus}
              loading={loading}
            />
          </div>
        )
      })}

      {group.pointList?.map(point => {
        const itemStatus = credentialStatus.find(
          v => v.value === point.claimedType
        )
        const incentiveMethodItem =
          incentiveMethodList.find(v => v.value === point.methodType) ||
          incentiveMethodList[0]

        return (
          <div key={point.pointId}>
            <div className='flex items-center gap-x-0.5 mb-2'>
              <img src={pointIcon} className='w-4 h-4' />
              <span className='text-c-6 text-sm'>point</span>
            </div>
            <div className='flex flex-col gap-y-1.5 text-c-9 text-sm mb-2.5'>
              <p>{point.number} points</p>
              <div className='flex items-center gap-x-1 lowercase'>
                <img src={incentiveMethodItem?.icon} className='w-3 h-4' />
                {incentiveMethodItem?.title}
                <Popover
                  content={
                    <div className='max-w-[calc(100vw_-_60px)]'>
                      {incentiveMethodItem?.pop}
                    </div>
                  }
                  trigger='click'
                  placement='top'
                >
                  <img src={noticeSvg} className='w-3 h-3' alt='notice' />
                </Popover>
              </div>
            </div>
            <RewardStatus showTimeClock={itemStatus.showTimeClock} />
            <WithClaim
              handleFn={() => {
                handleClaim(point)
              }}
              item={itemStatus}
              loading={loading}
            />
          </div>
        )
      })}
    </div>
  )
}
