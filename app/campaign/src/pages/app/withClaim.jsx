import clsx from 'clsx'

export default function WithClaim ({ handleFn, item, loading }) {
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
          'text-3xl text-white font-bold w-[280px]': item.value === 4,
          'text-xs text-[#C0ABD9] font-bold': item.value === 5
        })}
      >
        {loading ? item.loadingText : item.desc}
      </p>
    </>
  )
}
