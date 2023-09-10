import { useParams } from 'react-router-dom'
import NftCard from './modules/NftCard'
import useNft from '@/hooks/queries/useNft'
import Breadcrumb from '@/components/breadcrumb'

const NftDetail = () => {
  const { nftId } = useParams()
  const { data } = useNft(nftId)
  console.log({ data })
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: 'Incentive Asset',
            href: '/assets'
          },
          {
            title: data?.name
          }
        ]}
      />
      <h2 className='font-bold text-5xl mb-10 text-t-1'>{data?.name}</h2>
      <div className='flex justify-between gap-x-10'>
        <div>table</div>
        <div className='w-[252px]'>NftCard</div>

        {/* <NftCard /> */}
      </div>
    </div>
  )
}

export default NftDetail
