import useUserInfoQuery from "@/hooks/useUserInfoQuery";
import { useMemo, useCallback } from "react";
import { getTwLoginUrl } from "@/api/incentive";
import xGray from "@/images/icon/x-gray.svg";
import x from "@/images/icon/x-white.svg";
import dcGray from "@/images/icon/dc-gray.svg";
import dc from "@/images/icon/dc.svg";
import tgGray from "@/images/icon/tg-gray.svg";
import tg from "@/images/icon/tg.svg";
import { useResponsive } from "ahooks";

const curHost = new URL(window.location.href).host;
const dcCallbackUrl = `https://discord.com/api/oauth2/authorize?client_id=1146414186566537288&redirect_uri=https%3A%2F%2F${curHost}%2Fdc_callback&response_type=code&scope=identify%20guilds%20guilds.members.read`;
const tgCallbackHost = import.meta.env.VITE_TG_CALLBACK_HOST;
const tgBotId = import.meta.env.VITE_TG_BOT_ID;
const tgCallbackUrl = `https://oauth.telegram.org/auth?bot_id=${tgBotId}&origin=https%3A%2F%2F${tgCallbackHost}%2Ftg_callback.html&return_to=https%3A%2F%2F${tgCallbackHost}%2Ftg_callback.html`;

export default function useSocial() {
  const { twitterConnected, discordConnected, telegramConnected, data } =
    useUserInfoQuery();
  const { pc } = useResponsive();
  const socialList = useMemo(() => {
    return [
      {
        name: "discord",
        connected: discordConnected,
        picUrl: dcGray,
        activePic: dc,
        activeColor: "#5865F2",
        loginFn: async () => {
          localStorage.setItem("redirect_url", location.href);
          location.href = dcCallbackUrl;
        },
        userName: data?.userDc?.username ?? "",
        occupied: data?.userDc?.occupied || false,
        occupiedText: `This Discord @${data?.userDc?.username} has been connected to another address. Please switch to another Discord account and try again.`,
      },
      {
        name: "twitter",
        connected: twitterConnected,
        picUrl: xGray,
        activePic: x,
        activeColor: "#1DA1F2",
        loginFn: async () => {
          localStorage.setItem("redirect_url", location.href);
          const res = await getTwLoginUrl();
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = res["url"];
          a.setAttribute("target", pc ? "_blank" : "_self");
          a.setAttribute("mc-deep-link", "false");
          a.setAttribute("ref", "nofollow noopener noreferrer");
          // rel='nofollow noopener noreferrer'
          a.click();
          // setTwCallbackUrl(() => res["url"]);
          // location.href = res["url"];
        },
        userName: data?.userTwitter?.twitterUserName ?? "",
        occupied: data?.userTwitter?.occupied || false,
        occupiedText: `This Twitter @${data?.userTwitter?.twitterUserName} has been connected to another address. Please switch to another Twitter account and try again.`,
      },
      {
        name: "telegram",
        connected: telegramConnected,
        picUrl: tgGray,
        activePic: tg,
        activeColor: "#2AABEE",
        loginFn: async () => {
          localStorage.setItem("redirect_url", location.href);
          location.href = tgCallbackUrl;
        },
        userName: data?.userTg?.username ?? "",
        occupied: data?.userTg?.occupied || false,
        occupiedText: `This Telegram @${data?.userTg?.username} has been connected to another address. Please switch to another Telegram account and try again.`,
      },
    ];
  }, [twitterConnected, discordConnected, telegramConnected, data]);
  const getSocialByName = useCallback(
    (socialName) => {
      return socialList.find((v) => v.name === socialName);
    },
    [socialList]
  );
  return { socialList, getSocialByName };
}
