import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { host } from '@/api/incentive'

const tgHost = import.meta.env.VITE_TG_CALLBACK_HOST
const tgBotId = import.meta.env.VITE_TG_BOT_ID
const tgUrl = `https://oauth.telegram.org/auth?bot_id=${tgBotId}&origin=https%3A%2F%2F${tgHost}&return_to=https%3A%2F%2F${tgHost}%2Ftg_callback.html`

export default function () {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(null)

    return (<>
        <div>
            <a href={tgUrl}>Link Telegram</a>
        </div>
        <div>
            <a href="https://discord.com/api/oauth2/authorize?client_id=1146414186566537288&redirect_uri=https%3A%2F%2Fcampaign-staging.tbook.com%2Fdc_callback&response_type=code&scope=identify%20guilds%20guilds.members.read">Link Discord</a>
        </div>
    </>)
}