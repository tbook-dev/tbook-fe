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
        renderLabel: p[2],
      };
    } else if (type === 2) {
      return {
        type,
        projectUrl: p[0],
      };
    } else if (type === 3) {
      return {
        type,
        inviteCode: p[0],
      };
    } else if (type === 7) {
      return {
        type,
        companyId: p[0],
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
const consoleMap = new Map();
export const getDirectLink = (data, isBot) => {
  const appLink = `https://t.me/${TG_BOT_NAME}`
  const encodedData = btoa(JSON.stringify(data))
  const link = appLink + (isBot ? `?start=camp_${encodedData}` : `/${TG_BOT_APP}?startapp=${encodedData}`);

  if (location.search.includes('t=1') && !consoleMap.has(link)) {
    consoleMap.set(link, true);
    console.log('direct tg link --->', link);
  }
  return link;
};
window.getDirectLink = getDirectLink;
export const getTMAsahreLink = ({ data, isBot, text }) => {
  const link = isEmpty(data)
    ? `https://t.me/${TG_BOT_NAME}/${TG_BOT_APP}`
    : getDirectLink(data, isBot);
  return `https://t.me/share/url?url=${encodeURIComponent(link)}${text ? `&text=${encodeURIComponent(text)}`: ""}`;
};

export const supportTMATypes = [
  // 'campaign',
  // 'project',
  // 'wiseScore',
  // 'renaissance',
  // 'ranger', no longer use
  // "event defi"
  // "company"
  1, 2, 3, 4, 5, 6, 7
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

export const VITE_TBOOK_TG_CHANNEL = `https://t.me/${
  import.meta.env.VITE_TBOOK_TG_CHANNEL
}`;

export const VITE_TBOOK_TG_GROUP = `https://t.me/${
  import.meta.env.VITE_TBOOK_TG_GROUP
}`;

export const VITE_TBOOK_BOOST_TG_CHANNEL = `https://t.me/boost/${
  import.meta.env.VITE_TBOOK_TG_CHANNEL
}`;
export const premiumLink = `https://t.me/premium`;

export const stonfi = `https://t.me/ston_app_bot/swap`;
export const dedustio = `https://t.me/dedustBot/swap`;
export const realTBook = `https://x.com/realtbook`;
