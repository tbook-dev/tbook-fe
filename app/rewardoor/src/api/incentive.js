import request from "./request";
import { Network, Alchemy } from "alchemy-sdk";
const settings = {
  apiKey: "8s2Swo7n62XYd3ApkcnentYuEi5BI1Yj",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export const host = import.meta.env.VITE_API_HOST;

export const getUserInfo = async function () {
  return request(`${host}/info`);
};

export const getUserAssets = async function () {
  return request(`${host}/users/assets`);
};

export const createProject = async function (values) {
  return request.Post(`${host}/project`, values);
};
export const createNFT = async function (values) {
  return request.Post(`${host}/nft/create`, values);
};
export const getNFTInfo = async function (contract) {
  const nftRes = await alchemy.nft.getNftsForContract(contract);
  const firstNft = nftRes?.nfts?.find((v) => v?.media?.[0]?.gateway);
  return firstNft;
};

export const getNFTList = async function (projectId) {
  const list = await request(`${host}/nft/project/${projectId}`);
  return list.filter((v) => !!v.coverUrl);
};

export const createCampaign = async function (values) {
  return await request.Post(`${host}/campaign/create`, values);
};
export const updateCampaign = async function (values) {
  return await request.Post(`${host}/campaign/update`, values);
};
export const getCampaign = async function (projectId) {
  return await request(`${host}/campaignNew/project/${projectId}`);
};
export const getCampaignDetail = async function (id) {
  return await request(`${host}/campaign/stats/${id}`);
};
export const getOverview = async function (id) {
  return await request(`${host}/project/${id}/overview`);
};

export const getCredential = async function (projectId) {
  return await request(`${host}/credentials/project/${projectId}`);
};
export const getCredentialByGroup = async function (projectId) {};
export const getCredentials = async function (projectId) {
  const groups = await request(`${host}/campaignNew/project/${projectId}`);
  console.log("groups--->", groups);
  const list = await Promise.all(groups.map((v) => getCredential(v.id)));
  return list;
  // return await request(`${host}/campaignNew/actionList/${projectId}`);
  // /credentials/creator/{creatorId}
  // return [
  //   {
  //     name: "Governance",
  //     id: "1",
  //     list: [
  //       {
  //         credentialId: 179943370143,
  //         name: "Follow on Twitter",
  //         nameExp: "Follow {1} on Twitter",
  //         taskName: "Twitter Profile Link",
  //         picUrl: "",
  //         projectId: 154283610009,
  //         creatorId: 154283420008,
  //         eligibleCount: 0,
  //       },
  //       {
  //         credentialId: 179943370144,
  //         name: "Twitter Retweet",
  //         nameExp: "Retweet {1} on Twitter",
  //         taskName: "Tweet Link",
  //         picUrl: "",
  //         projectId: 154283610009,
  //         creatorId: 154283420008,
  //         eligibleCount: 0,
  //       },
  //     ],
  //   },
  //   {
  //     name: "tw",
  //     id: "2",
  //     list: [
  //       {
  //         credentialId: 179943370149,
  //         name: "Follow on Twitter1",
  //         nameExp: "Follow {1} on Twitter",
  //         taskName: "Twitter Profile Link",
  //         picUrl: "",
  //         projectId: 154283610009,
  //         creatorId: 154283420008,
  //         eligibleCount: 0,
  //       },
  //       {
  //         credentialId: 179943370119,
  //         name: "no Retweet2",
  //         nameExp: "Retweet {1} on Twitter",
  //         taskName: "Tweet Link",
  //         picUrl: "",
  //         projectId: 154283610009,
  //         creatorId: 154283420008,
  //         eligibleCount: 0,
  //       },
  //     ],
  //   },
  // ];
};
export const getNFTcontracts = async function (projectId) {
  // console.log("get-list----->", projectId);
  const list = await request(`${host}/nft/project/${projectId}`);
  return list.filter((v) => !!v.coverUrl && v.contract);
};
export const handleCreateNFTcontract = async function (projectId, values) {
  return {
    contractId: 124,
    name: "TBOOK NFT Contract Optimism",
    chainId: 10,
  };
};
export const getPoint = async function (projectId) {
  return await request(`${host}/project/stats/${projectId}/points`);
};

export const createCredential = async function (values) {
  return await request.Post(`${host}/credentials/create`, values);
};

// export const getCredentials = async function (projectId) {
//   return await request(`${host}/credentials/project/${projectId}`);
// };
//
export const getIncentiveList = async function (projectId) {
  try {
    const res = await request(`${host}/projects/${projectId}/tips`);
    return (Array.isArray(res) ? res : []).slice();
  } catch (error) {
    return [];
  }
};
export const getPreSignedUrl = async function () {
  return request(`${host}/signedUploadUrl`);
};
export const getIncentiveListWithGrants = async function (projectId) {
  try {
    const res = await request(`${host}/projects/${projectId}/planWithGrants`);
    return (Array.isArray(res) ? res : []).slice();
  } catch (error) {
    return [];
  }
};

export const getTIPInfo = async function (incentivePlanId) {
  return request(`${host}/tip/tipInfo?incentivePlanId=${incentivePlanId}`);
};

export const getTipGrantees = async function (incentivePlanId) {
  return request(`${host}/tip/grantees?incentivePlanId=${incentivePlanId}`);
};

export const getProjectUsers = async function (projectId) {
  return request(`${host}/projects/${projectId}/users`);
};
export const addProjectUser = async function (projectId, values) {
  return request.PostFormV1(`${host}/projects/${projectId}/userAdd`, values);
};
export const updateProjectName = async function (projectId, values) {
  return request.PostFormV1(`${host}/projects/${projectId}/nameUpdate`, values);
};
export const updateProjectValuation = async function (projectId, values) {
  return request.PostFormV1(
    `${host}/projects/${projectId}/valuationUpdate`,
    values
  );
};

export const getTipGrantList = async function (incentivePlanId) {
  return request(`${host}/grant/${incentivePlanId}/grants`);
};

export const createTIP = async function (values) {
  return request.Post(
    `${host}/tip/addTip?projectId=${values.projectId}`,
    values
  );
};

export const addGrant = async function (incentivePlanId, values) {
  return request.Post(
    `${host}/grant/addGrant?incentivePlanId=${incentivePlanId}`,
    values
  );
};

export const getGrantInfo = async function (grantId) {
  return request(`${host}/grant/grantInfo?grantId=${grantId}`);
};

export const getGrantInfoWithPlan = async function (grantId) {
  return fetch(`${host}/grant/grantInfoWithPlan?grantId=${grantId}`, {
    credentials: "include",
  }).then((res) => {
    if (`${res.status}`.startsWith("4")) {
      return Promise.reject(res);
    }
    return res.json();
  });
};

export const updateGrantInfo = async function (values) {
  return request.Post(`/grant/updateGrant`, values);
};
export const getGrantVestingScheduleInfo = async function (grantId) {
  return fetch(`${host}/grant/vestingSchedule?grantId=${grantId}`, {
    credentials: "include",
  }).then((res) => {
    if (`${res.status}`.startsWith("4")) {
      return Promise.reject(res);
    }
    return res.json();
  });
};

export const getGrantSignInfo = async function (projectId, grantId) {
  return request(`${host}/grant/${grantId}/sign`);
};

export const postGrantSignInfo = async function (
  projectId,
  grantId,
  grantSignId,
  sign
) {
  const params = new URLSearchParams();
  params.append("grantSignId", grantSignId);
  params.append("sign", sign);
  return fetch(`${host}/grant/${grantId}/sign`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: params,
    credentials: "include",
  }).then((res) => res.json());
};

