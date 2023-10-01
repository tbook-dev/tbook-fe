import request from "./request";

export const host = import.meta.env.VITE_API_HOST;

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

export const getExporeCampain = async function () {
  return await request(`${host}/project/explore`);
};

export const getNftClaimInfo = async function (nftId, groupId) {
  return await request(`${host}/nft/claim/${nftId}/group/${groupId}`, {
    method: "POST",
    credentials: "include",
  });
};

export const getUserAsset = async function(projectId){
  return await request(`${host}/project/${projectId}/assets`)
}