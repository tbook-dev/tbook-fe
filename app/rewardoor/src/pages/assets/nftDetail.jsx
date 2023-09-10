import { useParams } from 'react-router-dom'
import NftCard from './modules/NftCard'
import useNft from '@/hooks/queries/useNft'

const NftDetail = () => {
  const { nftId } = useParams()
  const { data } = useNft(nftId)
  console.log({ data })
  return (
    <div className='flex justify-between gap-x-10'>
      <div>table</div>
      <div className='w-[252px]'>NftCard</div>

      {/* <NftCard /> */}
    </div>
  )
}

export default NftDetail
