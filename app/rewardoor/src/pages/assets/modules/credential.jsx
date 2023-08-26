import useUserInfo from "@/hooks/useUserInfoQuery"
import { useAsyncEffect } from 'ahooks'
import { getCredential } from '@/api/incentive'
import { useState } from 'react'
import { conf } from '@tbook/utils'
import Loading from '@/components/loading'
import clsx from 'clsx'
const { formatDollar } = conf
export default function Credential () {
  const { projectId } = useUserInfo()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  useAsyncEffect(async () => {
    if (!projectId) return
    setLoading(true)
    const res = await getCredential(projectId)
    setList(res)
    setLoading(false)
  }, [projectId])

  return loading ? (
    <Loading h='h-40' />
  ) : (
    <div className='flex flex-wrap'>
      {list.length > 0 ? (
        list.map(v => {
          return (
            <div
              className={clsx(
                'flex items-center group justify-center h-8 px-6 rounded-md relative bg-b-1 mr-6 mb-3 text-c-9 '
              )}
              key={v.credentialId}
            >
              <span className='mr-2 font-medium'>{v.name}</span>
              <span className='text-colorful1 font-bold'>
                {formatDollar(v.eligibleCount)}
              </span>
            </div>
          )
        })
      ) : (
        <div className='h-[300px] w-full rounded-button bg-gray flex justify-center items-center'>
          No Data
        </div>
      )}
    </div>
  )
}
