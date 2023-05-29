import { getPreSignedUrl } from '@/api/incentive'

export default async function uploadFile (file) {
  const { signedUrl, accessUrl, fileName } = await getPreSignedUrl()
  const formData = new FormData()
  formData.append('file', file)
  const url = await fetch(signedUrl, { method: 'PUT', body: formData })
  console.log({ uploadS3Url, url })
}
