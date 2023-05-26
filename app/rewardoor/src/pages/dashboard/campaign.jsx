import Layout from './laylout'
import clsx from 'clsx'

export default function () {
  const credentialList = [
    {
      label: 'User of GoPlus Security Service',
      value: 1
    },
    {
      label: 'Ethereum Transactors_10 transactions',
      value: 2
    },
    {
      label: 'USDT Trader-Receive',
      value: 3
    },
    {
      label: 'Buyer of GoPlus Security Service',
      value: 4
    }
  ]
  return (
    <Layout>
      <section className='mb-6'>
        <h2 className='font-bold text-xl mb-0.5'>
          TBOOK onboarding campaign 001
        </h2>

        <div className='font-bold text-xs flex items-center'>
          <div className='px-4 py-0.5 mr-2 bg-gray rounded-xl'>Scheduled</div>
          <div className='px-4 py-0.5 mr-2 bg-gray rounded-xl'>
            02/15/2023 08:30 - 06/30/2023 04:00 (UTC+08:00)
          </div>
        </div>
      </section>

      <section className='space-y-5'>
        <div className='pt-4 pb-5 pl-8 bg-gray rounded-[20px]'>
          <h2 className='font-bold text-base mb-4'>Credentials</h2>
          <div className='flex flex-wrap'>
            {credentialList.map(v => {
              return (
                <div
                  className={clsx(
                    'flex items-center group justify-center h-8 px-6 rounded-md relative bg-b-1 mr-6 mb-3 text-white'
                  )}
                  key={v.value}
                >
                  {v.label}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}
