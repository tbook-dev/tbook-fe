export const delay = (ms) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

export const selfSubDomain = ['campaign-staging', 'i'];

export const isUsingSubdomain = (function () {
  let isUsing = false;
  const host = location.hostname;
  const subDomain = host.split('.')?.[0];
  if (!selfSubDomain.includes(subDomain)) {
    isUsing = true;
  }
  return isUsing;
})();

export const preloadImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageUrl}`));
    };

    img.src = imageUrl;
  });
};

export async function loadImageUrl(coverImg) {
  if (coverImg instanceof Promise) {
    const res = await coverImg;
    return res.default;
  } else {
    return coverImg;
  }
}

export const preloadBatchImage = (imageUrls) => {
  return Promise.all(imageUrls.map(preloadImage));
};

export const getStrJSON = (str) => {
  let ret = {};
  try {
    ret = JSON.parse(str);
  } catch (e) {
    console.error(e);
  }
  return ret;
};
