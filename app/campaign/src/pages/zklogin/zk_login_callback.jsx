import { useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode'
import { jwtToAddress, genAddressSeed, getZkLoginSignature } from '@mysten/zklogin'
import { TransactionBlock } from "@mysten/sui.js/transactions"
import { getZKSalt, doZKProof } from '@/api/incentive'
import { suiClient, getKeyPair, RANDOMNESS_SESSION_STORAGE_KEY, ZK_MAX_EPOCH_KEY, ZK_PROOF_KEY } from '@/utils/zklogin'
import { set } from "lodash"

export default function() {
    const [jwtToken, setJwtToken] = useState('')
    const [decryptJwtToken, setDecryptJwtToken] = useState('')
    const [salt, setSalt] = useState('')
    const [suiAddress, setSuiAddress] = useState('')
    const [zkProof, setZkProof] = useState('')
    const [zkSig, setZkSig] = useState('')

    useEffect(() => {
        const url = new URL(window.location.href);
        let jwtToken = url.searchParams.get("id_token");
        if (!jwtToken) {
            const params = url.hash.replace('#', '').split('&')
            for (let p in params) {
                const [key, value] = params[p].split('=')
                if (key === 'id_token') {
                    jwtToken = value
                    break;
                }
            }
        }
        setJwtToken(jwtToken)
        const decryptJwtToken = jwtDecode(jwtToken)
        setDecryptJwtToken(JSON.stringify(decryptJwtToken))

        async function getSalt() {
            const response = await getZKSalt(jwtToken)
            const userSalt = response.zk.salt
            setSalt(userSalt)
            const zkLoginUserAddress = jwtToAddress(jwtToken, userSalt);
            setSuiAddress(zkLoginUserAddress)
    
                const ephemeralKeyPair = getKeyPair()
            const pubKey = ephemeralKeyPair.getPublicKey().toBase64()
            const randomness = window.localStorage.getItem(RANDOMNESS_SESSION_STORAGE_KEY)
            const maxEpoch = window.localStorage.getItem(ZK_MAX_EPOCH_KEY)
            const proof = await doZKProof(zkLoginUserAddress, {
                    "jwt":jwtToken,
                    "extendedEphemeralPublicKey": pubKey,
                    "maxEpoch": maxEpoch,
                    "jwtRandomness": randomness,
                    "salt": userSalt,
                    "keyClaimName":"sub"
                });
            const zkProof = JSON.parse(proof.proof)
            window.sessionStorage.setItem(ZK_PROOF_KEY, proof.proof)
            setZkProof(proof.proof)
    
            const txb = new TransactionBlock();
            txb.setSender(zkLoginUserAddress);

            // const { bytes, signature: userSignature } = await txb.sign({
            //     client: suiClient,
            //     signer: ephemeralKeyPair, // This must be the same ephemeral key pair used in the ZKP request
            // });

            // const addressSeed = genAddressSeed(BigInt(userSalt), "sub", decryptJwtToken.sub, decryptJwtToken.aud).toString();

            // const zkLoginSignature = getZkLoginSignature({
            //    inputs: {
            //       ...zkProof,
            //       addressSeed
            //    },
            //    maxEpoch,
            //    userSignature,
            // });
            // setZkSig(JSON.stringify(zkLoginSignature))
            
            // if (response.zk.address.length > 0) {
            //     setSuiAddress(response.zk.address)
            // } else {
            //     const zkLoginUserAddress = jwtToAddress(jwtToken, userSalt);
            //     setSuiAddress(zkLoginUserAddress)
            //     await updateZKAddress(zkLoginUserAddress)
            // }
        }
        getSalt()
    })

    return (<main>
        <h1>ZK Login Callback</h1>
        {/* <div><label htmlFor="">jwt token: </label><span>{jwtToken}</span></div> */}
        <div><label htmlFor="">decrypt jwt token: </label><span>{decryptJwtToken}</span></div>
        <div><label htmlFor="">salt: </label><span>{salt}</span></div>
        <div><label htmlFor="">sui address: </label><span>{suiAddress}</span></div>
        <div><label htmlFor="">zk proof: </label><span>{zkProof}</span></div>
        <div><label htmlFor="">zk login sig: </label><span>{zkSig}</span></div>
    </main>)
}