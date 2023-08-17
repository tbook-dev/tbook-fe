import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { host } from '@/api/incentive'

export default function () {
    const navigate = useNavigate()

    useEffect(() => {
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')
        const state = url.searchParams.get('state')
        const data = new URLSearchParams()
        data.append('code', code)
        data.append('state', state)
        fetch(`${host}/twitter/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body: data
        }).then(d => {
            navigate('/dashboard/overview')
        })
    }, [])

    return (<div>Redirecting...</div>)
}
