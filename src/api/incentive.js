const headers = {
    "content-type": "application/json",
};

export const getIncentiveList = async function (projectId) {
    return fetch(`/projects/${projectId}/tips`).then((res) => res.json());
};

export const getTIPInfo = async function (incentivePlanId) {
    return fetch(`/tip/tipInfo?incentivePlanId=${incentivePlanId}`).then((res) =>
        res.json()
    );
};

export const getTipGrantees = async function (incentivePlanId) {
    return fetch(`/tip/grantees?incentivePlanId=${incentivePlanId}`).then((res) =>
        res.json()
    );
};

export const getProjectUsers = async function (projectId) {
    return fetch(`/projects/${projectId}/users`).then(res => res.json())
}

export const getTipGrantList = async function (incentivePlanId) {
    return fetch(`/grant/${incentivePlanId}/grants`).then(res => res.json());
};

export const createTIP = async function (values) {
    return fetch(`/tip/addTip?projectId=${values.projectId}`, {
        headers,
        method: "POST",
        body: JSON.stringify(values),
    }).then((res) => {
        return res.text();
    });
};

export const addGrant = async function (incentivePlanId, values) {
    return fetch(`/grant/addGrant?incentivePlanId=${incentivePlanId}`, {
        headers,
        method: "POST",
        body: JSON.stringify(values)
    }).then(res => res.json())
}
