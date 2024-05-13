import request from './request';

export const host = import.meta.env.VITE_API_HOST;

export const getUserInfo = async function () {
  return await request(`${host}/info`);
};

export const getUserAssets = async function () {
  return await request(`${host}/users/assets`);
};

export const createProject = async function (values) {
  return await request.Post(`${host}/project`, values);
};
export const createNFT = async function (values) {
  return await request.Post(`${host}/nft/create`, values);
};

export const getNFTList = async function (projectId) {
  const list = await request(`${host}/nft/project/${projectId}`);
  return list.filter((v) => !!v.coverUrl);
};

export const createCampaign = async function (values) {
  return await request.Post(`${host}/campaignNew/createCampaign`, values);
};

export const updateCampaign = async function (values) {
  return await request.Post(`${host}/campaignNew/update`, values);
};
export const deleteCampaign = async function (campaignId) {
  return await request.Get(`${host}/campaignNew/deleteCampaign/${campaignId}`);
};
export const getCampaign = async function (projectId) {
  return await request(`${host}/campaignNew/project/${projectId}`);
};
export const getCampaignDetail = async function (id) {
  return await request(`${host}/campaignNew/${id}`);
};
export const getOverview = async function (id) {
  return await request(`${host}/project/${id}/overview`);
};

export const getCredential = async function (projectId) {
  return await request(`${host}/credentials/project/${projectId}`);
};

export const getCredentials = async function (projectId) {
  return await request(`${host}/campaignNew/groups/${projectId}`);
};
export const getNFTcontracts = async function (projectId) {
  const list = await request(`${host}/nft/project/${projectId}`);
  return list.filter((v) => v.contract);
};
export const handleCreateNFTcontract = async function (projectId, values) {
  return {
    contractId: 124,
    name: 'TBOOK NFT Contract Optimism',
    chainId: 10,
  };
};
export const parseLinkParams = async function (values) {
  return await request.Post(`${host}/social/getInfo`, values);
};
export const getCampaignParticipation = async function (campaignId) {
  return await request(`${host}/campaignNew/participation/${campaignId}`);
};

export const getAsset = async function (projectId) {
  return await request(`${host}/project/${projectId}/assets`);
};
export const getNft = async function (nftId, groupId) {
  return await request(
    `${host}/nft/giveaways?nftId=${nftId}&groupId=${groupId}`
  );
};
export const createCredential = async function (values) {
  return await request.Post(`${host}/credentials/create`, values);
};

export const getProjectExternalConfig = async function (projectId) {
  return await request(`${host}/project/${projectId}/externalConfig`);
};

export const getPreSignedUrl = async function () {
  return await request(`${host}/signedUploadUrl`);
};
export const authenticate = async function (address, sign) {
  return request.PostFormV1(`${host}/authenticate`, { address, sign });
};
export const updateProject = async function (values) {
  return await request.Post(`${host}/project/update`, values);
};
export const genAppKey = async function (projectId) {
  return await request.Post(`${host}/project/${projectId}/key`);
};
export const updateProjectExt = async function (projectId, values) {
  return await request.Post(
    `${host}/project/${projectId}/callback/update`,
    values
  );
};

export const getTonPayload = async function () {
  return await request(`${host}/ton-proof/generate-payload`);
};

export const verifyTonProof = async function (data) {
  return await request.Post(`${host}/ton-proof/verify`, data);
};

export const getTwLoginUrl = async function () {
  const res = await fetch(`${host}/twitter/auth`, {
    method: 'GET',
    credentials: 'include',
  });
  return await res.json();
};

export const getReward = async function (campaignId) {
  return await request(`${host}/campaignNew/reward/${campaignId}`);
};

export const getNFTSupportedChains = async function () {
  return await request(`${host}/nft/supportedChains`);
};

export const getAdmins = async function (projectId) {
  return await request(`${host}/project/admins/${projectId}`);
};

export const deleteAdmin = async function (projectId, wallet, isOwner, sign) {
  return await request.Post(`${host}/project/deleteAdmin`, {
    projectId,
    wallet,
    isOwner,
    op: 'DEL',
    sign,
  });
};

export const addAdmin = async function (projectId, wallet, sign) {
  return await request.Post(`${host}/project/addAdmin`, {
    projectId,
    wallet,
    op: 'ADD',
    sign,
  });
};

export const getAdminNonce = async function (data) {
  return await request.Post(`${host}/project/admin/nonce`, data);
};

export const getDcRoles = async function (url) {
  await new Promise((r) => {
    setTimeout(r, 1000);
  });
  return await request.Post(`${host}/dc/roles`, { payload: url });
};

export const getTopProjects = async function () {
  return await request.Get(`${host}/project/home`);
};

export const updateTopProjects = async function (values) {
  return await request.Post(`${host}/project/setHome`, values);
};
