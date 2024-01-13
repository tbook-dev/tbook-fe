import { generateNonce, generateRandomness } from '@mysten/zklogin';
import { SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { fromB64, toB64 } from "@mysten/bcs";
import { getZKSalt } from '@/api/incentive';
import { jwtDecode } from "jwt-decode";

export const KEY_PAIR_SESSION_STORAGE_KEY = 'zklogin_keyPair';
export const RANDOMNESS_SESSION_STORAGE_KEY = 'zklogin_randomness';
export const ZK_NONCE_KEY = 'zklogin_nonce';
export const ZK_MAX_EPOCH_KEY = 'zklogin_max_epoch';
export const ZK_PROOF_KEY = 'zklogin_proof';
const host = new URL(location.href).host;
const REDIRECT_URL = `https://${host}/zklogin/callback`;

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const FULLNODE_URL = 'https://fullnode.devnet.sui.io'; // replace with the RPC URL you want to use
export const suiClient = new SuiClient({ url: FULLNODE_URL });

/**
 * Retrieves the current epoch from the SUI client.
 *
 * @return {Promise<number>} The latest epoch.
 */
async function getEpoch() {
    const { epoch, epochDurationMs, epochStartTimestampMs } = await suiClient.getLatestSuiSystemState();
    return epoch
}

/**
 * Retrieves the key pair.
 *
 * @return {Ed25519Keypair} The ephemeral key pair.
 */
export function getKeyPair() {
    const privateKey = window.sessionStorage.getItem(
        KEY_PAIR_SESSION_STORAGE_KEY
      );
      if (privateKey) {
        const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(
          fromB64(privateKey)
        );
        return ephemeralKeyPair
      } else {
        const ephemeralKeyPair = new Ed25519Keypair();
        const priKey = ephemeralKeyPair.export().privateKey
        window.sessionStorage.setItem(KEY_PAIR_SESSION_STORAGE_KEY, priKey);
        return ephemeralKeyPair
      }
    //   const randomness = window.sessionStorage.getItem(
    //     RANDOMNESS_SESSION_STORAGE_KEY
    //   );
    //   if (randomness) {
    //     setRandomness(randomness);
    //   }
    //   const maxEpoch = window.localStorage.getItem(MAX_EPOCH_LOCAL_STORAGE_KEY);
  
    //   if (maxEpoch) {
    //     setMaxEpoch(Number(maxEpoch));
    //   }
}


/**
 * Generates a ZkNonce using the given epoch.
 *
 * @param {number} epoch - The epoch value to generate the ZkNonce for.
 * @return {{nonce: string, randomness: string, maxEpoch: number, ephemeralKeyPair: Ed25519Keypair}} - 
 * An object containing the nonce, randomness, and the ephemeral key pair.
 */
export function generateZkNonce(epoch) {
    const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
    const ephemeralKeyPair = getKeyPair();
    const randomness = generateRandomness();
    const nonce = generateNonce(ephemeralKeyPair.getPublicKey(), maxEpoch, randomness);
    return { nonce, randomness, maxEpoch, ephemeralKeyPair }
}

export const getGoogleLoginUrl = async function() {
    const epoch = await getEpoch();
    const { nonce, randomness, maxEpoch } = generateZkNonce(epoch);
    window.localStorage.setItem(RANDOMNESS_SESSION_STORAGE_KEY, randomness);
    window.localStorage.setItem(ZK_NONCE_KEY, nonce);
    window.localStorage.setItem(ZK_MAX_EPOCH_KEY, maxEpoch);
    const params = new URLSearchParams({
        // See below for how to configure client ID and redirect URL
        client_id: googleClientId,
        redirect_uri: REDIRECT_URL,
        response_type: 'id_token',
        scope: 'openid email',
        // See below for details about generation of the nonce
        nonce: nonce,
    });
    
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}