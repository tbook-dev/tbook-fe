import useUserInfoQuery from "@/hooks/useUserInfoQuery";
import defaultAvator from "@/images/icon/defaultAvator.svg";
import { shortAddress } from "@tbook/utils/lib/conf";
import xGray from "@/images/icon/x-gray.svg";
import x from "@/images/icon/x.svg";
import dcGray from "@/images/icon/dc-gray.svg";
import dc from "@/images/icon/dc.svg";
import tgGray from "@/images/icon/tg-gray.svg";
import tg from "@/images/icon/tg.svg";
import { useMemo, useState } from "react";
import { noop } from "lodash";
// import ColorThief from 'colorthief'
// const colorThief = new ColorThief();

const curHost = new URL(window.location.href).host;
const dcCallbackUrl = `https://discord.com/api/oauth2/authorize?client_id=1146414186566537288&redirect_uri=https%3A%2F%2F${curHost}%2Fdc_callback&response_type=code&scope=identify%20guilds%20guilds.members.read`;
const tgCallbackHost = import.meta.env.VITE_TG_CALLBACK_HOST;
const tgBotId = import.meta.env.VITE_TG_BOT_ID;
const tgCallbackUrl = `https://oauth.telegram.org/auth?bot_id=${tgBotId}&origin=https%3A%2F%2F${tgCallbackHost}%2Ftg_callback.html&return_to=https%3A%2F%2F${tgCallbackHost}%2Ftg_callback.html`;

export default function PersonalInfo() {
  const { data, twitterConnected, discordConnected, telegramConnected } =
    useUserInfoQuery();
  const [twCallbackUrl, setTwCallbackUrl] = useState("");
  const [mainColor, setMainColor] = useState(null)

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
        name: "x",
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


  return (
    <div className="pt-4 flex flex-col items-center gap-y-4">
      <img
        src={data?.user?.avatar ?? defaultAvator}
        alt="user avatar"
        className="w-20 h-20 rounded-full"
      />
      <p className="text-[#131517] text-base font-medium">
        {shortAddress(data?.user?.wallet)}
      </p>
      <div className="flex items-center gap-x-3">
        {socialList.map((v) => {
          const logo = (
            <img
              src={v.connected ? v.activePic : v.picUrl}
              className="w-4 h-4"
            />
          );
          return v.connected ? (
            <button key={v.name}>{logo}</button>
          ) : (
            <a
              key={v.name}
              href={v.callbackUrl}
              onClick={v.handle}
              target="_blank"
            >
              {logo}
            </a>
          );
        })}
      </div>
    </div>
  );
}
