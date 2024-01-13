import { Button } from 'antd'
import { host } from '@/api/incentive'
import { getGoogleLoginUrl } from '@/utils/zklogin'

export default function Home () {
    const googleLogin = async () => {
        location.href = await getGoogleLoginUrl()
    }
    return (<main>
        <Button onClick={googleLogin}>Login with Google</Button>
    </main>)
}