export const getDashboardOverview = async function (projectId, userId) {
  return request(`${host}/dashboard/${projectId}/user/${userId}/overView`);
};

export const getDashboardGrants = async function (projectId, userId) {
  return request(`${host}/dashboard/${projectId}/user/${userId}/grants`);
};

export const getTokenDist = async function (projectId) {
  return request(`${host}/projects/${projectId}/tokenDist`);
};

export const getAllocatPlan = async function (projectId) {
  return request(`${host}/projects/${projectId}/allocPlan`);
};
export const updateAllocationPlan = async function (projectId, values) {
  return request.Post(`${host}/projects/${projectId}/updateAlloc`, values);
};
export const getDilutedToken = async function (projectId) {
  return request(`${host}/projects/${projectId}/dilutedToken`);
};
export const addGrantRecord = async function (projectId, values) {
  return request.Post(`${host}/projects/${projectId}/addGrantRecord`, values);
};
export const getGrantRecordList = async function (projectId) {
  return request(`${host}/projects/${projectId}/grantRecordList`);
};

export const getTemplate = async function (tags = []) {
  return fetch(`${host}/projects/templateList?tags=${tags.join(",")}`).then(
    (res) => res.json()
  );
};

export const getTags = async function () {
  return fetch(`${host}/projects/tagList`).then((res) => res.json());
};
export const getTemplateDetail = async function (templateId) {
  return fetch(`${host}/projects/template?templateId=${templateId}`).then(
    (res) => res.json()
  );
};
