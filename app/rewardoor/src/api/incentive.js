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
  return await request.Post(`${host}/campaignNew/createCampaign`, values);
};
export const updateCampaign = async function (values) {
  return await request.Post(`${host}/campaign/update`, values);
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

export const getCredentials = async function (campaignId) {
  // return await request(`${host}/campaignNew/project/${projectId}`);
  return await request(`${host}/campaignNew/project/${campaignId}`);
  return [
    {
      // credentialList: [
      //   {
      //     credentialId: 0,
      //     name: "Like a Tweet",
      //     nameExp: "Like <%= link %> on Twitter",
      //     labelType: 1,
      //     link: "",
      //     picUrl:
      //       "https://rd-worker.xgamma.workers.dev/img/328d2ceabec948999d82c24888877b72",
      //     projectId: 227593240761,
      //     creatorId: 153284940002,
      //     groupId: 0,
      //     groupType: 2,
      //     spaceId: "",
      //     campaignId: 0,
      //     isVerified: 0,
      //     giveAway: 0,
      //     eligibleCount: 0,
      //     tipText: "Tweet Link",
      //     placeHolder: "Paste tweet link here",
      //     roleId: 0,
      //     roleName: "",
      //     template:
      //       "<p class='text-sm lg:text-base font-medium '>\n        %s %s\n                    </p >",
      //     templateExp:
      //       "<p class='text-sm lg:text-base font-medium '> <a href='' style='color:#1D9BF0' class='underline' target='_blank'> Like </a> <%= userName %> on Twitter </p>",
      //     display:
      //       "<p class='text-sm lg:text-base font-medium '>\n        <a href='' style='color:#1D9BF0' class='underline' target='_blank'>Like</a> \n                    </p >",
      //     displayExp:
      //       "<p class='text-sm lg:text-base font-medium '> <a href='' style='color:#1D9BF0' class='underline' target='_blank'> Like </a>  on Twitter </p>",
      //   },
      //   {
      //     credentialId: 1,
      //     name: "Twitter Retweet",
      //     nameExp: "Retweet <%= link %> on Twitter",
      //     labelType: 2,
      //     link: "",
      //     picUrl:
      //       "https://rd-worker.xgamma.workers.dev/img/328d2ceabec948999d82c24888877b72",
      //     projectId: 227593240761,
      //     creatorId: 153284940002,
      //     groupId: 0,
      //     groupType: 2,
      //     spaceId: "",
      //     campaignId: 0,
      //     isVerified: 0,
      //     giveAway: 0,
      //     eligibleCount: 0,
      //     tipText: "Tweet Link",
      //     placeHolder: "Paste tweet link here",
      //     roleId: 0,
      //     roleName: "",
      //     template:
      //       "<p class='text-sm lg:text-base font-medium '>\n        %s %s\n                    </p >",
      //     templateExp:
      //       "<p class='text-sm lg:text-base font-medium '> <a href='' style='color:#1D9BF0' class='underline' target='_blank'> Retweet </a > <%= userName %> on Twitter </p>",
      //     display:
      //       "<p class='text-sm lg:text-base font-medium '>\n        <a href='' style='color:#1D9BF0' class='underline' target='_blank'>Retweet</a> \n                    </p >",
      //     displayExp:
      //       "<p class='text-sm lg:text-base font-medium '> <a href='' style='color:#1D9BF0' class='underline' target='_blank'> Retweet </a >  on Twitter </p>",
      //   },
      //   {
      //     credentialId: 2,
      //     name: "Speak in Twitter Spaces",
      //     nameExp: "Speak <%= link %> on Twitter",
      //     labelType: 3,
      //     link: "",
      //     picUrl:
      //       "https://rd-worker.xgamma.workers.dev/img/328d2ceabec948999d82c24888877b72",
      //     projectId: 227593240761,
      //     creatorId: 153284940002,
      //     groupId: 0,
      //     groupType: 2,
      //     spaceId: "",
      //     campaignId: 0,
      //     isVerified: 0,
      //     giveAway: 0,
      //     eligibleCount: 0,
      //     tipText: "Tweet Space Link",
      //     placeHolder: "Paste twitter space link here",
      //     roleId: 0,
      //     roleName: "",
      //     template:
      //       "<p class='text-sm lg:text-base font-medium '>\n        %s %s\n                    </p >",
      //     templateExp:
      //       "<p class='text-sm lg:text-base font-medium '> <a href='' style='color:#1D9BF0' class='underline' target='_blank'> Join </a > Space <%= startAt %> on Twitter </p>",
      //     display:
      //       "<p class='text-sm lg:text-base font-medium '>\n        <a href='' style='color:#1D9BF0' class='underline' target='_blank'>Attend</a> Space\n                    </p >",
      //     displayExp:
      //       "<p class='text-sm lg:text-base font-medium '> <a href='' style='color:#1D9BF0' class='underline' target='_blank'> Join </a > Space  on Twitter </p>",
      //   },
      // ],
      groupType: 2,
      name: "Community",
      id: 1,
      projectId: 0,
      creatorId: 153284940002,
      campaignId: 0,
      status: 0,
      nftList: [],
      pointList: [],
      credentialList: [
        {
          credentialId: 0,
          name: "Like a Tweet",
          picUrl:
            "https://rd-worker.xgamma.workers.dev/img/328d2ceabec948999d82c24888877b72",
          list: [
            {
              name: "link",
              label: "Tweet Link",
              component: "Input",
              componentProps: {
                placeholder: "Paste tweet link here",
              },
              rules: [
                {
                  required: true,
                  message: "Please input your tweet link",
                },
                {
                  type: "url",
                  message: "Please input a valid url",
                },
              ],
            },
          ],
          templateExp:
            "<p class='text-sm lg:text-base font-medium '> <a href='<%= link %>' style='color:#1D9BF0' class='underline' target='_blank'> Like </a> @<%= userName %> </p>",
          displayExp: "",
        },
        {
          credentialId: 1,
          name: "Twitter Retweet",
          picUrl:
            "https://rd-worker.xgamma.workers.dev/img/328d2ceabec948999d82c24888877b72",
          list: [
            {
              name: "link",
              label: "Tweet Link",
              component: "Input",
              componentProps: {
                placeholder: "Paste tweet link here",
              },
              rules: [
                {
                  required: true,
                  message: "Please input your tweet link",
                },
                {
                  type: "url",
                  message: "Please input a valid url",
                },
              ],
            },
          ],
          templateExp:
            "<p class='text-sm lg:text-base font-medium '> <a href='<%= link %>' style='color:#1D9BF0' class='underline' target='_blank'> Retweet </a > @<%= userName %> </p>",
          displayExp: "",
        },
        {
          credentialId: 2,
          name: "Speak in Twitter Spaces",
          picUrl:
            "https://rd-worker.xgamma.workers.dev/img/328d2ceabec948999d82c24888877b72",
          list: [
            {
              name: "link",
              label: "Tweet Space Link",
              component: "Input",
              componentProps: {
                placeholder: "Paste twitter space link here",
              },
              rules: [
                {
                  required: true,
                  message: "Please input your tweet link",
                },
                {
                  type: "url",
                  message: "Please input a valid url",
                },
              ],
            },
          ],
          templateExp:
            "<p class='text-sm lg:text-base font-medium '> <a href='<%= link %>' style='color:#1D9BF0' class='underline' target='_blank'> Attend </a > Space <%= startAt %> Space </p>",
          displayExp: "",
        },
        {
          credentialId: 3,
          name: "Join a Discord Server",
          picUrl:
            "https://rd-worker.xgamma.workers.dev/img/b131909663804355a5ae1ffbdcbbc099",
          list: [
            {
              name: "link",
              label: "Discord Server URL",
              component: "Input",
              componentProps: {
                placeholder: "https://discord.gg/xxxx",
              },
              rules: [
                {
                  required: true,
                  message: "Please input the Discord Server URL",
                },
                {
                  type: "url",
                  message: "Please input a valid url",
                },
              ],
            },
          ],
          templateExp:
            "<p class='text-sm lg:text-base font-medium '> <a href='<%= link %>' style='color:#1D9BF0' class='underline' target='_blank'> Join </a > <%= serverName %>  Discord Server </p>",
          displayExp: "",
        },
        {
          credentialId: 4,
          name: "Verify Discord Role",
          picUrl:
            "https://rd-worker.xgamma.workers.dev/img/b131909663804355a5ae1ffbdcbbc099",
          templateExp:
            "<p class='text-sm lg:text-base font-medium '> <a href='<%= link %>' style='color:#1D9BF0' class='underline' target='_blank'> Have </a > <%= roleName %> in <%= serverName %> Discord Server </p>",
          displayExp: "",
          list: [
            {
              component: "HTML",
              html: "<a style='color:#1D9BF0' class='underline' href='https://app.gitbook.com/o/XmLEuzCUK0IIbhY5X44k/s/xLOTfURQ4EC9jmYQjFob/how-to-get-role-id-in-discord' target='_blank'>How to get Role ID in Discord</a>",
            },
            {
              name: "link",
              label: "Discord Server URL",
              component: "Input",
              componentProps: {
                placeholder: "https://discord.gg/xxxx",
              },
              rules: [
                {
                  required: true,
                  message: "Please input the Verify Discord Role",
                },
                {
                  type: "url",
                  message: "Please input a valid url",
                },
              ],
            },
            {
              name: "roleId",
              label: "Role ID",
              component: "Input",
              componentProps: {
                placeholder: "Enter Role ID",
              },
              rules: [
                {
                  required: true,
                  message: "Please input the Role ID",
                },
              ],
            },
            {
              name: "roleName",
              label: "Role Name",
              component: "Input",
              componentProps: {
                placeholder: "Enter Role Name",
              },
              rules: [
                {
                  required: true,
                  message: "Please input the Role Name",
                },
              ],
            },
          ],
        },
        {
          credentialId: 5,
          name: "Join Telegram Group",
          picUrl:
            "https://rd-worker.xgamma.workers.dev/img/0a237e567bf2472a838b98086e3dae08",
          list: [
            {
              component: "HTML",
              html: "<p>Add TBOOK support bot as an admin to your group or channel</p> <a href='https://t.me/tbook_sign_bot' style='color:#1D9BF0' class='underline' target='_blank'> Invite bot </a >",
            },
            {
              name: "link",
              label: "Group Invite Link",
              component: "Input",
              componentProps: {
                placeholder:
                  "Please paste the invite link to your telegram group",
              },
              rules: [
                {
                  required: true,
                  message: "Please input the invite link",
                },
                {
                  type: "url",
                  message: "Please input a valid url",
                },
              ],
            },
          ],
          templateExp:
            "<p class='text-sm lg:text-base font-medium '> <a href='<%= link %>' style='color:#1D9BF0' class='underline' target='_blank'> Join </a > <%= telegramGroup %> Telegram Group </p>",
          displayExp: "",
        },
        {
          credentialId: 6,
          name: "Join Telegram Channel",
          picUrl:
            "https://rd-worker.xgamma.workers.dev/img/0a237e567bf2472a838b98086e3dae08",
          list: [
            {
              component: "HTML",
              html: "<p>Add TBOOK support bot as an admin to your group or channel</p> <a href='https://t.me/tbook_sign_bot' style='color:#1D9BF0' class='underline' target='_blank'> Invite bot </a >",
            },
            {
              name: "link",
              label: "Channel Invite Link",
              component: "Input",
              componentProps: {
                placeholder:
                  "Please paste the invite link to your telegram channel",
              },
              rules: [
                {
                  required: true,
                  message: "Please input the invite link",
                },
                {
                  type: "url",
                  message: "Please input a valid url",
                },
              ],
            },
          ],
          templateExp:
            "<p class='text-sm lg:text-base font-medium '> <a href='<%= link %>' style='color:#1D9BF0' class='underline' target='_blank'> </a > @<%= telegramChannel %> Telegram Channel </p>",
          displayExp: "",
        },
      ],
    },
  ];
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
export const parseLinkParams = function (values) {
  return request.Post(`${host}/twitter/getInfo`, values);
};
export const getCampaignParticipation = async function (campaignId) {
  return await request(`${host}/campaignNew/participation/${campaignId}`);
};
// export const getPoint = async function (projectId) {
//   return await request(`${host}/project/stats/${projectId}/points`);
// };
export const getAsset = async function (projectId) {
  return await request(`${host}/asset/asset/${projectId}`);
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
