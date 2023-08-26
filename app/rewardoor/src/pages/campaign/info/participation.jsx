import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCampaignParticipation } from '@/api/incentive'
import { useMemo } from 'react'
import { conf } from '@tbook/utils'
import { incentiveAssetsTypeList } from '@/utils/conf'
import { Pagination } from 'antd'
import { useState } from 'react'
import dayjs from 'dayjs'
const { formatDollar, shortAddress, timeFormat } = conf

const pageSize = 10

export default function Participation () {
  const [current, setCurrent] = useState(1)
  const { id } = useParams()
  const { data: pageInfo = {} } = useQuery(
    ['participation', id],
    () => getCampaignParticipation(id),
    {
      staleTime: 60 * 1000 * 5
    }
  )
  const participantConf = useMemo(() => {
    return [
      {
        title: 'Participants',
        value: formatDollar(pageInfo.participantNum || 0)
      },
      {
        title: 'GiveAway Credentials',
        value: formatDollar(pageInfo.credentialNum || 0)
      },
      {
        title: 'GiveAway Points',
        value: formatDollar(pageInfo.pointNum || 0)
      },
      {
        title: 'GiveAway NFTs',
        value: formatDollar(pageInfo.nftNum || 0)
      }
    ]
  }, [pageInfo])

  return (
    <div className='space-y-5 mb-10'>
      <div className='grid grid-cols-4 gap-x-5'>
        {participantConf.map((v, idx) => (
          <div key={idx} className='rounded-2.5xl bg-gray p-5'>
            <div className='text-[20px] font-black text-t-1'>{v.value}</div>
            <div className='text-sm font-medium text-c-9'>{v.title}</div>
          </div>
        ))}
      </div>

      <div className='bg-gray px-5 pt-5 pb-7 rounded-2.5xl'>
        <h2 className='mb-4 text-base font-bold text-t-1'>Reward</h2>
        <div className='flex items-center gap-x-5 gap-y-4 text-xs'>
          {pageInfo?.nftList?.map((v, idx) => (
            <div
              key={idx}
              className='flex items-center justify-between gap-x-5 px-5 py-2 border border-[#666] rounded-2.5xl'
            >
              <div className='flex items-center gap-x-1 text-t-1'>
                <img
                  src={incentiveAssetsTypeList.find(m => m.value === 1)?.icon}
                  className='w-5 h-5'
                />
                <div>{v.name}</div>
              </div>
              <div className='text-c-9'>
                {formatDollar(v.giveNum)}/{formatDollar(v.num)}
              </div>
            </div>
          ))}
          {pageInfo?.pointList?.slice(0, 1)?.map((_, idx) => (
            <div
              key={idx}
              className='flex items-center justify-between gap-x-5 px-5 py-2'
            >
              <div className='flex items-center gap-x-1 text-t-1'>
                <img
                  src={incentiveAssetsTypeList.find(m => m.value === 2)?.icon}
                  className='w-5 h-5'
                />

                <div>Points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-gray px-5 pt-5 pb-7 rounded-2.5xl'>
        <h2 className='mb-4 text-base font-bold text-t-1'>Credential</h2>
        <div className='flex items-center gap-x-5 gap-y-4 text-xs flex-wrap'>
          {pageInfo?.credentialList?.map((v, idx) => (
            <div
              key={idx}
              className='flex items-center justify-between gap-x-5 px-5 py-2'
            >
              <div className='flex items-center gap-x-1'>
                <img src={v.picUrl} className='w-5 h-5' />
                <div
                  className='text-t-1'
                  dangerouslySetInnerHTML={{ __html: v.displayExp }}
                />
              </div>
              <div className='text-c-9 text-xs border border-[#666] rounded-2.5xl px-4 py-2'>
                Giveaway: {formatDollar(v.giveAway)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='bg-gray px-5 pt-5 pb-7 rounded-2.5xl'>
        <h2 className='mb-4 text-base font-bold text-t-1'>Participants</h2>
        <table className='min-w-full'>
          <thead>
            <tr>
              <th
                scope='col'
                align='left'
                className='pb-4 text-sm text-c-9 font-medium'
              >
                Wallet Address
              </th>
              {pageInfo?.pointList?.length > 0 && (
                <th
                  scope='col'
                  align='center'
                  className='pb-4 text-sm text-c-9 font-medium'
                >
                  Points
                </th>
              )}
              {pageInfo?.credentialList?.map((v, idx) => (
                <th key={idx} align='center' className='pb-4'>
                  <div className='inline-flex items-center justify-between gap-x-5 px-5 py-2'>
                    <div className='flex items-center gap-x-1'>
                      <img src={v.picUrl} className='w-5 h-5' />
                      <div
                        className='text-t-1 w-max'
                        dangerouslySetInnerHTML={{ __html: v.display }}
                      />
                    </div>
                  </div>
                </th>
              ))}
              <th
                scope='col'
                align='right'
                className='pb-4 text-sm text-c-9 font-medium'
              >
                Participation Date
              </th>
            </tr>
          </thead>
          <tbody>
            {pageInfo?.participantList?.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    pageInfo?.pointList?.length +
                    pageInfo?.credentialList?.length +
                    2
                  }
                  className='text-center py-2 text-c-9'
                >
                  No data
                </td>
              </tr>
            ) : (
              pageInfo?.participantList
                ?.slice((current - 1) * pageSize, current * pageSize)
                .map((v, idx) => (
                  <tr key={idx}>
                    <td
                      align='left'
                      className='pb-4 text-sm text-t-1 font-medium'
                    >
                      {shortAddress(v.wallet)}
                    </td>
                    {pageInfo?.pointList?.length > 0 && (
                      <td
                        key={idx}
                        scope='col'
                        align='center'
                        className='pb-4 text-sm text-c-9 font-medium'
                      >
                        +{formatDollar(v.pointNum)}
                      </td>
                    )}
                    {pageInfo?.credentialList?.map((iv, idx) => (
                      <td key={idx} align='center' className='pb-4 text-base'>
                        {v?.verifiedCredentials?.some(
                          m => m.credentialId === iv.credentialId
                        )
                          ? '✓'
                          : '×'}
                      </td>
                    ))}
                    <td
                      align='right'
                      className='pb-4 text-sm text-t-1 font-medium'
                    >
                      {dayjs(v.participantDate).format(timeFormat)}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        <div className='flex justify-end'>
          <Pagination
            hideOnSinglePage
            responsive
            showSizeChanger={false}
            current={current}
            pageSize={pageSize}
            total={pageInfo?.participantList?.length}
            onChange={setCurrent}
          />
        </div>
      </div>
    </div>
  )
}
