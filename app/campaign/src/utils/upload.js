import { getPreSignedUrl } from '@/api/incentive'

export default async function uploadFile (file) {
  try {
    const { signedUrl, accessUrl } = await getPreSignedUrl()
    await fetch(signedUrl, {
      method: 'PUT',
      mode: 'cors',
      body: file
    })
    return accessUrl
  } catch (error) {
    throw error
  }
}
