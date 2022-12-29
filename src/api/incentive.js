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

export const getGrantInfo = async function(grantId) {
    return fetch(`/grant/grantInfo?grantId=${grantId}`, {
        method: "GET"
    }).then(res => res.json())
}

export const getGrantSignInfo = async function(projectId, grantId) {
    return fetch(`/grant/${grantId}/sign`, {
        credentials: "include",
        method: "GET"
    }).then(res => res.json())
}

export const postGrantSignInfo = async function(projectId, grantId, grantSignId, sign) {
    const params = new URLSearchParams()
    params.append("grantSignId", grantSignId)
    params.append("sign", sign)
    return fetch(`/grant/${grantId}/sign`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        body: params
    }).then(res => res.json())
}