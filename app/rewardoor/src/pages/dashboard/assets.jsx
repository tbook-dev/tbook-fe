import Layout from './laylout'
import { Tabs } from 'antd'
import NFT from '@/modules/assets/nft'
import Credential from '@/modules/assets/credential'
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
    children: `not ready`
  }
]

export default function () {
  return (
    <Layout>
      <section className='mb-6'>
        <Tabs defaultActiveKey='2' items={items} />
      </section>
    </Layout>
  )
}
