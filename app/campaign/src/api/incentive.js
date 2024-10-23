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
  // return await request.Get(`${host}/campaignNew/verify/normie`);

  return {
    code: 200,
    user: {
      userId: 56297914784368,
      avatar:
        'https://api.dicebear.com/7.x/fun-emoji/svg?backgroundColor=b6e3f4,c0aede,d1d4f9,f6d594,fcbc34,ffd5dc,ffdfbf&backgroundType=gradientLinear&eyes=closed,closed2&mouth=lilSmile,wideSmile&seed=56297914784368',
      email: '',
      name: '',
      newUser: false,
      projects: [],
      evm: { userId: 56297914784368, evmWallet: null, binded: false },
      ar: {
        userId: 56297914784368,
        arWallet: null,
        publicKey: null,
        binded: false,
      },
      zk: {
        userId: 56297914784368,
        issuer: null,
        sub: null,
        identity: null,
        address: null,
        salt: null,
        newUser: false,
        binded: false,
      },
      ton: {
        userId: 56297914784368,
        tonWallet: 'EQDXpUFg7nIF4ZNjqzi9XArLdbGeguYyNjTXXrxlrQakRtwr',
        publicKey:
          'e6309edb8397165d158067f22a241d18dbd5edb826a155166e0762ea6fda2cdb',
        binded: true,
      },
      isTwitterLogin: false,
      twitterName: '',
      dcName: '',
      tgName: 'LeechXD',
      arAddress: '',
      suiAddress: '',
      wallet: '',
      displayAvatar:
        'https://api.dicebear.com/7.x/fun-emoji/svg?seed=56297914784368&radius=50&backgroundColor=059ff2,fcbc34,d84be5,f6d594,ffd5dc,ffdfbf,d1d4f9,c0aede,b6e3f4&backgroundType=gradientLinear&backgroundRotation=30,60&eyes[]&mouth[]',
    },
    normieVerifyResult: [
      {
        campaignId: 59750443878720,
        campaignName: 'Normie Airdrop: Guardian of Blum',
        credentialId: 59750443878722,
        credentialName: 'Boost Blum in Open League',
        labelType: 35,
        isVerified: false,
        sbt: {
          sbtId: 59750443878724,
          name: 'Guardian of Blum',
          activityId: 923,
          activityUrl: 'https://society.ton.org/nomie-airdrop-guardian-of-blum',
          picUrl:
            'https://static.tbook.vip/img/05ce53ab9cec48fabf3204006de2c4af',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59750443878721,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59751238878734,
        campaignName: 'Nomie Airdrop: Guardian of Catizen',
        credentialId: 59751238878736,
        credentialName: 'Complete Daily Check-in',
        labelType: 36,
        isVerified: false,
        sbt: {
          sbtId: 59751239878738,
          name: 'Guardian of Catizen',
          activityId: 925,
          activityUrl:
            'https://society.ton.org/nomie-airdrop-guardian-of-catizen',
          picUrl:
            'https://static.tbook.vip/img/40c2e604323744a8b4ac5d7e47108ab0',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59751238878735,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59801027878955,
        campaignName: 'Normie Airdrop: Guardian of Gamee',
        credentialId: 59801053878961,
        credentialName: 'Provide Liquidity for WAT/TON',
        labelType: 38,
        isVerified: false,
        sbt: {
          sbtId: 59801027878959,
          name: 'Guardian of Gamee',
          activityId: 929,
          activityUrl:
            'https://society.ton.org/nomie-airdrop-guardian-of-gamee',
          picUrl:
            'https://static.tbook.vip/img/ab85a7c7af6449b08d8cb28238f374d7',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59801027878956,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59801219878962,
        campaignName: 'Nomie Airdrop: Guardian of Yescoin',
        credentialId: 59801219878964,
        credentialName: 'Complete Daily Check-in',
        labelType: 37,
        isVerified: false,
        sbt: {
          sbtId: 59801219878966,
          name: 'Guardian of Yescoin',
          activityId: 930,
          activityUrl:
            'https://society.ton.org/nomie-airdrop-guardian-of-yescoin',
          picUrl:
            'https://static.tbook.vip/img/00cbf39c1f164dfdb57c9e2d12631e6b',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59801219878963,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59801416878968,
        campaignName: 'Nomie Airdrop: Guardian of GetGems',
        credentialId: 59801416878970,
        credentialName: 'Complete a trade in any NFT collection',
        labelType: 39,
        isVerified: false,
        sbt: {
          sbtId: 59801416878972,
          name: 'Guardian of GetGems',
          activityId: 931,
          activityUrl:
            'https://society.ton.org/nomie-airdrop-guardian-of-get-gems',
          picUrl:
            'https://static.tbook.vip/img/0fb03608517e4e64b018a6073688675c',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59801416878969,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59801647878973,
        campaignName: 'Normie Airdrop: FTON Holder',
        credentialId: 59801647878975,
        credentialName: 'Holding $FTON',
        labelType: 42,
        isVerified: true,
        sbt: {
          sbtId: 59801647878977,
          name: 'FTON Holder',
          activityId: 932,
          activityUrl: 'https://society.ton.org/nomie-airdrop-fton-holder',
          picUrl:
            'https://static.tbook.vip/img/54f746fc338a48b6a9bfb82573807989',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59801647878974,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59801772878980,
        campaignName: 'Normie Airdrop: RBTC Holder',
        credentialId: 59801772878982,
        credentialName: 'Holding $FTON',
        labelType: 43,
        isVerified: true,
        sbt: {
          sbtId: 59801772878984,
          name: 'RBTC Holder',
          activityId: 933,
          activityUrl: 'https://society.ton.org/nomie-airdrop-rbtc-holder',
          picUrl:
            'https://static.tbook.vip/img/85ae09f559434ca98030c6a9ab7c500f',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59801772878981,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59802064878986,
        campaignName: 'Normie Airdrop: FNZ Holder',
        credentialId: 59802064878988,
        credentialName: 'Holding $FNZ',
        labelType: 44,
        isVerified: true,
        sbt: {
          sbtId: 59802064878990,
          name: 'FNZ Holder',
          activityId: 934,
          activityUrl: 'https://society.ton.org/nomie-airdrop-fnz-holder',
          picUrl:
            'https://static.tbook.vip/img/b4d588c6ae2a4cb29d648723d24f9b43',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59802064878987,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59802292878997,
        campaignName: 'Normie Airdrop: PUMP Holder',
        credentialId: 59802292878999,
        credentialName: 'Holding $PUMP',
        labelType: 45,
        isVerified: true,
        sbt: {
          sbtId: 59802292879001,
          name: 'PUMP Holder',
          activityId: 935,
          activityUrl: 'https://society.ton.org/nomie-airdrop-pump-holder',
          picUrl:
            'https://static.tbook.vip/img/6c80a5016e1643b8a2fee686e33dacc1',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59802292878998,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59802707879004,
        campaignName: 'Normie Airdrop: RANDOM Holder',
        credentialId: 59802707879006,
        credentialName: 'Holding $RANDOM',
        labelType: 46,
        isVerified: true,
        sbt: {
          sbtId: 59802707879008,
          name: 'RANDOM Holder',
          activityId: 936,
          activityUrl: 'https://society.ton.org/nomie-airdrop-random-holder',
          picUrl:
            'https://static.tbook.vip/img/1eb37c402f7245e3bc869829338489dc',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59802707879005,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59802860879009,
        campaignName: 'Normie Airdrop: GRAM Holder',
        credentialId: 59802860879011,
        credentialName: 'Holding $GRAM',
        labelType: 47,
        isVerified: true,
        sbt: {
          sbtId: 59802860879013,
          name: 'GRAM Holder',
          activityId: 937,
          activityUrl: 'https://society.ton.org/nomie-airdrop-gram-holder',
          picUrl:
            'https://static.tbook.vip/img/29c1e8a357154a65ba20152fb21ec5de',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59802860879010,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59803039879016,
        campaignName: 'Normie Airdrop: JETTON Holder',
        credentialId: 59803039879018,
        credentialName: 'Holding $JETTON',
        labelType: 48,
        isVerified: true,
        sbt: {
          sbtId: 59803039879020,
          name: 'JETTON Holder',
          activityId: 938,
          activityUrl: 'https://society.ton.org/normie-airdrop-jetton-holder',
          picUrl:
            'https://static.tbook.vip/img/6e1e559d73df4b1bb715b93affe80969',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59803039879017,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59803176879022,
        campaignName: 'Normie Airdrop: UP Holder',
        credentialId: 59803176879024,
        credentialName: 'Holding $UP',
        labelType: 49,
        isVerified: true,
        sbt: {
          sbtId: 59803176879026,
          name: 'UP Holder',
          activityId: 939,
          activityUrl: 'https://society.ton.org/normie-airdrop-up-holder',
          picUrl:
            'https://static.tbook.vip/img/cb59a64d5ac544dfa54ccd4d9834fd25',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59803176879023,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59803299879029,
        campaignName: 'Normie Airdrop: CES Holder',
        credentialId: 59803299879031,
        credentialName: 'Holding $CES',
        labelType: 50,
        isVerified: true,
        sbt: {
          sbtId: 59803299879033,
          name: 'CES Holder',
          activityId: 940,
          activityUrl: 'https://society.ton.org/normie-airdrop-ces-holder',
          picUrl:
            'https://static.tbook.vip/img/027afa6015534dab856af05e15441e5b',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59803299879030,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
      {
        campaignId: 59803420879034,
        campaignName: 'Normie Airdrop: Toncoin Holder',
        credentialId: 59803420879036,
        credentialName: 'Holding $TON',
        labelType: 51,
        isVerified: false,
        sbt: {
          sbtId: 59803420879038,
          name: 'Toncoin Holder',
          activityId: 941,
          activityUrl: 'https://society.ton.org/normie-airdrop-toncoin-holder',
          picUrl:
            'https://static.tbook.vip/img/58f503304c974d5a8c44b9fdfdf666b9',
          number: 0,
          methodType: 1,
          unlimited: true,
          rewardNum: 0,
          projectId: 54966911762041,
          creatorId: 0,
          groupId: 59803420879035,
          claimedType: 0,
          claimedDate: null,
          campaignId: 0,
          campaignName: '',
          uniqueLink: '',
        },
      },
    ],
  };
};
