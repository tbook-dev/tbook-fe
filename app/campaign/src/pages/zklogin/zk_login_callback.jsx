import AuthSocial from '../social'
// import { zkLoginCallback } from "@/utils/zklogin";
import useUserInfoQuery from '@/hooks/useUserInfoQuery'
import { useEnokiFlow, useZkLogin, useAuthCallback } from '@mysten/enoki/react'

export default function () {
  const { userZk } = useUserInfoQuery()
  useAuthCallback()
  console.log(userZk,'userZk')
  return (
    <AuthSocial
      authCallback={async () => {
        if (userZk?.address) {
          return {
            socialName: userZk?.email
          }
        } else {
          return {
            code: 500,
            msg: 'An error hanppens, please try it later!'
          }
        }
      }}
      type='google'
    />
  )
}
