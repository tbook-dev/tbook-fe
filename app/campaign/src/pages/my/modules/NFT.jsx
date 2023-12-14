import Empty from './Empty'
import useAssetQuery from '@/hooks/useAssetQuery'
import clsx from 'clsx'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function NFT () {
  const { projectId } = useParams()
  const { data: assets, isLoading } = useAssetQuery(projectId)
  const data = assets?.nfts || []

  return (
    <div
      className={clsx(
        isLoading ? 'flex justify-center pt-10' : 'grid grid-cols-2 gap-2'
      )}
    >
      {isLoading ? (
        <Spin spinning />
      ) : data.length > 0 ? (
        data.map(v => {
          return (
            <Link
              to={`/app/${projectId}/nft/${v.groupId}/${v.nftId}`}
              className='rounded-lg block bg-[#0e0819] overflow-hidden'
              key={v.nftId}
            >
              <img
                src={v.picUrl}
                alt='nft'
                className='h-[187px] rounded-t-lg object-cover object-center flex-none'
              />
              <div className='p-4'>
                <h2 className='text-sm font-bold'>{v.name}</h2>
              </div>
            </Link>
          )
        })
      ) : (
        <Empty text="There's no nfts yet." />
      )}
    </div>
  )
}
