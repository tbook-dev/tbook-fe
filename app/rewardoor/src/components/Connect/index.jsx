import Button from '../button'
import { useSignIn } from '@tbook/hooks'

export default function Connect () {
  const { loading, handleSignIn } = useSignIn()

  return (
    <Button type='primary' onClick={handleSignIn} loading={loading}>
      Connect
    </Button>
  )
}
