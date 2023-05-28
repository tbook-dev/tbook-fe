import clsx from 'clsx'
import Layout from './laylout'
import { useState } from 'react'
import Button from '@/components/button'
import { Link } from 'react-router-dom'

const campaignStatus = [
  {
    label: 'Ongoing',
    value: 1
  },
  {
    label: 'Scheduled',
    value: 2
  },
  {
    label: 'Draft',
    value: 3
  },
  {
    label: 'Completed',
    value: 4
  }
]

export default function () {
  const [selectStatus, setSelectedStatus] = useState(1)

  return (
    <Layout>
      <section className='mb-6 flex justify-between items-center'>
        <div>
          {campaignStatus.map(v => {
            return (
              <button
                key={v.value}
                className={clsx(
                  selectStatus === v.value
                    ? 'font-black relative before:absolute before:w-full before:h-0.5 before:left-0 before:-bottom-2 before:bg-white'
                    : 'font-bold',
                  'text-white  text-xl mr-20'
                )}
                onClick={() => {
                  setSelectedStatus(v.value)
                }}
              >
                {v.label}
              </button>
            )
          })}
        </div>
        <Link to='/campain'>
          <Button type='primary'> + New Campaign</Button>
        </Link>
      </section>
    </Layout>
  )
}
