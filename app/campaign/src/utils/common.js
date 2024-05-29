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
