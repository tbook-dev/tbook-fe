import AuthSocial from '../social'
// import { zkLoginCallback } from "@/utils/zklogin";
import { useEnokiFlow, useZkLogin, useAuthCallback } from '@mysten/enoki/react'

export default function () {
  useAuthCallback()
  return (
    <AuthSocial
      authCallback={async() => {
        return {
          socialName: 'lake'
        }
      }}
      type='google'
    />
  )
}
