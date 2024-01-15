import { useMemo } from 'react'
import { useParams, Link, useNavigate, useLoaderData } from 'react-router-dom'
import { shortAddress } from '@tbook/utils/lib/conf'
import clsx from 'clsx'
import linkIcon from '@/images/icon/link.svg'
import backIcon from '@/images/icon/back.svg'
import useNftQuery from '@/hooks/useNftQuery'
import dayjs from 'dayjs'
import { Spin } from 'antd'
import useSupportChainsQuery from '@/hooks/useSupportChainsQuery'

export default function NFT () {
  const { projectUrl, isUsingSubdomain } = useLoaderData()
  const { groupId, nftId } = useParams()
  const navigate = useNavigate()
  const { data = {}, isLoading } = useNftQuery(groupId, nftId)
  const { data: supportChains = [] } = useSupportChainsQuery()
  const list = useMemo(() => {
    const chain = supportChains.find(v => v.chainId === data.chainId)

    return [
      {
        title: 'Contract',
        com: shortAddress(data.contract),
        col: 1
      },
      {
        title: 'Chain',
        com: (
          <div className='flex items-center gap-x-1'>
            <img
              src={chain?.icon}
              alt='network'
              className='w-4 h-4 object-center object-contain'
            />
            {chain?.chainName}
          </div>
        ),
        col: 1
      },
      {
        title: 'Token ID',
        com: `#${data.nftId}`,
        col: 2
      },
      {
        title: 'Campaign',
        com: (
          <Link
            to={`${ isUsingSubdomain ? '': `/${projectUrl}`}/${data.campaignId}`}
            className='flex items-center flex-wrap gap-x-1'
          >
            {data.campaignName}
            <img
              src={linkIcon}
              className='w-4 h-4 object-center object-contain'
              alt='link'
            />
          </Link>
        ),
        col: 2
      },
      {
        title: 'Mint Time',
        com: dayjs(data.claimedDate).format('MMM D, YYYY'),
        col: 2
      }
    ]
  }, [data])
  if (isLoading) {
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <Spin spinning />
      </div>
    )
  }
  return (
    <div className='relative lg:pt-20'>
      <button
        className='lg:hidden absolute left-2 top-3'
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1)
          } else {
            navigate(`${isUsingSubdomain ? '' : `/${projectUrl}`}/${data.campaignId}`)
          }
        }}
      >
        <img src={backIcon} alt='back' />
      </button>

      <div className='w-page-content mx-auto mb-5  lg:flex lg:gap-x-20'>
        <img
          src={data.picUrl}
          className='lg:w-[480px] lg:h-[480px] mb-8 lg:mb-0 object-center object-cover lg:rounded-xl'
        />
        <div className='w-page-content mx-auto px-4 lg:px-0'>
          <h2 className='text-2xl font-bold mb-5 lg:mb-16'>
            {data.campaignName}
          </h2>
          <div className='grid grid-cols-2 gap-y-4'>
            {list.map(v => {
              return (
                <div
                  key={v.title}
                  className={clsx({
                    'col-span-2': v.col === 2,
                    'col-span-1': v.col === 1
                  })}
                >
                  <div className='text-[#A1A1A2] text-xs mb-1 lg:text-sm'>
                    {v.title}
                  </div>
                  <div className='text-sm font-medium lg:text-base'>
                    {v.com}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
