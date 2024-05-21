import { isEmpty } from 'lodash';
const TG_BOT_NAME = import.meta.env.VITE_TG_BOT_NAME;
const TG_BOT_APP = import.meta.env.VITE_TG_BOT_APP;

export function safeParse(start_param) {
  try {
    const str = atob(start_param);
    return JSON.parse(str);
  } catch (error) {
    return {};
  }
}
export const getTMAsahreLink = (data) => {
  const link = isEmpty(data)
    ? `https://t.me/${TG_BOT_NAME}/${TG_BOT_APP}`
    : `https://t.me/${TG_BOT_NAME}/${TG_BOT_APP}?startapp=${btoa(
        JSON.stringify(data)
      )}`;
  return `https://t.me/share/url?url=${encodeURIComponent(link)}`;
};
