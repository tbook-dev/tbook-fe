import request from './request';

export const host = import.meta.env.VITE_API_HOST;
export const authenticate = async function (address, sign) {
  const d = new URLSearchParams();
  d.append('address', address);
  d.append('sign', sign);
  const response = await fetch(`${host}/authenticate`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: d,
  });
  return await response.json();
};
export const getUserInfo = async function () {
  return await request(`${host}/info`);
};
export const getTaskSign = async function (credentialId) {
  return await request.Get(`${host}/campaignSign/${credentialId}`);
};
export const takTaskSign = async function (credentialId, data) {
  return await request.PostFormV1(
    `${host}/campaignSign/${credentialId}/verify`,
    data
  );
};
export const getProjectInfo = async function (projectId) {
  return await request(`${host}/project/${projectId}`);
};
export const getCampaignDetail = async function (id) {
  return await request(`${host}/campaignNew/consumer/${id}`);
};
export const claimCampaign = async function (campaignId) {
  return await request(`${host}/campaignNew/claim/${campaignId}`);
};
export const verifyCredential = async function (credentialId) {
  return await request.Post(
    `${host}/campaignNew/credential/${credentialId}/verify`
  );
};
export const verifyTbook = async function (credentialId) {
  return await request.Post(
    `${host}/campaignNew/credential/${credentialId}/visitPageVerify`
  );
};
export const twLogin = async function () {
  fetch(`${host}/twitter/auth`, {
    method: 'GET',
    credentials: 'include',
  })
    .then((r) => r.json())
    .then((d) => {
      localStorage.setItem('redirect_url', location.href);
      window.location = d['url'];
    });
};

