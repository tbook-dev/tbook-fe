import Address from '@tbook/ui/src/Address'
import xIcon from '@/images/icon/x.svg'
import tgWhiteIcon from '@/images/icon/tg-white.svg'
export const defaultCredentialReward = {
  credential: [],
  reward: []
}

export const getParicipant = v => {
  const { isTwitterLogin, wallet, twitterName, tgName } = v
  return isTwitterLogin ? (
    <span className='flex items-center gap-x-0.5'>
      @{twitterName} <img src={xIcon} alt='x icon' />
    </span>
  ) : (
      wallet
      ? (<Address address={ wallet } />)
        : (tgName && (<span className='flex items-center gap-x-0.5'>@{ tgName } <img src={ tgWhiteIcon } alt='x icon' /></span>))
  )
}
