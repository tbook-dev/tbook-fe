import { useState } from 'react'
import clsx from 'clsx'
import NFT from './modules/nft'
import Credential from './modules/credential'
import Point from './modules/point'

const items = [
  {
    key: '1',
    label: `NFT`,
    children: <NFT />
  },
  {
    key: '2',
    label: `Credentials`,
    children: <Credential />
  },
  {
    key: '3',
    label: `Points`,
    children: <Point />
  }
]

const pageTitle = 'Incentive Asset'

export default function () {
  const [selectStatus, setSelectedStatus] = useState(items[0].key)

  return (
    <div className='mb-6'>
      <h2 className='text-3xl font-black text-[#C8C8C8] mb-5'>{pageTitle}</h2>

      <section className='mb-6 flex justify-between items-center'>
        <div>
          {items.map(v => {
            return (
              <button
                key={v.key}
                className={clsx(
                  selectStatus === v.key
                    ? 'text-t-1 font-black relative before:absolute before:w-full before:h-0.5 before:left-0 before:-bottom-2 before:bg-white'
                    : 'text-t-2 font-bold',
                  'text-xl mr-20'
                )}
                onClick={() => {
                  setSelectedStatus(v.key)
                }}
              >
                {v.label}
              </button>
            )
          })}
        </div>
      </section>

      <section>{items.find(v => v.key === selectStatus)?.children}</section>
    </div>
  )
}
