import { Link, useLoaderData } from 'react-router-dom'
import { incentiveAssetsTypeList } from '@/utils/conf'

export default function CampaignCard ({
  campaignId,
  picUrl,
  name,
  project,
  users,
  nfts = [],
  points
}) {
  const { isUsingSubdomain, projectName } = useLoaderData()

  return (
    <Link
      to={`${
        isUsingSubdomain ? '' : `/${project?.projectName || projectName}`
      }/${campaignId}`}
      className='flex items-center gap-x-3'
    >
      <img
        src={picUrl}
        className='rounded-2.5xl w-[100px] h-[100px] object-center object-cover'
      />

      <div className='flex-none w-[calc(100%_-_112px)] h-full flex flex-col justify-between'>
        <div>
          <div className='flex items-center gap-x-1.5 mb-1'>
            <img src={project.avatarUrl} className='w-4 h-4 rounded-full' />
            <p className='text-xs font-normal truncate max-w-[calc(100%_-_28px)]'>
              {project.projectName}
            </p>
          </div>
          <h2 className='font-bold text-sm line-clamp-2'>{name}</h2>
        </div>
        <div>
          <div className='flex flex-wrap font-medium space-x-3 text-lt-1 text-sm'>
            {nfts.length > 0 && (
              <div className='py-0.5 flex items-center gap-x-2  text-t-1'>
                <img
                  src={incentiveAssetsTypeList.find(v => v.value === 1)?.icon}
                  className='w-5 h-5'
                />
                NFT
              </div>
            )}
            {points.length > 0 && (
              <div className='py-0.5 flex items-center gap-x-2  text-t-1'>
                <img
                  src={incentiveAssetsTypeList.find(v => v.value === 2)?.icon}
                  className='w-5 h-5'
                />
                POINTS
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
