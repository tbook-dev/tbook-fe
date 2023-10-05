import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCampaignDetail, getCredentials } from '@/api/incentive'
import x from '@/images/icon/x.svg'
import { incentiveAssetsTypeList, getUrl } from '@/utils/conf'
import useUserInfo from '@/hooks/queries/useUserInfo'
import { Typography } from 'antd'
import dayjs from 'dayjs'

const dateFormat = `YYYY-MM-DD HH:mm:ss`
const { Paragraph } = Typography

export default function Campaign () {
  const { id } = useParams()
  const { projectId } = useUserInfo()
  const { data: pageInfo = {} } = useQuery(
    ['campaignDetail', id],
    () => getCampaignDetail(id),
    {
      staleTime: Infinity
    }
  )
  const { data: credentialList = [] } = useQuery(
    ['credentialList', projectId],
    () => getCredentials(projectId),
    {
      enabled: !!projectId,
      staleTime: Infinity
    }
  )
  // console.log({ pageInfo })
  const credentialSet = credentialList.map(v => v.credentialList).flat()
  const link = `${getUrl()}/app/${projectId}/campaign/${id}`
  return (
    <div className='space-y-10 mb-10'>
      <div>
        <h2 className='font-bold text-base mb-4 text-t-1'>Campaign Sharing</h2>
        <Paragraph
          style={{ marginBottom: 0, color: '#999', fontWeight: 500 }}
          copyable={{
            text: link
          }}
        >
          {link}
        </Paragraph>
      </div>

      <div className='space-y-3'>
        <h2 className='font-bold text-base text-t-1'>
          Credential Group & Reward
        </h2>
        <div className='space-y-5 text-c-9'>
          {pageInfo?.groups?.map((cr, index) => {
            return (
              <div
                className='text-c-9 py-5 px-12 bg-gray rounded-2.5xl grid grid-cols-2 gap-x-10 relative before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-[1px] before:h-10 before:bg-c-6'
                key={index}
              >
                <div className='flex items-center w-full'>
                  <div className='space-y-6 w-max'>
                    {cr.credentialList.map((v, idx) => {
                      const m = credentialSet.find(
                        item => item.credentialId === v.credentialId
                      )

                      return (
                        <div key={idx} className='flex gap-x-2.5 items-center'>
                          <img
                            src={m?.icon || x}
                            className='w-5 h-5 object-contain'
                          />
                          <div
                            dangerouslySetInnerHTML={{ __html: v.displayExp }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className='flex items-center'>
                  <div className='space-y-6 w-full'>
                    <div className='space-y-6'>
                      {cr.nftList.map((v, idx) => {
                        const m = incentiveAssetsTypeList.find(
                          i => i.value === 1
                        )
                        return (
                          <div
                            key={idx}
                            className='px-6 py-2 text-xs font-medium text-c-9 border border-c-6 rounded-2.5xl flex justify-between items-center'
                          >
                            <div className='flex items-center gap-x-2'>
                              <img src={m?.icon} className='w-5 h-5' />
                              {m?.text}
                            </div>
                            <span>{v.name}</span>
                          </div>
                        )
                      })}
                      {cr.pointList.map((v, idx) => {
                        const m = incentiveAssetsTypeList.find(
                          i => i.value === 2
                        )
                        return (
                          <div
                            key={idx}
                            className='px-6 py-2 text-xs font-medium text-c-9 border border-c-6 rounded-2.5xl flex justify-between items-center'
                          >
                            <div className='flex items-center gap-x-2'>
                              <img src={m?.icon} className='w-5 h-5' />
                              {m?.text}
                            </div>
                            <span>{v.number}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className='font-bold text-base mb-4 text-t-1'>Campaign Schedule</h2>
        <div className='font-medium text-base text-c-9'>
          {`${dayjs(pageInfo?.campaign?.startAt).format(dateFormat)}-${dayjs(
            pageInfo?.campaign?.endAt
          ).format(dateFormat)}`}
        </div>
      </div>

      <div>
        <h2 className='font-bold text-base mb-4 text-t-1'>
          Campaign Description
        </h2>
        <div className='font-medium text-base text-c-9'>
          {pageInfo?.campaign?.description}
        </div>
      </div>
    </div>
  )
}
