import { getPreSignedUrl } from '@/api/incentive'
export default async function uploadFile (file) {
  const { signedUrl, accessUrl, fileName } = await getPreSignedUrl()

  const url = await fetch(signedUrl, {
    method: 'PUT',
    mode: 'cors',
    body: file
  })
  console.log({ accessUrl, url })
}
