import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { host } from '@/api/incentive'

export default function () {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)

    return (<>
        <div>
            <a href='https://oauth.telegram.org/auth?bot_id=6610421175&origin=https%3A%2F%2Fcampaign-staging.tbook.com%2Fapp%2F227740620764&return_to=https%3A%2F%2Fcampaign-staging.tbook.com%2Ftg_callback'>Link Telegram</a>
        </div>
        <div>
            <a href="https://discord.com/api/oauth2/authorize?client_id=1146414186566537288&redirect_uri=https%3A%2F%2Fcampaign-staging.tbook.com%2Fdc_callback&response_type=code&scope=identify%20guilds%20guilds.members.read">Link Discord</a>
        </div>
    </>)
}