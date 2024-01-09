export const delay = (ms) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

export const selfSubDomain = ["campaign-staging", "i"];

export const isUsingSubdomain = (function () {
  let isUsing = false;
  const host = location.hostname;
  const subDomain = host.split(".")?.[0];
  if (!selfSubDomain.includes(subDomain)) {
    isUsing = true;
  }
  return isUsing;
})();