export const getTwLoginUrl = async function () {
  const res = await fetch(`${host}/twitter/auth`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

export const loginUsingTwitterUrl = async function () {
  const res = await fetch(`${host}/twitter/login/auth`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();
  localStorage.setItem('redirect_url', location.href);
  window.open(data['url'], '_self');
};

export const getExporeCampain = async function () {
  return await request(`${host}/project/explore`);
};

export const getNftClaimInfo = async function (nftId, groupId) {
  return await request(`${host}/nft/claim/${nftId}/group/${groupId}`, {
    method: 'POST',
    credentials: 'include',
  });
};

export const getUserAsset = async function (projectId) {
  return await request(`${host}/user/${projectId}/assets`);
};

export const getUserAssetByCompany = async function (companyId) {
  return await request(`${host}/company/user/${companyId}/assets`);
};

export const getNft = async function (groupId, nftId) {
  return await request(`${host}/user/${groupId}/nftInfo/${nftId}`);
};
export const updateClaimed = async function (nftId, groupId, tx, dummyId) {
  const data = new URLSearchParams();
  data.append('tx', tx);
  data.append('dummyId', dummyId);
  const res = await fetch(`${host}/nft/claimed/${nftId}/group/${groupId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: data,
  });
  return await res.text();
};

export const getUserCampaign = async function (projectId) {
  return await request(`${host}/user/${projectId}/campaigns`);
};

export const authTwitterCallback = async function () {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  return await request.PostFormV1(`${host}/twitter/callback`, { code, state });
};

export const authTwitterLoginCallback = async function () {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  return await request.PostFormV1(`${host}/twitter/login/callback`, {
    code,
    state,
  });
};

export const authTgCallback = async function (data) {
  return await request.Post(`${host}/tg/callback/v2`, data);
};

export const authDcCallback = async function () {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  return await request.PostFormV1(`${host}/dc/callback`, { code });
};

export const getNFTSupportedChains = async function () {
  return await request.Get(`${host}/nft/supportedChains`);
};

export const bindEvm = async function (address, sign) {
  const d = new URLSearchParams();
  d.append('address', address);
  d.append('sign', sign);
  const bindResult = await fetch(`${host}/bindEvm`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: d,
  });
  return bindResult;
};

export const logUserReport = async function (data) {
  try {
    return await request.Post(`${host}/campaignNew/participant`, data);
  } catch (e) {
    return null;
  }
};

export const getProjectId = async function (projectName) {
  return await request(
    `${host}/project/byUrl/${encodeURIComponent(projectName)}`
  );
};
export const getCampaign = async function (projectId) {
  return await request(`${host}/campaignNew/project/${projectId}`);
};

export const getZKSalt = async function (jwtToken) {
  return await request.Post(`${host}/zk/salt`, { payload: jwtToken });
};

export const updateZKAddress = async function (address) {
  const d = new URLSearchParams();
  d.append('address', address);
  const bindResult = await fetch(`${host}/zk/address`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: d,
  });
  return bindResult;
};

export const doZKProof = async function (address, proof) {
  const data = { proof: JSON.stringify(proof), address };
  return await request.Post(`${host}/zk/proof`, data);
};

export const submitAddress = async function (data) {
  return await request.Post(`${host}/campaignAddress/submitAddress`, data);
};

export const getAirdropAddress = async function (data) {
  return await request.Post(`${host}/campaignAddress/address`, data);
};

export const markNewUser = async function () {
  return await request.Post(`${host}/markNewUser`);
};

export const mergePassport = async function (data) {
  return await request.Post(`${host}/twitter/mergePassport`, data);
};

export const getTopProjects = async function () {
  return await request.Get(`${host}/project/home`);
};
export const disConnectSocialAccount = async function (data) {
  return await request.PostFormV1(`${host}/social/unbind`, data);
};
export const disConnectTonAddcount = async function (data) {
  return await request.PostFormV1(`${host}/ton-proof/unbind`, data);
};
export const tgTMAAuth = async function (data) {
  return await request.Post(`${host}/tg/tma/auth`, data);
};
export const getTonPayload = async function () {
  return await request(`${host}/ton-proof/generate-payload`);
};

export const verifyTonProof = async function (data) {
  return await request.Post(`${host}/ton-proof/verify`, data);
};

export const getWiseScore = async function () {
  // return await request.Get(`${host}/wiseScore/score`);
  return await request.Get(`${host}/wiseScore/getScore`);
};

export const getTopBoard = async function () {
  return await request.Get(`${host}/wiseScore/leaderBoard`);
};

export const addWiseSocialLink = async function (data) {
  return await request.Post(`${host}/wiseScore/addLink`, data);
};
export const getUserRenaissance = async function (userId) {
  return await request.Get(`${host}/luckyDraw/level/${userId}`);
};
export const getUserLevel = async function (userId) {
  // return 2;
  return await request.Get(`${host}/luckyDraw/level/${userId}`);
};
export const joinSBTList = async function (userId) {
  return await request.Get(`${host}/luckyDraw/joinSBTList/${userId}`);
};
export const getUserTpoints = async function (userId) {
  return await request.Get(`${host}/luckyDraw/tPoints/${userId}`);
};
export const getInvitedFriends = async function () {
  return await request.Get(`${host}/tg/invitations`);
};

export const getWiseScoreTop3 = async function () {
  return await request.Get(`${host}/wiseScore/top3`);
};

export const takeLuckyDraw = async function (userId) {
  return await request.Get(`${host}/luckyDraw/${userId}`);
};
export const getBugCardsList = async function () {
  return await request.Get(`${host}/tPoints/buyCards/levelMap`);
};
export const buyCard = async function (level) {
  return await request.Get(`${host}/tPoints/buyCards/${level}`);
};
export const getBoostStatus = async function () {
  return await request.Get(`${host}/tPoints/boost/status`);
};
export const reportRangerShare = async function (userId, type) {
  return await request.PostFormV1(`${host}/wise-task/check-task`, {
    taskName: `share:${userId}:${type}`,
  });
};
export const checkTask = async function (taskName) {
  return await request.PostFormV1(`${host}/wise-task/check-task`, {
    taskName,
  });
};
export const getInvitedCreditFriends = async function () {
  return await request.Get(`${host}/wise-score-invite/my-code`);
};
export const applyCode = async function (data) {
  return await request.PostFormV1(`${host}/wise-score-invite/apply-code`, data);
};
export const getWiseScoreStatus = async function (userId) {
  const res = await request.Get(`${host}/wiseScore/check/${userId}`);
  return res?.code === 200;
};
export const getSBTList = async function () {
  return await request.Get(`${host}/wiseScore/mint`);
};
export const mintSBT = async function () {
  return await request.Get(`${host}/wiseScore/mint`);
};
export const claimSBT = async function (sbtId) {
  return await request.Get(`${host}/campaignNew/claimSBT/${sbtId}`);
};
export const applyAmbassador = async function () {
  // return await request.Post(`${host}/wiseScore/applyAmbassador`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};
export const getAmbassadorLevel = async function (userId) {
  const res = await request.Get(`${host}/vanguard/level/${userId}`);
  if (res.code === 400) {
    return {
      level: -1,
      tpointsNum: 0,
      wiseScoreNum: 0,
    };
  } else {
    return {
      level: res.tPointsVanguard?.level ?? 0,
      // level: 1,
      tpointsNum: res.tPointsVanguard?.tpointsNum ?? 0,
      wiseScoreNum: res.tPointsVanguard?.wiseScoreNum ?? 0,
    };
  }
};

export const hasInviteCode = async function () {
  return await request.Get(`${host}/wise-score-invite/has-code`);
};

export const getAmbassadorLevels = async function () {
  const res = await request.Get(`${host}/vanguard/level/config`);
  return Array.isArray(res) ? res.slice(0, 2) : [];
};

export const getDeFi = async function () {
  return await request.Get(`${host}/campaignNew/defi`);
};

export const getCompanyProjects = async function (companyId) {
  return await request.Get(`${host}/company/${companyId}`);
};

export const getCompanyLeaderboard = async function (companyId) {
  return await request.Get(`${host}/company/leaderboard/${companyId}`);
};

export const getCompanyOnboardCampaignInfo = async function (companyId) {
  return await request.Get(`${host}/company/${companyId}/onboardCampaign`);
};

export const getNormis = async function name() {
  return {
    lateNightDefiGroups: [
      {
        groupType: 2,
        name: 'Join Channel',
        id: 56120827779160,
        credentialList: [
          {
            credentialId: 56120827779161,
            name: 'Join Channel',
            nameExp: '',
            labelType: 7,
            link: '',
            picUrl: '/assets/tg-white-402ddc9e.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779160,
            groupType: 2,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"url":"https://t.me/thetonstakers","link":"https://t.me/thetonstakers","telegramGroup":"Tonstakers","telegramChannel":"Tonstakers"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
          {
            credentialId: 56120827779162,
            name: 'Stake some TON',
            nameExp: '',
            labelType: 14,
            link: '',
            picUrl: '/assets/tonstaker-white-283c865b.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779160,
            groupType: 8,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"name":"Stake some TON","link":"https://t.me/tonstakers_bot?profile"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
        ],
        projectId: 54966911762041,
        creatorId: 0,
        campaignId: 56120827779159,
        status: 1,
        nftList: [],
        pointList: [],
        tokenList: [],
        sbtList: [
          {
            sbtId: 56120827779163,
            name: 'Tonstakers Strategist',
            activityId: 563,
            activityUrl: '',
            picUrl:
              'https://static.tbook.vip/img/68e50db7f11e4eeb9a6f10a6cb786850',
            number: 0,
            methodType: 1,
            unlimited: true,
            rewardNum: 0,
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779160,
            claimedType: 0,
            claimedDate: null,
            campaignId: 0,
            campaignName: '',
            uniqueLink: '',
          },
        ],
        sbtCollection: null,
      },
      {
        groupType: 2,
        name: 'Join Channel',
        id: 56120827779164,
        credentialList: [
          {
            credentialId: 56120827779165,
            name: 'Join Channel',
            nameExp: '',
            labelType: 7,
            link: '',
            picUrl: '/assets/tg-white-402ddc9e.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779164,
            groupType: 2,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"url":"https://t.me/bemofinanceENG","link":"https://t.me/bemofinanceENG","telegramGroup":"bemo","telegramChannel":"bemo"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
          {
            credentialId: 56120827779166,
            name: 'Stake some TON',
            nameExp: '',
            labelType: 15,
            link: '',
            picUrl: '/assets/bemo-white-516bbdfd.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779164,
            groupType: 8,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"name":"Stake some TON","link":"https://t.me/bemo_finance_bot?profile"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
        ],
        projectId: 54966911762041,
        creatorId: 0,
        campaignId: 56120827779159,
        status: 1,
        nftList: [],
        pointList: [],
        tokenList: [],
        sbtList: [
          {
            sbtId: 56120827779167,
            name: 'Bemo Strategist',
            activityId: 568,
            activityUrl: '',
            picUrl:
              'https://static.tbook.vip/img/9d189c586499416cacb8c3c35fe43b40',
            number: 0,
            methodType: 1,
            unlimited: true,
            rewardNum: 0,
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779164,
            claimedType: 0,
            claimedDate: null,
            campaignId: 0,
            campaignName: '',
            uniqueLink: '',
          },
        ],
        sbtCollection: null,
      },
      {
        groupType: 2,
        name: 'Join Channel',
        id: 56120827779168,
        credentialList: [
          {
            credentialId: 56120827779169,
            name: 'Join Channel',
            nameExp: '',
            labelType: 7,
            link: '',
            picUrl: '/assets/tg-white-402ddc9e.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779168,
            groupType: 2,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"url":"https://t.me/evaaprotocol","link":"https://t.me/evaaprotocol","telegramGroup":"EVAA","telegramChannel":"EVAA"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
          {
            credentialId: 56120827779170,
            name: 'Supply tsTON or stTON',
            nameExp: '',
            labelType: 21,
            link: '',
            picUrl: '/assets/EVAA-white-6612a6e2.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779168,
            groupType: 8,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"name":"Supply tsTON or stTON","link":"https://t.me/EvaaAppBot?profile"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
          {
            credentialId: 56120827779171,
            name: 'Borrow USDT',
            nameExp: '',
            labelType: 16,
            link: '',
            picUrl: '/assets/EVAA-white-6612a6e2.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779168,
            groupType: 8,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"name":"Borrow USDT","link":"https://t.me/EvaaAppBot?profile"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
        ],
        projectId: 54966911762041,
        creatorId: 0,
        campaignId: 56120827779159,
        status: 1,
        nftList: [],
        pointList: [],
        tokenList: [],
        sbtList: [
          {
            sbtId: 56120827779172,
            name: 'EVAA Pawnbroker',
            activityId: 569,
            activityUrl: '',
            picUrl:
              'https://static.tbook.vip/img/97d745072c2942d989f74de5b10bf568',
            number: 0,
            methodType: 1,
            unlimited: true,
            rewardNum: 0,
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779168,
            claimedType: 0,
            claimedDate: null,
            campaignId: 0,
            campaignName: '',
            uniqueLink: '',
          },
        ],
        sbtCollection: null,
      },
      {
        groupType: 2,
        name: 'Join Channel',
        id: 56120827779173,
        credentialList: [
          {
            credentialId: 56120827779174,
            name: 'Join Channel',
            nameExp: '',
            labelType: 7,
            link: '',
            picUrl: '/assets/tg-white-402ddc9e.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779173,
            groupType: 2,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"url":"https://t.me/stonfidex","link":"https://t.me/stonfidex","telegramGroup":"STON.fi","telegramChannel":"STON.fi"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
          {
            credentialId: 56120827779175,
            name: 'Provide Liquidity for TON + USDT or ts/stTON + USDT',
            nameExp: '',
            labelType: 17,
            link: '',
            picUrl: '/assets/stonfi-white-1df62203.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779173,
            groupType: 8,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"name":"Provide Liquidity for TON + USDT or ts/stTON + USDT","link":"https://t.me/ston_fi?profile"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
        ],
        projectId: 54966911762041,
        creatorId: 0,
        campaignId: 56120827779159,
        status: 1,
        nftList: [],
        pointList: [],
        tokenList: [],
        sbtList: [
          {
            sbtId: 56120827779176,
            name: 'STON Herald',
            activityId: 575,
            activityUrl: '',
            picUrl:
              'https://static.tbook.vip/img/6ec3fc49284e40d8a226910b7a8c01ab',
            number: 0,
            methodType: 1,
            unlimited: true,
            rewardNum: 0,
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779173,
            claimedType: 0,
            claimedDate: null,
            campaignId: 0,
            campaignName: '',
            uniqueLink: '',
          },
        ],
        sbtCollection: null,
      },
      {
        groupType: 2,
        name: 'Join Channel',
        id: 56120827779177,
        credentialList: [
          {
            credentialId: 56120827779178,
            name: 'Join Channel',
            nameExp: '',
            labelType: 7,
            link: '',
            picUrl: '/assets/tg-white-402ddc9e.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779177,
            groupType: 2,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"url":"https://t.me/dedust_en","link":"https://t.me/dedust_en","telegramGroup":"DeDust.io – TON DEX","telegramChannel":"DeDust.io – TON DEX"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
          {
            credentialId: 56120827779179,
            name: 'Provide Liquidity for TON + USDT or ts/stTON + USDT',
            nameExp: '',
            labelType: 18,
            link: '',
            picUrl: '/assets/dedust-white-35d917d4.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779177,
            groupType: 8,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"name":"Provide Liquidity for TON + USDT or ts/stTON + USDT","link":"https://t.me/dedustBot?profile"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
        ],
        projectId: 54966911762041,
        creatorId: 0,
        campaignId: 56120827779159,
        status: 1,
        nftList: [],
        pointList: [],
        tokenList: [],
        sbtList: [
          {
            sbtId: 56120827779180,
            name: 'DeDust Herald',
            activityId: 576,
            activityUrl: '',
            picUrl:
              'https://static.tbook.vip/img/4ff672c95ea64d24830d437e5316b747',
            number: 0,
            methodType: 1,
            unlimited: true,
            rewardNum: 0,
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779177,
            claimedType: 0,
            claimedDate: null,
            campaignId: 0,
            campaignName: '',
            uniqueLink: '',
          },
        ],
        sbtCollection: null,
      },
      {
        groupType: 2,
        name: 'Join Channel',
        id: 56120827779181,
        credentialList: [
          {
            credentialId: 56120827779182,
            name: 'Join Channel',
            nameExp: '',
            labelType: 7,
            link: '',
            picUrl: '/assets/tg-white-402ddc9e.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779181,
            groupType: 2,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"url":"https://t.me/storm_trade_news","link":"https://t.me/storm_trade_news","telegramGroup":"Storm Trade | News ⚡️","telegramChannel":"Storm Trade | News ⚡️"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
          {
            credentialId: 56120827779183,
            name: 'Vault USDT or TON',
            nameExp: '',
            labelType: 19,
            link: '',
            picUrl: '/assets/stormtrade-white-5b95b6c6.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779181,
            groupType: 8,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 0,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"name":"Vault USDT or TON","link":"https://t.me/StormTradeBot?profile"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
          {
            credentialId: 56120827779184,
            name: 'Open a trade in any trading pair',
            nameExp: '',
            labelType: 20,
            link: '',
            picUrl: '/assets/stormtrade-white-5b95b6c6.svg',
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779181,
            groupType: 8,
            spaceId: '',
            campaignId: 56120827779159,
            isVerified: 1,
            giveAway: 0,
            eligibleCount: 0,
            tipText: '',
            placeHolder: '',
            roleId: '0',
            roleName: '',
            visitPageName: '',
            proposalId: '',
            title: '',
            description: '',
            options:
              '{"name":"Open a trade in any trading pair ","link":"https://t.me/StormTradeBot?profile"}',
            extraInfo: '',
            ctaApiLink: '',
            customUserAddressType: 0,
            verifyApiLink: '',
          },
        ],
        projectId: 54966911762041,
        creatorId: 0,
        campaignId: 56120827779159,
        status: 1,
        nftList: [],
        pointList: [],
        tokenList: [],
        sbtList: [
          {
            sbtId: 56120827779185,
            name: 'Storm Trader ',
            activityId: 570,
            activityUrl: '',
            picUrl:
              'https://static.tbook.vip/img/b66427b291ed4962870011bb15a9caaa',
            number: 0,
            methodType: 1,
            unlimited: true,
            rewardNum: 0,
            projectId: 54966911762041,
            creatorId: 0,
            groupId: 56120827779181,
            claimedType: 0,
            claimedDate: null,
            campaignId: 0,
            campaignName: '',
            uniqueLink: '',
          },
        ],
        sbtCollection: null,
      },
    ],
  };
};
