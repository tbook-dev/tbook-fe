import { formatDollar } from '@tbook/utils/lib/conf'
import useAssetQuery from '@/hooks/useAssetQuery'
import { Spin } from 'antd'
import _ from 'lodash'
import { useParams, Link } from 'react-router-dom'
import dayjs from 'dayjs'
import pointIcon from '@/images/icon/point.svg'
import arrow3Icon from '@/images/icon/arrow2.svg'

export default function Point () {
  const { projectId } = useParams()
  const { data: assets, isLoading } = useAssetQuery(projectId)
  const data = assets?.points || []
  const total = _.sum(data.map(v => v.number))

  return (
    <div className='space-y-2'>
      {isLoading ? (
        <div className='pt-10 flex justify-center'>
          <Spin spinning />
        </div>
      ) : (
        <>
          <div className='flex items-center justify-between p-5 rounded-lg bg-[#0e0819] border border-[#904BF6] mb-8'>
            <div className='space-y-2 lg:space-y-4'>
              <div className='text-sm lg:text-lg'>points</div>
              <div className='font-bold text-4.2xl leading-[44px] mb-1 lg:text-[48px] lg:font-medium font-podiumsharp'>
                {formatDollar(total)}
              </div>
            </div>
            <img
              src={pointIcon}
              className='w-20 h-20 lg:w-[120px] lg:h-[120px]'
            />
          </div>
          <div className='space-y-2'>
            {data.map((v, idx) => {
              return (
                <div
                  key={idx}
                  className='p-5 bg-[#0e0819] rounded-lg flex justify-between items-center'
                >
                  <div className='w-[250px]'>
                    <Link
                      className='text-sm font-medium flex items-center gap-x-0.5'
                      to={`/app/${projectId}/campaign/${v.campaignId}`}
                    >
                      {v.campaignName}
                      <img
                        src={arrow3Icon}
                        alt='arrow'
                        className='w-4 h-4 object-contain'
                      />
                    </Link>
                    <span className='text-xs text-[#C0ABD9]'>
                      {dayjs(v.claimedDate).format('MMMM DD, YYYY')}
                    </span>
                  </div>
                  <div className='text-base font-medium'>
                    +{formatDollar(v.number)}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
