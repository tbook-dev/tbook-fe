import Layout from './laylout'
import { Tabs } from 'antd'
import NFT from '@/modules/assets/nft'

const items = [
  {
    key: '1',
    label: `NFT`,
    children: <NFT />
  },
  {
    key: '2',
    label: `Credentials`,
    children: `Content 2`
  },
  {
    key: '3',
    label: `Points`,
    children: `Content 3`
  }
]

export default function () {
  return (
    <Layout>
      <section className='mb-6'>
        <Tabs defaultActiveKey='1' items={items} />
      </section>
    </Layout>
  )
}
