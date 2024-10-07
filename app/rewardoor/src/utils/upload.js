import { getPreSignedUrl, getPreSignedUrlWithSuffix } from '@/api/incentive';

export default async function uploadFile(file) {
  try {
    const { signedUrl, accessUrl } = await getPreSignedUrl();
    await fetch(signedUrl, {
      method: 'PUT',
      mode: 'cors',
      body: file,
    });
    return accessUrl;
  } catch (error) {
    throw error;
  }
}

export const fileValidator = (_, value) => {
  if (value?.length > 0) {
    if (value?.[0]?.response) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error('please wait image upload'));
    }
  }
  return Promise.resolve();
};

export async function uploadWisthSuffix(data, suffix) {
  try {
    const { signedUrl, accessUrl } = await getPreSignedUrlWithSuffix({
      suffix,
    });
    await fetch(signedUrl, {
      method: 'PUT',
      mode: 'cors',
      body: data.file,
    });
    return accessUrl;
  } catch (error) {
    throw error;
  }
}

export async function uploadWisthMp4(file) {
  return await uploadWisthSuffix(file, 'mp4');
}
