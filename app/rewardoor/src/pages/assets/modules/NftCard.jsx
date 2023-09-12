import { conf } from '@tbook/utils'
import { Typography } from 'antd'
import copyIcon from '@/images/icon/copy.svg'
const { shortAddress } = conf
const { Paragraph } = Typography

export default function NftCard ({ v }) {
  return (
    <div
      key={v.nftId}
      className='rounded-button overflow-hidden  bg-gray flex flex-col'
    >
      <div className='h-[180px] bg-[#1A1A1A] flex justify-center items-center'>
        <img
          className='w-[140px] h-[140px] object-cover rounded-full hover:translate-y-2 hover:scale-105 transition-all transition-1000'
          src={v.coverUrl}
        />
      </div>

      <div className='p-6 flex flex-col justify-between flex-auto'>
        <h2 className='font-black text-xl mb-3 line-clamp-2 h-14'>{v.name}</h2>
        <Paragraph
          className='flex items-center'
          style={{ marginBottom: 0 }}
          copyable={{
            text: v.contract,
            icon: (
              <img
                src={copyIcon}
                alt='copy icon'
                className='w-5 h-5 object-cover'
              />
            )
          }}
        >
          <span className='font-bold text-sm mr-2 text-[#C8C8C8]'>
            {shortAddress(v.contract)}
          </span>
        </Paragraph>
      </div>
    </div>
  )
}
