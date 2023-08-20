import { host } from "@/api/incentive"

export default function Profile () {

  const twLogin = () => {
    fetch(`${host}/twitter/auth`, {
      method: 'GET',
      credentials: 'include'
    }).then(r => r.json()).then(d => {
      localStorage.setItem('redirect_url', location.href)
      window.location = d['url']
    })
  }

  return <>
  <button>xx</button>
  <button onClick={twLogin}>Connect Twitter</button>
  </>
}
