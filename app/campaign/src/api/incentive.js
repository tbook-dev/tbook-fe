import request from "./request";

export const host = import.meta.env.VITE_API_HOST;

export const getUserInfo = async function () {
  return request(`${host}/info`);
};

export const getCampaignDetail = async function (id) {
  return await request(`${host}/campaignNew/${id}`);
};
