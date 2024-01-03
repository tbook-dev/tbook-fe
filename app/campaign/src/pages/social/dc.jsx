// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { authDcCallback } from "@/api/incentive";
// import RedirectSocial from "@/components/redirectSocial";
// import { redirectLocalStorageOnce, delay } from "@/pages/social/conf";

// export default function () {
//     const navigate = useNavigate()
//     const [errorMessage, setErrorMessage] = useState(null)

//     useEffect(() => {
//         const url = new URL(window.location.href)
//         const data = new URLSearchParams()
//         data.append('code', url.searchParams.get('code'))
//         fetch(`${host}/dc/callback`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             credentials: 'include',
//             body: data
//         }).then(r => r.json())
//         .then(d => {
//             if (d.code != 200) {
//                 setErrorMessage(d.message)
//                 return
//             }
//             const redirect = localStorage.getItem('redirect_url')
//             if (redirect != null) {
//                 localStorage.removeItem('redirect_url')
//                 location.href = redirect
//             } else {
//                 navigate('/')
//             }
//         })
//     }, [])

//     return (<>
//     <div>Redirecting...</div>
//     {errorMessage && <div>{errorMessage}</div>}
//     </>)
// }

import { authDcCallback } from '@/api/incentive'
import AuthSocial from '.'

export default function () {
  return <AuthSocial authCallback={authDcCallback} type='discord' />
}
