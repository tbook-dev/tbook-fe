import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { host } from '@/api/incentive'

export default function () {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const url = new URL(window.location.href)
        const data = new URLSearchParams()
        data.append('code', url.searchParams.get('code'))
        fetch(`${host}/dc/callback`, {
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
            navigate('/settings')
        })
    }, [])

    return (<>
    <div>Redirecting...</div>
    {errorMessage && <div>{errorMessage}</div>}
    </>)
}
