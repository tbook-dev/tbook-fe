import { Spin } from 'antd'
import Empty from './Empty'
import useAssetQuery from '@/hooks/useAssetQuery'
import clsx from 'clsx'
import { useParams } from 'react-router-dom'

export default function Credentials () {
  const { projectId } = useParams()
  const { data: assets, isLoading } = useAssetQuery(projectId)
  const data = assets?.credentials || []

  return (
    <div
      className={clsx(
        'flex flex-col gap-y-4 gap-x-2 items-center px-2',
        isLoading && 'pt-10'
      )}
    >
      {isLoading ? (
        <Spin spinning />
      ) : data.length > 0 ? (
        data.map((v, idx) => (
          <div
            className='flex items-center gap-x-1 bg-[#904BF6] rounded-xl py-1 px-3 w-max'
            key={idx}
          >
            <img
              src={v.picUrl}
              className='w-5 h-5 object-contain object-center'
            />
            <div
              className='max-w-[calc(100vw_-_50px)] truncate'
              key={v.credentialId}
              dangerouslySetInnerHTML={{ __html: v.displayExp }}
            />
          </div>
        ))
      ) : (
        <Empty text="There's no credential yet." />
      )}
    </div>
  )
}
