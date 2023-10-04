import useUserInfoQuery from "@/hooks/useUserInfoQuery";
import { useState, useMemo } from "react";
import { noop } from "lodash";
import xGray from "@/images/icon/x-gray.svg";
import x from "@/images/icon/x.svg";
import dcGray from "@/images/icon/dc-gray.svg";
import dc from "@/images/icon/dc.svg";
import tgGray from "@/images/icon/tg-gray.svg";
import tg from "@/images/icon/tg.svg";

const curHost = new URL(window.location.href).host;
const dcCallbackUrl = `https://discord.com/api/oauth2/authorize?client_id=1146414186566537288&redirect_uri=https%3A%2F%2F${curHost}%2Fdc_callback&response_type=code&scope=identify%20guilds%20guilds.members.read`;
const tgCallbackHost = import.meta.env.VITE_TG_CALLBACK_HOST;
const tgBotId = import.meta.env.VITE_TG_BOT_ID;
const tgCallbackUrl = `https://oauth.telegram.org/auth?bot_id=${tgBotId}&origin=https%3A%2F%2F${tgCallbackHost}%2Ftg_callback.html&return_to=https%3A%2F%2F${tgCallbackHost}%2Ftg_callback.html`;

export default function useSocial() {
  const { twitterConnected, discordConnected, telegramConnected } =
    useUserInfoQuery();
  const [twCallbackUrl, setTwCallbackUrl] = useState("");

  const twAuth = async (evt) => {
    evt.preventDefault();
    const res = await getTwLoginUrl();
    setTwCallbackUrl(() => res["url"]);
    location.href = res["url"];
  };

  const socialList = useMemo(() => {
    return [
      {
        name: "dc",
        connected: discordConnected,
        picUrl: dcGray,
        activePic: dc,
        callbackUrl: dcCallbackUrl,
        handle: noop,
      },
      {
        twitter: "x",
        connected: twitterConnected,
        picUrl: xGray,
        activePic: x,
        callbackUrl: twCallbackUrl,
        handle: twAuth,
      },
      {
        name: "tg",
        connected: telegramConnected,
        picUrl: tgGray,
        activePic: tg,
        callbackUrl: tgCallbackUrl,
        handle: noop,
      },
    ];
  }, [twitterConnected, discordConnected, telegramConnected, twCallbackUrl]);
  return { socialList };
}
