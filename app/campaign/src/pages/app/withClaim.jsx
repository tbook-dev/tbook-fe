import clsx from 'clsx'
import arrowIcon from '@/images/icon/arrow2.svg'
import { Link, useLoaderData } from 'react-router-dom'
const typeMap = {
  nft: 2,
  point: 3
}
export default function WithClaim ({ handleFn, item, loading, type }) {
  const { projectName, isUsingSubdomain } = useLoaderData()

  //const [loading, updateLoading] = useState(false);
  const handleClick = async function () {
    if (item.disabled) return
    //updateLoading(true);
    try {
      // await new Promise((resolve) =>{
      //   setTimeout(resolve, 10000)
      // })
      await handleFn()
      //updateLoading(false);
    } catch (e) {
      //updateLoading(false);
      console.log(e)
    }
  }
  return (
    <>
      {item.showBtn && (
        <button
          className='w-full py-2.5 mb-1 rounded-md text-sm font-medium'
          disabled={loading}
          style={{
            color: item.color,
            backgroundColor: item.bgColor
          }}
          onClick={handleClick}
        >
          {loading ? item.loadingBtn : item.label}
        </button>
      )}

      <p
        className={clsx({
          'text-xs text-[#C0ABD9]': [0, 1, 2, 3].includes(item.value),
          'text-2xl text-white font-bold w-[260px] font-zen-dot mb-8':
            item.value === 4,
          'text-xs text-[#C0ABD9] font-bold font-zen-dot': item.value === 5
        })}
      >
        {loading ? item.loadingText : item.desc}
      </p>
      {item.value === 4 && (
        <Link
          className='text-sm text-[#C0ABD9]  lg:hover:text-white flex items-center gap-x-0.5'
          to={`${isUsingSubdomain ? '' : `/${projectName}`}/asset?type=${
            typeMap[type]
          }`}
          target='_blank'
        >
          View your assets
          <img src={arrowIcon} className='w-4 h-4' alt='assets link' />
        </Link>
      )}
    </>
  )
}
