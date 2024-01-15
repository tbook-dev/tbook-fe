import { Pagination } from 'antd'
import { conf } from '@tbook/utils'
import { useState } from 'react'
// import dayjs from 'dayjs'
const { shortAddress, timeFormat } = conf

const pageSize = 10
const colSize = 3
const tableTitle = 'NFT GiveAway'
export default function NftGiveAway ({ list = [] }) {
  const [current, setCurrent] = useState(1)

  return (
    <div className='bg-gray px-5 pt-5 pb-7 rounded-2.5xl flex-auto'>
      <h2 className='mb-4 text-base font-bold text-t-1'>{tableTitle}</h2>

      <table className='min-w-full'>
        <thead>
          <tr>
            <th
              scope='col'
              align='left'
              className='pb-4 text-sm text-c-9 font-medium'
            >
              Holder Address
            </th>

            <th
              scope='col'
              align='right'
              className='pb-4 text-sm text-c-9 font-medium'
            >
              Token ID
            </th>

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
          {list?.length === 0 ? (
            <tr>
              <td colSpan={colSize} className='text-center py-2 text-c-9'>
                No data
              </td>
            </tr>
          ) : (
            list
              ?.slice((current - 1) * pageSize, current * pageSize)
              .map((v, idx) => (
                <tr key={idx}>
                  <td
                    align='left'
                    className='pb-4 text-sm text-t-1 font-medium'
                  >
                    {shortAddress(v.address)}
                  </td>
                  <td
                    align='right'
                    className='pb-4 text-sm text-t-1 font-medium'
                  >
                    {v.nftNo}
                  </td>
                  <td
                    align='right'
                    className='pb-4 text-sm text-t-1 font-medium'
                  >
                    {v.mintDate}
                    {/* {dayjs(v.participantDate).format(timeFormat)} */}
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
          total={list?.length}
          onChange={setCurrent}
        />
      </div>
    </div>
  )
}
