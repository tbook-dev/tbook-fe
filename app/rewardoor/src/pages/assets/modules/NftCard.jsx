import Address from '@tbook/ui/src/Address'

export default function NftCard ({ v }) {
  return (
    <div
      key={v.nftId}
      className='rounded-button overflow-hidden  bg-gray flex flex-col'
    >
      <div className='h-[180px] bg-[#1A1A1A] flex justify-center items-center'>
        <img
          className='w-[140px] h-[140px] object-cover rounded-full hover:translate-y-2 hover:scale-105 transition-all transition-1000'
          src={v.picUrl}
        />
      </div>

      <div className='p-6 flex flex-col justify-between flex-auto'>
        <h2 className='font-black text-xl mb-3 line-clamp-2 h-14'>{v.name}</h2>
      
        <span className='font-bold text-sm mr-2 text-[#C8C8C8]'>
          <Address address={v.contract} />
        </span>
      </div>
    </div>
  )
}
