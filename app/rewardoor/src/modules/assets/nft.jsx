import Button from '@/components/button'
import { Link } from 'react-router-dom'
import { useCurrentProject } from '@tbook/hooks'
import { useAsyncEffect } from 'ahooks'
import { getNFTList } from '@/api/incentive'
import { useState } from 'react'
import { conf } from '@tbook/utils'
import Loading from '@/components/loading'
const { shortAddress } = conf

const title = 'Deploy NFT Contracts'
const desc =
  'Deploy NFT contracts to incentivize the eligible participation of the campaign.'

export default function NFT () {
  const { projectId } = useCurrentProject()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  useAsyncEffect(async () => {
    if (!projectId) return
    setLoading(true)
    const res = await getNFTList(projectId)
    setList(res)
    setLoading(false)
  }, [projectId])

  console.log({ list })
  return (
    <div>
      <div className='px-8 py-7 rounded-button bg-gray flex justify-between items-center mb-4'>
        <div>
          <h4 className='text-white font-bold text-base'>{title}</h4>
          <p className='text-c-9 font-medium text-sm'>{desc}</p>
        </div>
        <Link to='/nft'>
          <Button type='primary'>+ New NFT</Button>
        </Link>
      </div>

      {loading ? (
        <Loading h='h-40' />
      ) : (
        <div className='grid grid-cols-3 gap-5 '>
          {list.map(v => {
            return (
              <div
                key={v.nftId}
                className='rounded-button overflow-hidden h-[480px] bg-gray flex flex-col'
              >
                <img
                  className='h-[319px] w-full object-contain'
                  src={v.coverUrl}
                />
                <div className='p-6 flex flex-col justify-between flex-auto'>
                  <h2 className='font-bold text-2xl'>Rewardoor #{v.nftId}</h2>
                  <p className='font-bold text-sm'>
                    {shortAddress(v.contract)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}