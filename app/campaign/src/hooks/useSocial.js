import useUserInfoQuery from "@/hooks/useUserInfoQuery";
import { useMemo, useCallback } from "react";
import { getTwLoginUrl } from "@/api/incentive";
import xGray from "@/images/icon/x-gray.svg";
import x from "@/images/icon/x-white.svg";
import dcGray from "@/images/icon/dc-gray.svg";
import dc from "@/images/icon/dc.svg";
import tgGray from "@/images/icon/tg-gray.svg";
import tg from "@/images/icon/tg.svg";
import googleSVG from "@/images/zkLogin/google.svg";
import facebookSVG from "@/images/zkLogin/facebook.svg";
import talkSVG from "@/images/zkLogin/talk.svg";
import { getGoogleLoginUrl } from "@/utils/zklogin";
import { useResponsive } from "ahooks";

const curHost = new URL(window.location.href).host;
const dcCallbackUrl = `https://discord.com/api/oauth2/authorize?client_id=1146414186566537288&redirect_uri=https%3A%2F%2F${curHost}%2Fdc_callback&response_type=code&scope=identify%20guilds%20guilds.members.read`;
const tgCallbackHost = import.meta.env.VITE_TG_CALLBACK_HOST;
const tgBotId = import.meta.env.VITE_TG_BOT_ID;
const domain = curHost.split(".")[0];
const tgCallbackUrl = `https://oauth.telegram.org/auth?bot_id=${tgBotId}&origin=https%3A%2F%2F${tgCallbackHost}%2Ftg%2Fcallback%2F${domain}&return_to=https%3A%2F%2F${tgCallbackHost}%2Ftg%2Fcallback%2F${domain}`;

const socialNameList = ["discord", "twitter", "telegram"];
const zkNameList = ["google", "facebook", "talk"];

export default function useSocial() {
  const { twitterConnected, discordConnected, telegramConnected, data } =
    useUserInfoQuery();
  const { pc } = useResponsive();
  const allList = useMemo(() => {
    return [
      {
        name: "discord",
        connected: discordConnected,
        picUrl: dcGray,
        activePic: dc,
        activeColor: "#5865F2",
        loginFn: async (skip = false) => {
          !skip && localStorage.setItem("redirect_url", location.href);
          location.href = dcCallbackUrl;
        },
        userName: data?.userDc?.username ?? "",
        failText:
          "Please authorize your Discord account and continue to verify.",
      },
      {
        name: "twitter",
        connected: twitterConnected,
        picUrl: xGray,
        activePic: x,
        activeColor: "#1DA1F2",
        loginFn: async (skip = false) => {
          !skip && localStorage.setItem("redirect_url", location.href);
          const res = await getTwLoginUrl();
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display: none";
          a.href = res["url"];
          a.setAttribute("target", pc ? "_blank" : "_self");
          a.setAttribute("mc-deep-link", "false");
          a.setAttribute("rel", "nofollow noopener noreferrer");
          // rel='nofollow noopener noreferrer'
          a.click();
          // setTwCallbackUrl(() => res["url"]);
          // location.href = res["url"];
        },
        userName: data?.userTwitter?.twitterUserName ?? "",
        failText: "Please authorize your X account and continue to verify.",
      },
      {
        name: "telegram",
        connected: telegramConnected,
        picUrl: tgGray,
        activePic: tg,
        activeColor: "#2AABEE",
        loginFn: async (skip = false) => {
          !skip && localStorage.setItem("redirect_url", location.href);
          location.href = tgCallbackUrl;
        },
        userName: data?.userTg?.username ?? "",
        failText:
          "Please authorize your Telegram account and continue to verify.",
      },
      {
        name: "google",
        picUrl: googleSVG,
        async loginFn(skip = false) {
          console.log("google==");
          !skip && localStorage.setItem("redirect_url", location.href);
          location.href = await getGoogleLoginUrl();
        },
        failText:
          "Please authorize your Google account and continue to verify.",
      },
      {
        name: "facebook",
        picUrl: facebookSVG,
        async loginFn() {},
      },
      {
        name: "talk",
        picUrl: talkSVG,
        async loginFn() {},
      },
    ];
  }, [twitterConnected, discordConnected, telegramConnected, data]);
  const socialList = allList.filter((v) => socialNameList.includes(v.name));
  const zkList = allList.filter((v) => zkNameList.includes(v.name));
  const getSocialByName = useCallback(
    (name) => {
      return socialList.find((v) => v.name === name);
    },
    [socialList]
  );
  const getZkfnByName = useCallback(
    (name) => {
      return zkList.find((v) => v.name === name);
    },
    [zkList]
  );
  const getfnByName = useCallback(
    (name) => {
      return zkList.find((v) => v.name === name);
    },
    [allList]
  );
  return {
    socialList,
    allList,
    zkList,
    getSocialByName,
    getZkfnByName,
    getfnByName,
  };
}
