import request from "./request";

export const host = import.meta.env.VITE_API_HOST;

export const getUserInfo = async function () {
  return request(`${host}/info`);
};

export const getCampaignDetail = async function (id) {
  return await request(`${host}/campaignNew/${id}`);
};

export const verifyCredential = async function (credentialId) {
  return await request.Post(
    `${host}/campaignNew/credential/${credentialId}/verify`
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
