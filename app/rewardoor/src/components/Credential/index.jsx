import plusIcon from '@/images/icon/plus.svg'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import closeIcon from '@tbook/share/images/icon/close4.svg'

export default function CredentialItem ({ value, onChange, options }) {
  // console.log({value, options})
  const hasValue = Array.isArray(value) && value.length > 0
  return (
    <div className='text-xs  text-c-9'>
      <div className='flex items-start bg-[#131313] px-6 py-1 rounded-button'>
        <div className='flex-auto flex flex-wrap'>
          {hasValue ? (
            value
              .map(v => options.find(vv => vv.value === v))
              .map(v => {
                return (
                  <div
                    key={v.value}
                    className={clsx(
                      'inline-flex items-center group justify-center h-8 px-6 rounded-button relative bg-b-1 mx-3 hover:text-white',
                      hasValue && 'my-1.5'
                    )}
                  >
                    {v.label}
                    <img
                      src={closeIcon}
                      className='w-2.5 h-2.5 ml-2 cursor-pointer'
                      onClick={() => {
                        onChange(value.filter(vv => vv !== v.value))
                      }}
                    />
                  </div>
                )
              })
          ) : (
            <div
              className={clsx('h-8 flex items-center', hasValue && 'my-1.5')}
            >
              <p> Choose the credentials incentivized in the campaign</p>
            </div>
          )}
        </div>
        <Link to='/credential'>
          <button
            className={clsx(
              '-mr-5 w-8 h-8 rounded-full flex justify-center items-center bg-[#1D1D1D]',
              hasValue && 'my-1.5'
            )}
          >
            <img src={plusIcon} className='w-3 h-3' />
          </button>
        </Link>
      </div>

      <div className='flex flex-wrap pt-6'>
        {options
          .filter(v => {
            return !value?.includes(v.value)
          })
          .map(v => {
            return (
              <div
                className={clsx(
                  'flex items-center group justify-center h-8 px-6 rounded-button relative bg-b-1 mr-6 mb-3 text-c-9 cursor-pointer hover:text-white'
                )}
                key={v.value}
                onClick={() => {
                  console.log(value, v.value)
                  if (Array.isArray(value)) {
                    value?.push(v.value)
                  } else {
                    value = [v.value]
                  }
                  onChange(Array.from(new Set(value)))
                }}
              >
                {v.label}
              </div>
            )
          })}
      </div>
    </div>
  )
}
