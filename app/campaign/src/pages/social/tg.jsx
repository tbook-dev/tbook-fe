import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { host } from '@/api/incentive'

export default function () {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const url = new URL(window.location.href)
        let authResult
        if (url.searchParams['tgAuthResult']) {
            authResult = url.searchParams['tgAuthResult']
        } else {
            authResult = url.hash.split('=')[1]
        }
        const data = new URLSearchParams()
        data.append('originAuthResult', authResult)
        fetch(`${host}/tg/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body: data
        }).then(r => r.json())
        .then(d => {
            if (d.code != 200) {
                setErrorMessage(d.message)
                return 
            }
            const redirect = localStorage.getItem('redirect_url')
            if (redirect != null) {
                localStorage.removeItem('redirect_url')
                location.href = redirect
            } else {
                navigate('/dashboard/overview')
            }
        })
    }, [])

    return (<>
    <div>Redirecting...</div>
    {errorMessage && <div>{errorMessage}</div>}
    </>)
}
