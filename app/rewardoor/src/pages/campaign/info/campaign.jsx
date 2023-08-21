import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCampaignDetail, getCredentials } from '@/api/incentive'
import x from '@/images/icon/x.svg'
import { incentiveAssetsTypeList } from '@/utils/conf'
import useUserInfo from '@/hooks/useUserInfoQuery'

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
  const credentialSet = credentialList.map(v => v.credentialList).flat()

  // const groups = useMemo(() => {
  //   return pageInfo
  //   ?.groups
  //   // ?.filter(v => {
  //   //   // 脏数据
  //   //   return v.nftList?.length > 0 && v.nftList?.pointList > 0
  //   // })
  //   .map(v => {
  //     return {
  //       credential: [

  //       ],
  //       reward: [],
  //     }
  //   })
  // }, [pageInfo])

  return (
    <div className='space-y-5'>
      <div className='space-y-3'>
        <h2 className='font-bold text-base text-t-1'>
          Credential Group & Reward
        </h2>
        <div className='space-y-5'>
          {pageInfo?.groups?.map((cr, index) => {
            return (
              <div
                className='text-white py-5 px-12 bg-gray rounded-2.5xl grid grid-cols-2 gap-x-10 relative before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-[1px] before:h-10 before:bg-c-6'
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
                        return (
                          <div
                            key={idx}
                            className='px-6 py-2 text-xs font-medium text-t-1 border border-c-6 rounded-2.5xl flex justify-between items-center'
                          >
                            <span>
                              {
                                incentiveAssetsTypeList.find(i => i.value === 1)
                                  ?.label
                              }
                            </span>
                            <span>{v.mame}</span>
                          </div>
                        )
                      })}
                      {cr.pointList.map((v, idx) => {
                        return (
                          <div
                            key={idx}
                            className='px-6 py-2 text-xs font-medium text-t-1 border border-c-6 rounded-2.5xl flex justify-between items-center'
                          >
                            <span>
                              {
                                incentiveAssetsTypeList.find(i => i.value === 2)
                                  ?.label
                              }
                            </span>
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
      <h2 className='font-bold text-base mb-4 text-t-1'>
        Campaign Description
      </h2>
      <div className='font-medium text-base'>
        {pageInfo?.campaign?.description}
      </div>
    </div>
  )
}
