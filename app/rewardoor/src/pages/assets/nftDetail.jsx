import { useParams } from 'react-router-dom'
import NftCard from './modules/NftCard'
import useNft from '@/hooks/queries/useNft'
import Breadcrumb from '@/components/breadcrumb'
import Loading from '@/components/loading'
import NftGiveAway from './modules/NftGiveAway'

const NftDetail = () => {
  const { nftId } = useParams()
  const { data, isLoading } = useNft(nftId)

  return isLoading ? (
    <Loading h='h-40' />
  ) : (
    <div>
      <Breadcrumb
        items={[
          {
            title: 'Incentive Asset',
            href: '/assets'
          },
          {
            title: data?.nft?.name
          }
        ]}
      />

      <h2 className='font-bold text-5xl mb-10 text-t-1'>{data?.nft?.name}</h2>

      <div className='flex justify-between gap-x-10'>
        <NftGiveAway list={data.giveaways} />
        <div className='w-[252px]'>
          <NftCard v={data.nft} />
        </div>
      </div>
    </div>
  )
}

export default NftDetail
