import { shortAddress } from '@tbook/utils/lib/conf'
import xIcon from '@/images/icon/x.svg'
export const defaultCredentialReward = {
  credential: [],
  reward: []
}

export const getParicipant = v => {
  const { isTwitterLogin, wallet, twitterName } = v
  return isTwitterLogin ? (
    <span className='flex items-center gap-x-0.5'>
      @{twitterName} <img src={xIcon} alt='x icon' />
    </span>
  ) : (
    shortAddress(wallet)
  )
}
