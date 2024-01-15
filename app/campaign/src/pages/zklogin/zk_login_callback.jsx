import AuthSocial from '../social'
import { zkLoginCallback } from '@/utils/zklogin'

export default function () {
  const wrapfn = async () => {
    try {
      await zkLoginCallback()
      return {
        code: 200,
        socialName: ''
      }
    } catch (e) {
      return {
        code: 500,
        socialName: 'An error happens, please try it later'
      }
    }
  }
  return <AuthSocial authCallback={wrapfn} type='google' />
}
