import request from "./request";

export const host = import.meta.env.VITE_API_HOST;
export const authenticate = async function (address, sign) {
  const d = new URLSearchParams();
  d.append("address", address);
  d.append("sign", sign);
  const response = await fetch(`${host}/authenticate`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: d,
  });
  console.log("status:", response.status);
  response.text().then((b) => console.log("body", b));
  response.headers.forEach((value, key) => {
    console.log(key, value);
  });
  console.log(document.cookie);
  // await new Promise(r => {
  //   setTimeout(r, 10000)
  // })
};
export const getUserInfo = async function () {
  return await request(`${host}/info`);
};
export const getProjectInfo = async function (projectId) {
  return await request(`${host}/project/${projectId}`);
};
export const getCampaignDetail = async function (id) {
  return await request(`${host}/campaignNew/${id}`);
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
    method: "GET",
    credentials: "include",
  })
    .then((r) => r.json())
    .then((d) => {
      localStorage.setItem("redirect_url", location.href);
      window.location = d["url"];
    });
};

export const getTwLoginUrl = async function () {
  const res = await fetch(`${host}/twitter/auth`, {
    method: "GET",
    credentials: "include",
  });
  return await res.json();
};

export const loginUsingTwitterUrl = async function () {
  const res = await fetch(`${host}/twitter/login/auth`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  localStorage.setItem("redirect_url", location.href);
  // window.location = data["url"];
  // window.open(data["url"], "_blank")
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = data["url"];
  a.setAttribute("target", "_blank");
  a.setAttribute("mc-deep-link", "false");
  a.setAttribute("ref", "nofollow noopener noreferrer");
  // rel='nofollow noopener noreferrer'
  a.click();
};

export const getExporeCampain = async function () {
  return await request(`${host}/project/explore`);
};

export const getNftClaimInfo = async function (nftId, groupId) {
  return await request(`${host}/nft/claim/${nftId}/group/${groupId}`, {
    method: "POST",
    credentials: "include",
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
  data.append("tx", tx);
  data.append("dummyId", dummyId);
  const res = await fetch(`${host}/nft/claimed/${nftId}/group/${groupId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
    body: data,
  });
  return await res.text();
};

export const getUserCampaign = async function (projectId) {
  return await request(`${host}/user/${projectId}/campaigns`);
};

export const authTwitterCallback = async function () {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  return await request.PostFormV1(`${host}/twitter/callback`, { code, state });
};

export const authTwitterLoginCallback = async function () {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  return await request.PostFormV1(`${host}/twitter/login/callback`, {
    code,
    state,
  });
};

export const authTgCallback = async function () {
  const url = new URL(window.location.href);
  let authResult = url.searchParams.get("tgAuthResult");
  if (!authResult) {
    authResult = url.hash.split("=")[1];
  }
  return await request.PostFormV1(`${host}/tg/callback`, {
    originAuthResult: authResult,
  });
};

export const authDcCallback = async function () {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  return await request.PostFormV1(`${host}/dc/callback`, { code });
};

export const getNFTSupportedChains = async function () {
  return await request(`${host}/nft/supportedChains`);
};

export const bindEvm = async function (address, sign) {
  const d = new URLSearchParams();
  d.append("address", address);
  d.append("sign", sign);
  const bindResult = await fetch(`${host}/bindEvm`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
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
  return await request(`${host}/project/byUrl/${encodeURI(projectName)}`);
};
export const getCampaign = async function (projectId) {
  return await request(`${host}/campaignNew/project/${projectId}`);
};

export const getZKSalt = async function (jwtToken) {
  return await request.Post(`${host}/zk/salt`, { payload: jwtToken });
};

export const updateZKAddress = async function (address) {
  const d = new URLSearchParams();
  d.append("address", address);
  const bindResult = await fetch(`${host}/zk/address`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
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
