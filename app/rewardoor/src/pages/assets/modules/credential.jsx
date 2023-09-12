import useAsset from "@/hooks/queries/useAsset"
import { conf } from '@tbook/utils'
import Loading from '@/components/loading'
const { formatDollar } = conf


export default function Credential () {
  const { data: info, isLoading: loading } = useAsset()
  const credentialList = info?.credentials || []
  return loading ? (
    <Loading h='h-40' />
  ) : (
    <div className='flex items-center gap-x-5 gap-y-4 text-xs flex-wrap'>
      {credentialList.length > 0 ? (
        credentialList.map((v,idx) => {
          return (
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
