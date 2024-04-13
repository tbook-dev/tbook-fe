import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import { useMemo, useCallback } from 'react';
import { getTwLoginUrl, authTgCallback } from '@/api/incentive';
import xGray from '@/images/icon/x-gray.svg';
import x from '@/images/icon/x.svg';
import dcGray from '@/images/icon/dc-gray.svg';
import dc from '@/images/icon/dc.svg';
import tgGray from '@/images/icon/tg-gray.svg';
import tg from '@/images/icon/tg.svg';
import googleSVG from '@/images/zklogin/google.svg';
import googleGarySVG from '@/images/zklogin/google-gray.svg';
import googleColorSvg from '@/images/zklogin/google-color.svg';
import { useDispatch } from 'react-redux';
import {
  setShowSocicalModal,
  setsocialRedirectModalData,
  setShowSocialRedirectModal,
} from '@/store/global';
import facebookSVG from '@/images/zklogin/facebook.svg';
import talkSVG from '@/images/zklogin/talk.svg';
// import { getGoogleLoginUrl } from "@/utils/zklogin";
import { useResponsive } from 'ahooks';
import { delay } from '@/utils/common';
import { useEnokiFlow } from '@mysten/enoki/react';

const curHost = new URL(window.location.href).host;
const dcCallbackUrl = `https://discord.com/api/oauth2/authorize?client_id=1146414186566537288&redirect_uri=https%3A%2F%2F${curHost}%2Fdc_callback&response_type=code&scope=identify%20guilds%20guilds.members.read`;
const tgCallbackHost = import.meta.env.VITE_TG_CALLBACK_HOST;
const tgBotId = import.meta.env.VITE_TG_BOT_ID;
const domain = curHost.split('.')[0];
const tgCallbackUrl = `https://oauth.telegram.org/auth?bot_id=${tgBotId}&origin=https%3A%2F%2F${tgCallbackHost}%2Ftg%2Fcallback%2F${domain}&return_to=https%3A%2F%2F${tgCallbackHost}%2Ftg%2Fcallback%2F${domain}`;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const baseUrl = import.meta.env.VITE_API_HOST;
const googleCallbackUrl = `https://${curHost}/zklogin/callback`;

const socialNameList = ['twitter', 'discord', 'telegram'];
const zkNameList = ['google', 'facebook', 'talk'];
// const zkNameList = ["google"];

