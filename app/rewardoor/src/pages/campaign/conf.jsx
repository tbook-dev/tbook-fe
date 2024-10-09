import Address from '@tbook/ui/src/Address'
import xIcon from '@/images/icon/x.svg'
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
      : (<span className='flex items-center gap-x-0.5'>{ tgName || '...' }</span>)
  )
}
