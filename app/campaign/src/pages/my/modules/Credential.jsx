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
        'flex flex-col lg:flex-row gap-y-4 gap-x-2 items-center px-2 lg:px-0 font-medium',
        isLoading && 'pt-10 justify-center'
      )}
    >
      {isLoading ? (
        <Spin spinning />
      ) : data.length > 0 ? (
        data.map((v, idx) => (
          <div
            className='flex items-center gap-x-1 bg-white text-black py-1 px-3 w-max rounded-[18px] border-b-2 border-l-2 lg:border-b-4 lg:border-l-4 border-[#904BF6]'
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
