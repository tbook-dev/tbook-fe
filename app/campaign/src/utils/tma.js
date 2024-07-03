import { isEmpty } from 'lodash';
export const TG_BOT_NAME = import.meta.env.VITE_TG_BOT_NAME;
export const TG_BOT_APP = import.meta.env.VITE_TG_BOT_APP;

export function safeParse(start_param) {
  try {
    const str = atob(start_param);
    const [type, ...p] = JSON.parse(str);
    if (type === 1) {
      return {
        type,
        projectUrl: p[0],
        campaignId: p[1],
      };
    } else if (type === 2) {
      return {
        type,
        projectUrl: p[0],
      };
    } else {
      return {
        type,
      };
    }
  } catch (error) {
    return {};
  }
}

export const getDirectLink = (data) => {
  return `https://t.me/${TG_BOT_NAME}/${TG_BOT_APP}?startapp=${btoa(
    JSON.stringify(data)
  )}`;
};
window.getDirectLink = getDirectLink;
export const getTMAsahreLink = (data) => {
  const link = isEmpty(data)
    ? `https://t.me/${TG_BOT_NAME}/${TG_BOT_APP}`
    : getDirectLink(data);
  return `https://t.me/share/url?url=${encodeURIComponent(link)}`;
};

export const supportTMATypes = [
  // 'campaign',
  // 'project',
  // 'wiseScore',
  // 'renaissance',
  1, 2, 3, 4,
];

export const logoutRedirecrtKey = 'fromlogout';

export const addQueryParameter = (url, key, value) => {
  let urlObj = new URL(url);
  let searchParams = urlObj.searchParams;
  searchParams.set(key, value);
  return urlObj.toString();
};

export const getQueryParameter = (url, key) => {
  try {
    let urlObj = new URL(url);
    let searchParams = urlObj.searchParams;

    if (searchParams.has(key)) {
      return searchParams.get(key);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const removeQueryParameter = (url, paramName) => {
  let urlObj = new URL(url);
  let searchParams = urlObj.searchParams;
  if (searchParams.has(paramName)) {
    searchParams.delete(paramName);
  }
  return urlObj.toString();
};
