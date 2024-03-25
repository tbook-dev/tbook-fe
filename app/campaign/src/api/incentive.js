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
  // console.log("status:", response.status);
  // response.text().then((b) => console.log("body", b));
  // response.headers.forEach((value, key) => {
  //   console.log(key, value);
  // });
  // console.log(document.cookie);
  // await new Promise(r => {
  //   setTimeout(r, 10000)
  // })
  return await response.json();
};
export const getUserInfo = async function () {
  return await request(`${host}/info`);
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
  // window.location = data["url"];
  window.open(data['url'], '_self');
  // const a = document.createElement("a");
  // document.body.appendChild(a);
  // a.style = "display: none";
  // a.href = data["url"];
  // a.setAttribute("target", "_self");
  // a.setAttribute("mc-deep-link", "false");
  // a.setAttribute("ref", "nofollow noopener noreferrer");
  // // rel='nofollow noopener noreferrer'
  // a.click();
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

// export const authTgCallback = async function () {
//   const url = new URL(window.location.href);
//   let authResult = url.searchParams.get("tgAuthResult");
//   if (!authResult) {
//     authResult = url.hash.split("=")[1];
//   }
//   return await request.PostFormV1(`${host}/tg/callback`, {
//     originAuthResult: authResult,
//   });
// };

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

export const mergeTwitterAndAddressAccount = async function (data) {
  return await request.PostFormV1(`${host}/twitter/merge`, data);
};

export const getTopProjects = async function () {
  return [
    {
      projectId: 339953921867,
      projectName: 'lake',
      projectUrl: 'lake',
      avatarUrl:
        'https://rd-worker.xgamma.workers.dev/img/50312612a97b4556a9064714b4fae7d0',
      creatorId: 153284940002,
      tags: ['NFT'],
      projectDescription:
        '<ol>\n<li><a title="tbook link" href="https://tbook.com" target="_blank" rel="noopener">Move </a>is an open source language for writing safe packages to manipulate on-chain objects (sometimes referred to as "smart contracts"). Move is a platform-agnostic language to enable common libraries, tooling, and developer communities across blockchains with vastly different data and execution models. Move is adaptable to meet the needs of theblockchain the code operates on, see Move on Sui to review enahancements made to Move for optimization on the <a href="https://tbook.com">Sui blockchain</a>. You can use Move to define, create, and manage programmable Sui objects representing user-level assets. Sui\'s object system is implemented by adding new functionality to Move while also imposing additional restrictions. <strong>See Object Model for more details.</strong></li>\n<li><strong>&nbsp;2222</strong></li>\n<li><strong>&nbsp;2222</strong></li>\n<li><strong>sddasd</strong></li>\n<li><strong>2233</strong></li>\n</ol>\n<p>&nbsp;</p>\n<ol style="list-style-type: lower-alpha;">\n<li>asdd</li>\n<li>asdasd</li>\n<li>ccc</li>\n<li>&nbsp;</li>\n<li>cccccc</li>\n<li style="--tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-scroll-snap-strictness: proximity; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgb(59 130 246 / 0.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000;">asd</li>\n</ol>\n<p><img src="https://rd-worker.xgamma.workers.dev/img/5b79f126aa9642bf8838f4bc8f625cdf" alt="" width="2546" height="1432"></p>\n<p>&nbsp;</p>\n<p><img src="https://rd-worker.xgamma.workers.dev/img/04f5567b5cb1487ab0fb11c2f95cfd65" alt="" width="1200" height="1200"></p>',
      websiteUrl: '',
      telegramUrl: '',
      twitterLink: '',
      telegramLink: '',
      evmRequire: false,
      campaigns: [
        {
          campaign: {
            campaignId: 340804601868,
            title: 'dddd',
            name: 'dddd',
            picUrl:
              'https://rd-worker.xgamma.workers.dev/img/11ee3bb25d754026a7fab3b83523700d',
            description: 'ddddd',
            startAt: 1703846835000,
            endAt: 1704538038000,
            status: 3,
            reward: '',
            rewardAction: '',
            projectId: 339953921867,
            creatorId: 153284940002,
            points: 1,
            credentialId: 0,
            nft: 0,
            createTime: '2023-12-30T10:47:40Z',
            credentials: [],
            spaceId: 0,
            participantNum: 0,
            uniName: 'dddd',
          },
          groups: [
            {
              groupType: 2,
              name: '',
              id: 340804601869,
              credentialList: [
                {
                  credentialId: 340804601870,
                  name: 'Like a Tweet',
                  nameExp: 'Like <%= link %>',
                  labelType: 1,
                  link: 'https://twitter.com/jamesm/status/1686731419416989697sss',
                  picUrl:
                    'https://rd-worker.xgamma.workers.dev/img/2d298a6a69844ac5a58c1963588a3293',
                  projectId: 339953921867,
                  creatorId: 0,
                  groupId: 340804601869,
                  groupType: 2,
                  spaceId: '1686731419416989697sss',
                  campaignId: 340804601868,
                  isVerified: 0,
                  giveAway: 0,
                  eligibleCount: 0,
                  tipText: '',
                  placeHolder: '',
                  roleId: 0,
                  roleName: '',
                  visitPageName: '',
                  proposalId: '',
                  title: '0',
                  description: '',
                  options:
                    '{"userName":"jamesm","link":"https://twitter.com/jamesm/status/1686731419416989697sss","intentLink":"https://twitter.com/intent/like?tweet_id\\u003d1686731419416989697sss"}',
                },
              ],
              projectId: 339953921867,
              creatorId: 0,
              campaignId: 340804601868,
              status: 1,
              nftList: [],
              pointList: [
                {
                  pointId: 340804611871,
                  number: 4,
                  methodType: 1,
                  unlimited: true,
                  rewardNum: 0,
                  projectId: 339953921867,
                  creatorId: 0,
                  groupId: 340804601869,
                  claimedType: 0,
                  claimedDate: null,
                  campaignId: 0,
                  campaignName: '',
                },
              ],
              tokenList: [],
            },
          ],
          participation: null,
          participantNum: 2,
        },
      ],
    },
  ];
};
export const disConnectAccount = async function (data) {
  return await request.PostFormV1(`${host}/social/unbind`, data);
};
