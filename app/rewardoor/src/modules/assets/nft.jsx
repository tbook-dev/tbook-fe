import Button from '@/components/button'
import { Link } from 'react-router-dom'

const title = 'Deploy NFT Contracts'
const desc =
  'Deploy NFT contracts to incentivize the eligible participation of the campaign.'

export default function NFT () {
  return (
    <div className='px-8 py-7 rounded-button bg-gray flex justify-between items-center'>
      <div>
        <h4 className='text-white font-bold text-base'>{title}</h4>
        <p className='text-c-9 font-medium text-sm'>{desc}</p>
      </div>
      <Link to='/nft'>
        <Button type='primary'>+ New NFT</Button>
      </Link>
    </div>
  )
}
