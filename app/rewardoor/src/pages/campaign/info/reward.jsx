import { useParams } from 'react-router-dom'
import { incentiveMethodList, rewardMap } from '@/utils/conf'
import pointIcon from '@/images/icon/point.svg'
import nftIcon from '@/images/icon/nft.svg'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { conf as tbookConf } from '@tbook/utils'
import clsx from 'clsx'
import { useState, useCallback } from 'react'
import WinnerListModal from './winnerListModal'
import useReward from '@/hooks/queries/useReward'
import Loading from '@/components/loading'

const { formatDollar } = tbookConf
export default function Reward() {
  const { id } = useParams()
  const { data: reward, isLoading } = useReward(id)
  const [winnerListData, setWinnerListData] = useState(null)
  const [open, setOpen] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [per, setPer] = useState(1)
  const closeModal = useCallback(() => {
    setOpen(false)
    setWinnerListData(null)
  }, [])
  const setModalData = useCallback(data => {
    setWinnerListData(data)
    setOpen(true)
  }, [])
  if (isLoading) {
    return <Loading h='h-[300px]' />
  }

  return (
    <div className='w-[630px] space-y-4 mb-20'>
      {reward?.nfts?.map(v => {
        const nft = v.nft
        const incentiveMethodItem =
          incentiveMethodList.find(v => v.value === nft.methodType) ||
          incentiveMethodList[0]
        const winners = v.winnerList?.filter(
          v => v.claimType === 3 || v.claimType === 4
        )
        const claimNum = v.winnerList?.filter(v => v.claimType === 4).length
        return (
          <div key={v.nft.nftId} className='bg-[#161616] px-8 py-4 rounded-xl'>
            <div className='flex justify-between pb-6 border-b border-[#1f1f1f]'>
              <div className='flex flex-col justify-between'>
                <div className='space-y-0.5'>
                  <h1 className='text-base text-[#C4C4C4]'>NFT</h1>
                  <h2 className='text-lg font-medium text-white'>{nft.name}</h2>
                </div>
                <div className='space-y-1'>
                  <div className='text-xs text-[#C4C4C4]'>Distribution Method</div>
                  <div className='flex items-center gap-x-1 lowercase text-base'>
                    <img
                      src={incentiveMethodItem?.icon}
                      className='w-6 h-6 object-contain object-center'
                    />
                    {incentiveMethodItem?.title}
                    <Tooltip title={incentiveMethodItem.desc}>
                      <span className='text-c-6 hover:text-white ml-1 cursor-pointer'>
                        <InfoCircleOutlined />
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>

              <img
                src={nft.picUrl}
                className='w-[160px] h-[160px] rounded-lg object-contain object-center'
              />
            </div>

            <div
              className='space-y-3 pt-3 hover:opacity-70 cursor-pointer'
              onClick={() => {
                setModalData(v.winnerList)
                setModalType('nft')
                setPer(1)
              }}
            >
              <div className='text-t-1 text-sm font-medium'>
                {formatDollar(winners.length)} winners
              </div>
              <div className='flex -space-x-3'>
                {winners.map((v, idx) => {
                  return (
                    <div
                      key={idx}
                      className='w-6 h-6 overflow-hidden rounded-full border-0.5 border-[#161616]'
                    >
                      <img
                        src={v?.user?.avatar}
                        className='w-full h-full object-contain object-center'
                      />
                    </div>
                  )
                })}
              </div>
              <div className={clsx('text-white', 'text-sm')}>
                {formatDollar(claimNum)} nft{claimNum > 1 ? 's' : ''} claimed
                by participants
              </div>
            </div>
          </div>
        )
      })}

      {reward?.points?.map(v => {
        const point = v.point
        const incentiveMethodItem =
          incentiveMethodList.find(v => v.value === point.methodType) ||
          incentiveMethodList[0]
        const winners = v.winnerList?.filter(
          v => v.claimType === 3 || v.claimType === 4
        )
        const claimNum = v.winnerList?.filter(v => v.claimType === 4).length

        return (
          <div key={point.pointId} className='bg-[#161616] px-8 py-4 rounded-xl'>
            <div className='flex justify-between pb-6 border-b border-[#1f1f1f]'>
              <div className='flex flex-col justify-between'>
                <div className='space-y-0.5'>
                  <h1 className='text-base text-[#C4C4C4]'>points</h1>
                  <h2 className='text-lg font-medium text-white'>{point.number}{" "}point{point.number > 0 && 's'}</h2>
                </div>
                <div className='space-y-1'>

                  <div className='text-xs text-[#C4C4C4]'>Distribution Method</div>

                  <div className='flex items-center gap-x-1 lowercase text-base'>
                    <img
                      src={incentiveMethodItem?.icon}
                      className='w-6 h-6 object-contain object-center'
                    />
                    {incentiveMethodItem?.title}
                    <Tooltip title={incentiveMethodItem.desc}>
                      <span className='text-c-6 hover:text-white ml-1 cursor-pointer'>
                        <InfoCircleOutlined />
                      </span>
                    </Tooltip>
                  </div>
                </div>

              </div>
              <img
                src={pointIcon}
                className='w-[160px] h-[160px] rounded-lg object-contain object-center'
              />
            </div>

            <div
              className='space-y-3 pt-3 hover:opacity-70 cursor-pointer'
              onClick={() => {
                setModalData(v.winnerList)
                setModalType('point')
                setPer(point.number)
              }}
            >
              <div className='text-t-1 text-sm font-medium'>
                {formatDollar(winners.length)} winners
              </div>
              <div className='flex -space-x-3'>
                {winners.slice(0, 6).map((v, idx) => {
                  return (
                    <div
                      key={idx}
                      className='w-6 h-6 rounded-full overflow-hidden border-0.5 border-[#161616]'
                    >
                      <img
                        src={v?.user?.avatar}
                        className='w-full h-full object-contain object-center'
                      />
                    </div>
                  )
                })}
              </div>
              <div className={clsx('text-white', 'text-sm')}>
                {formatDollar(claimNum * point.number)} point
                {claimNum * point.number > 1 ? 's' : ''} claimed by
                participants
              </div>
            </div>
          </div>
        )
      })}

      <WinnerListModal
        data={winnerListData}
        open={open}
        closeModal={closeModal}
        modalType={modalType}
        per={per}
      />
    </div>
  )
}
