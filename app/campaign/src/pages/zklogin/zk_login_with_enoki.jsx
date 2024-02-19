import { useState } from 'react';
import { useEnokiFlow, useZkLogin, useAuthCallback } from '@mysten/enoki/react';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
// import { useZkAuthCallback } from '@/hooks/useZkAuthCallback'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const baseUrl = import.meta.env.VITE_API_HOST
export default function Home() {
    const flow = useEnokiFlow();
    const zkLogin = useZkLogin();
    const [result, setResult] = useState(null);
    const host = new URL(location.href).host;
    const callback_url = `https://${host}/zklogin/callback`;

    flow.enokiClient.getZkLogin = async function (input) {
        const res = await fetch(`${baseUrl}/zkproxy/v1/zklogin`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'zklogin-jwt': input.jwt,
            },
        });
        if (!res.ok) {
            throw new Error('Failed to fetch');
        }

        const { data } = await res.json();
        return data
    }

    // const { error } = useZkAuthCallback();

    return (
        <div>
            <div>Address: {zkLogin.address}</div>
            <div>Provider: {zkLogin.provider}</div>
            {!zkLogin.address ? (
                <button
                    onClick={async () => {
                        window.location.href = await flow.createAuthorizationURL({
                            provider: 'google',
                            clientId: googleClientId,
                            redirectUrl: callback_url,
                            extraParams: { scope: ['email'] }
                        });
                    }}
                >
                    Sign in with Google
                </button>
            ) : (
                <button onClick={() => flow.logout()}>Sign Out</button>
            )}
            {/* {error && (
                <div>ERROR: {error}</div>
            )} */}

            {zkLogin.address && (
                <button
                    onClick={async () => {
                        try {
                            const transactionBlock = new TransactionBlock();
                            transactionBlock.moveCall({
                                target:
                                    '0xfa0e78030bd16672174c2d6cc4cd5d1d1423d03c28a74909b2a148eda8bcca16::clock::access',
                                arguments: [transactionBlock.object('0x6')],
                            });

                            const result = await flow.sponsorAndExecuteTransactionBlock({
                                network: 'testnet',
                                // @ts-expect-error: Type references not quite doing their thing:
                                client: new SuiClient({ url: getFullnodeUrl('testnet') }),
                                // @ts-expect-error: Type references not quite doing their thing:
                                transactionBlock,
                            });

                            setResult(result);
                        } catch (e) {
                            console.log(e);
                            setResult({ error: e });
                        }
                    }}
                >
                    Sign transaction
                </button>
            )}

            {result && <div>{JSON.stringify(result)}</div>}
        </div>
    )
}