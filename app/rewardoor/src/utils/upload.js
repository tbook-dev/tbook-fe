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

export const fileValidator = (_,value) => {
  if(!value){
    return Promise.reject(new Error('image is required'));
  }
  if (value?.[0]?.response) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('please wait image upload'));
}