import Empty from './Empty'
import useAssetQuery from '@/hooks/useAssetQuery'
import clsx from 'clsx'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'

export default function NFT () {
  const { projectId, projectName } = useLoaderData()
  const { data: assets, isLoading } = useAssetQuery(projectId)
  const data = assets?.nfts || []

  return (
    <div
      className={clsx(
        isLoading
          ? 'flex justify-center pt-10'
          : 'grid grid-cols-2 gap-2 lg:grid lg:grid-cols-5 lg:gap-4'
      )}
    >
      {isLoading ? (
        <Spin spinning />
      ) : data.length > 0 ? (
        data.map(v => {
          return (
            <Link
              to={`${isUsingSubdomain ? '' : `/${projectName}`}/nft/${
                v.groupId
              }/${v.nftId}`}
              className='rounded-lg block bg-[#0e0819] overflow-hidden'
              key={v.nftId}
            >
              <img
                src={v.picUrl}
                alt='nft'
                className='w-full h-[187px] lg:h-[225px] rounded-t-lg object-contain flex-none'
              />
              <div className='h-px w-full bg-linear3' />
              <div className='p-4'>
                <h2 className='text-sm font-bold lg:text-xl lg:text-medium'>
                  {v.name}
                </h2>
              </div>
            </Link>
          )
        })
      ) : (
        <div className='col-span-2	lg:col-span-5 lg:h-[330px] lg:bg-[#0F081A] lg:rounded-xl flex justify-center items-center'>
          <Empty text="There's no nfts yet." />
        </div>
      )}
    </div>
  )
}
