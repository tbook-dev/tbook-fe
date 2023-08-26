import Button from '@/components/button'
import { Link } from 'react-router-dom'
import useUserInfo from '@/hooks/queries/useUserInfo'
import { useAsyncEffect } from 'ahooks'
import { getNFTList } from '@/api/incentive'
import { useState } from 'react'
import { conf } from '@tbook/utils'
import Loading from '@/components/loading'
import clsx from 'clsx'
import { Typography } from 'antd'
import copyIcon from '@/images/icon/copy.svg'
// import { Icon } from '@tbook/ui'
// const { NetWork } = Icon

const { shortAddress } = conf
const { Paragraph } = Typography

const title = 'Deploy NFT Contracts'
const desc =
  'Deploy NFT contracts to incentivize the eligible participation of the campaign.'

export default function NFT () {
  const { projectId } = useUserInfo()
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
    <>
      {loading ? (
        <Loading h='h-40' />
      ) : (
        <div
          className={clsx(
            'grid gap-5',
            list.length === 0 ? 'grid-cols-1' : 'grid-cols-4'
          )}
        >
          {list.length > 0 ? (
            list.map(v => {
              return (
                <div
                  key={v.nftId}
                  className='rounded-button overflow-hidden  bg-gray flex flex-col'
                >
                  <div className='h-[180px] bg-[#1A1A1A] flex justify-center items-center'>
                    <img
                      className='w-[140px] h-[140px] object-cover rounded-full hover:translate-y-2 hover:scale-105 transition-all transition-1000'
                      src={v.coverUrl}
                    />
                  </div>

                  <div className='p-6 flex flex-col justify-between flex-auto'>
                    <h2 className='font-black text-xl mb-3 line-clamp-2'>
                      {v.name}
                      {v.name}
                    </h2>
                    <Paragraph
                      className='flex items-center'
                      style={{ marginBottom: 0 }}
                      copyable={{
                        text: v.contract,
                        icon: (
                          <img
                            src={copyIcon}
                            alt='copy icon'
                            className='w-5 h-5 object-cover'
                          />
                        )
                      }}
                    >
                      {/* <NetWork id={v.chainId || 1} className='mr-2' /> */}
                      <span className='font-bold text-sm mr-2 text-[#C8C8C8]'>
                        {shortAddress(v.contract)}
                      </span>
                    </Paragraph>
                  </div>
                </div>
              )
            })
          ) : (
            <div className='h-[300px] text-c-9 w-full rounded-button bg-gray flex justify-center items-center'>
              No Data
            </div>
          )}
        </div>
      )}
    </>
  )
}
