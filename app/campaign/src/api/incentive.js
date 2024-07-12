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
export const getTaskSign = async function(credentialId){
  return await request.Get(`${host}/campaignSign/${credentialId}`)
}
export const takTaskSign = async function(credentialId, data){
  return await request.PostFormV1(`${host}/campaignSign/${credentialId}/verify`, data,)
}
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
  return await request(`${host}/nft/supportedChains`);
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

export const getWiseScore = async function (uid) {
  return await request.Get(`${host}/wiseScore/${uid}`);
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