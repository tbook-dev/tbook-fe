const headers = {
  'content-type': 'application/json'
}
export const getIncentiveList = async function () {
  return fetch(`/api/tiplist`)
    .then((res) => res.json())
    .then((res) => res.data);
};

export const getTIPInfo = async function (incentivePlanId) {
  return fetch(`/api/tipInfo?incentivePlanId=${incentivePlanId}`)
    .then((res) => res.json())
};

export const getTipGrantList = async function (incentivePlanId) {
  return fetch(``);
};

export const createTIP = async function(values){
  return fetch(`/tip/addTip?projectId=${values.projectId}`, {headers, method: 'POST', body: JSON.stringify(values)})
    .then(res => res.json())
}