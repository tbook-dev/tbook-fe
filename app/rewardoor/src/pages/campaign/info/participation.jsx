import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCampaignDetail } from '@/api/incentive'
import { useMemo } from 'react'
import { conf } from '@tbook/utils'
import { incentiveAssetsTypeList } from '@/utils/conf'
const { formatDollar} = conf

const mockGiveInfo = {
  participants: 1000,
  credentials: 200,
  points: 10,
  nfts: 20
}

const mockReward  = [
  {
    name: 'TBOOK Observer NFT',
    type: 1,
    giveNum: 10,
    num: 100,
  },
  {
    name: "Points",
    type: 2,
    giveNum: 3,
    num: 200,
  }
]

const mockCredential = [
  {
    name: 'follow the @TBOOK on twitter',
    picUrl: '',
    credentialId: 1,
    credentialName: 'Twitter',
    num: 10000,
  },
  {
    name: 'follow the @TBOOK on twitter',
    picUrl: '',
    credentialId: 1,
    credentialName: 'Twitter',
    num: 2000,
  }
]


const mockParticipants = [
  {
    address: '0x1234567890',
    date:"16/05/2023",
  },
  {
    address: '0x1234567890',
    date:"16/05/2023",
  },
  {
    address: '0x1234567890',
    date:"16/05/2023",
  }
]
export default function Participation () {
  const { id } = useParams()
  const { data: pageInfo = {}, loading } = useQuery(
    ['campaignDetail', id],
    () => getCampaignDetail(id),
    {
      staleTime: Infinity
    }
  )
  const participantConf = useMemo(() => {
    return [
      {
        title: 'Participants',
        value: formatDollar(mockGiveInfo.participants),
      },
      {
        title: 'GiveAway Credentials',
        value: formatDollar(mockGiveInfo.credentials),
      },
      {
        title: 'GiveAway Points',
        value: formatDollar(mockGiveInfo.points),
      },
      {
        title: 'GiveAway NFTs',
        value: formatDollar(mockGiveInfo.nfts),
      }

  ]}, [pageInfo])

  const rewardConf = useMemo(() => {
    return mockReward
  }, [pageInfo])
  return (<div className='space-y-5'>
    <div className='grid grid-cols-4 gap-x-5'>
      {
        participantConf.map((v,idx) => (<div key={idx} className='rounded-2.5xl bg-gray p-5'> 
          <div className='text-[20px] font-black text-t-1'>{v.value}</div>
          <div className='text-sm font-medium text-c-9'>{v.title}</div>
        </div>))
      }
    </div>

    <div className='bg-gray px-5 pt-5 pb-7 rounded-2.5xl'>
      <h2 className='mb-4 text-base font-bold text-t-1'>Reward</h2>
      <div className='flex items-center gap-x-5 gap-y-4 text-xs'>
        {
          rewardConf.map((v,idx) => (<div key={idx} className='flex items-center justify-between gap-x-5 px-5 py-2 border border-[#666] rounded-2.5xl'>
            <div className='flex items-center gap-x-1 text-t-1'>
              <div>{incentiveAssetsTypeList.find(m => m.value === v.type)?.icon}</div>
              <div>{v.name}</div>
            </div>
            <div className='text-c-9'>
              {formatDollar(v.giveNum)}/{formatDollar(v.num)}
            </div>
          </div>))
        }
      </div>
    </div>

    <div className='bg-gray px-5 pt-5 pb-7 rounded-2.5xl'>
      <h2 className='mb-4 text-base font-bold text-t-1'>Credential</h2>
      <div className='flex items-center gap-x-5 gap-y-4 text-xs'>
        {
          mockCredential.map((v,idx) => (<div key={idx} className='flex items-center justify-between gap-x-5 px-5 py-2'>
            <div className='flex items-center gap-x-1 text-t-1 text-sm'>
              <div>{incentiveAssetsTypeList.find(m => m.value === v.type)?.icon}</div>
              <div>{v.name}</div>
            </div>
            <div className='text-c-9 text-xs border border-[#666] rounded-2.5xl px-4 py-2'>
              {formatDollar(v.num)}
            </div>
          </div>))
        }
      </div>
    </div>

    <div className='bg-gray px-5 pt-5 pb-7 rounded-2.5xl'>
      <h2 className='mb-4 text-base font-bold text-t-1'>Participants</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th scope="col" align='left' className="pb-4 text-sm text-c-9 font-medium">
              Wallet Address
            </th>
            <th scope="col" align='right' className="pb-4 text-sm text-c-9 font-medium">
              Participation Date
            </th>
          </tr>
        </thead>
        <tbody>
          {mockParticipants.map((v,idx) => (
            <tr key={idx}>
              <td align='left' className="pb-4 text-sm text-t-1 font-medium">
                {v.address}
              </td>
              <td align='right' className="text-sm text-t-1 font-medium">{v.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>)
}
