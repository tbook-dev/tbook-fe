// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { authTgCallback } from "@/api/incentive";
// import RedirectSocial from "@/components/redirectSocial";
// import { redirectLocalStorageOnce, delay } from "@/pages/social/conf";

// export default function () {
//   const navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState("");
//   const [status, setStatus] = useState("loading");

//   // useEffect(() => {
//   //     const url = new URL(window.location.href)
//   //     let authResult
//   //     if (url.searchParams['tgAuthResult']) {
//   //         authResult = url.searchParams['tgAuthResult']
//   //     } else {
//   //         authResult = url.hash.split('=')[1]
//   //     }
//   //     const data = new URLSearchParams()
//   //     data.append('originAuthResult', authResult)
//   //     fetch(`${host}/tg/callback`, {
//   //         method: 'POST',
//   //         headers: {
//   //             'Content-Type': 'application/x-www-form-urlencoded'
//   //         },
//   //         credentials: 'include',
//   //         body: data
//   //     }).then(r => r.json())
//   //     .then(d => {
//   //         if (d.code != 200) {
//   //             setErrorMessage(d.message)
//   //             return
//   //         }
//   //         const redirect = localStorage.getItem('redirect_url')
//   //         if (redirect != null) {
//   //             localStorage.removeItem('redirect_url')
//   //             location.href = redirect
//   //         } else {
//   //             navigate('/')
//   //         }
//   //     })
//   // }, [])
//   useEffect(() => {
//     authTgCallback()
//       .then(async (d) => {
//         console.log(d);
//         if (d.code === 4004) {
//           setStatus("occupied");
//         } else if (d.code === 500) {
//           setStatus("failed");
//           setErrorMessage(d.message);
//         } else {
//           setStatus("sucess");
//           await delay(3000);
//           redirectLocalStorageOnce(navigate);
//         }
//       })
//       .catch(async (e) => {
//         setStatus("failed");
//         await delay(3000);
//         redirectLocalStorageOnce(navigate);
//       });
//   }, []);

//   return (
//     <div>
//       <RedirectSocial status={status} desc={errorMessage} />
//     </div>
//   );
// }

import { authTgCallback } from '@/api/incentive'
import AuthSocial from '.'

export default function () {
  return <AuthSocial authCallback={authTgCallback} type='telegram' />
}
