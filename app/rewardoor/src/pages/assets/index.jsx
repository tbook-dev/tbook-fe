import { Tabs } from 'antd'
import NFT from './modules/nft'
import Credential from './modules/credential'
import Point from './modules/point'

const items = [
  {
    key: '1',
    label: `NFT`,
    children: <NFT />
  },
  {
    key: '2',
    label: `Credentials`,
    children: <Credential />
  },
  {
    key: '3',
    label: `Points`,
    children: <Point />
  }
]

export default function () {
  return (
    <section className='mb-6'>
      <Tabs defaultActiveKey='1' items={items} />
    </section>
  )
}