export default function useSocial() {
  const {
    twitterConnected,
    discordConnected,
    telegramConnected,
    googleConnected,
    data,
    refetch,
  } = useUserInfoQuery();
  const flow = useEnokiFlow();
  flow.enokiClient.getZkLogin = async function (input) {
    const res = await fetch(`${baseUrl}/zkproxy/v1/zklogin`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'zklogin-jwt': input.jwt,
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }

    const { data } = await res.json();
    return data;
  };
  // useAuthCallback();
  const dispath = useDispatch();
  // const { pc } = useResponsive();
  const allList = useMemo(() => {
    return [
      {
        name: 'discord',
        displayName: 'discord',
        connected: discordConnected,
        picUrl: dcGray,
        activePic: dc,
        loginFn: async (skip = false) => {
          !skip && localStorage.setItem('redirect_url', location.href);
          // location.href = dcCallbackUrl;
          window.open(dcCallbackUrl, '_self');
          window.open(dcCallbackUrl, '_self');
        },
        userName: data?.userDc?.username ?? '',
        failText:
          'Please authorize your Discord account and continue to verify.',
      },
      {
        name: 'twitter',
        displayName: 'X',
        connected: twitterConnected,
        picUrl: xGray,
        activePic: x,
        loginFn: async (skip = false) => {
          !skip && localStorage.setItem('redirect_url', location.href);
          const res = await getTwLoginUrl();
          // const a = document.createElement("a");
          // document.body.appendChild(a);
          // a.style = "display: none";
          // a.href = res["url"];
          // a.setAttribute("target", "_self");
          // a.setAttribute("mc-deep-link", "false");
          // a.setAttribute("rel", "nofollow noopener noreferrer");
          // // rel='nofollow noopener noreferrer'
          // a.click();
          window.open(res['url'], '_self');
          // setTwCallbackUrl(() => res["url"]);
          // location.href = res["url"];
        },
        userName: data?.userTwitter?.twitterUserName ?? '',
        failText: 'Please authorize your X account and continue to verify.',
      },
      {
        name: 'telegram',
        displayName: 'telegram',
        connected: telegramConnected,
        picUrl: tgGray,
        activePic: tg,
        loginFn: async (skip = false) => {
          // !skip && localStorage.setItem("redirect_url", location.href);
          // location.href = tgCallbackUrl;
          // window.open(tgCallbackUrl, pc ? "_blank" : "_self");
          dispath(setShowSocicalModal(false));
          dispath(
            setsocialRedirectModalData({
              type: 'telegram',
              status: 'loading',
              desc: '',
            })
          );
          dispath(setShowSocialRedirectModal(true));
          window?.Telegram.Login.auth(
            { bot_id: tgBotId },
            async function callback(user) {
              if (!user) {
                dispath(
                  setsocialRedirectModalData({
                    type: 'telegram',
                    status: 'failed',
                    desc: '',
                  })
                );
                return;
              }
              try {
                const authRes = await authTgCallback(user);
                console.log({ authRes, user });
                if (authRes.code === 4004) {
                  dispath(
                    setsocialRedirectModalData({
                      type: 'telegram',
                      status: 'occupied',
                      desc: `Telegram account @${authRes.socialName} has been
                          connected to another address
                          ${authRes.address}`,
                    })
                  );
                } else if (authRes.code === 500) {
                  dispath(
                    setsocialRedirectModalData({
                      type: 'telegram',
                      status: 'failed',
                      desc: authRes.msg,
                    })
                  );
                } else {
                  dispath(
                    setsocialRedirectModalData({
                      type: 'telegram',
                      status: 'sucess',
                      desc: `Telegram account @${authRes.socialName} has been authorized. `,
                    })
                  );
                  await refetch();
                  await delay(1000);
                  dispath(setShowSocialRedirectModal(false));
                }
              } catch (e) {
                console.log(e);
                dispath(
                  setsocialRedirectModalData({
                    type: 'telegram',
                    status: 'failed',
                    desc: '',
                  })
                );
              }
              // await refetch();
              // dispath(setShowSocicalModal(false))
            }
          );
        },
        userName:
          data?.userTg?.username ??
          `${data?.userTg?.firstName}_${data?.userTg?.lastName}` ??
          '',
        failText:
          'Please authorize your Telegram account and continue to verify.',
      },
      {
        name: 'google',
        connected: googleConnected,
        picUrl: googleGarySVG,
        activePic: googleSVG,
        picColorUrl: googleColorSvg,
        ready: true,
        // async loginFn(skip) {
        //   console.log("google==");
        //   !skip && localStorage.setItem("redirect_url", location.href);
        //   // location.href = await getGoogleLoginUrl();
        //   const link = await getGoogleLoginUrl();
        //   window.open(link, pc ? "_blank" : "_self");
        // },
        async loginFn(skip = false) {
          !skip && localStorage.setItem('redirect_url', location.href);
          const link = await flow.createAuthorizationURL({
            provider: 'google',
            clientId: googleClientId,
            redirectUrl: googleCallbackUrl,
            extraParams: { scope: ['email'] },
          });
          window.open(link, '_self');
          // window.open(link, pc ? "_self" : "_self");
        },
        async logOut() {
          flow?.logout();
        },
        userName: data?.userZk?.email ?? '',
        failText:
          'Please authorize your Google account and continue to verify.',
      },
      {
        name: 'facebook',
        picUrl: facebookSVG,
        ready: false,
        async loginFn() {},
      },
      {
        name: 'talk',
        picUrl: talkSVG,
        ready: false,
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
      return allList.find((v) => v.name === name);
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
