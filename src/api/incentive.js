import request from "./request";

export const getIncentiveList = async function (projectId) {
    return request(`/projects/${projectId}/tips`)
};

export const getTIPInfo = async function (incentivePlanId) {
    return request(`/tip/tipInfo?incentivePlanId=${incentivePlanId}`)
};

export const getTipGrantees = async function (incentivePlanId) {
    return request(`/tip/grantees?incentivePlanId=${incentivePlanId}`)
};

export const getProjectUsers = async function (projectId) {
    return request(`/projects/${projectId}/users`)
}
export const addProjectUser = async function(projectId, values){
    return request.Post(`/projects/${projectId}/userAdd`, values)
}

export const getTipGrantList = async function (incentivePlanId) {
    return request(`/grant/${incentivePlanId}/grants`)
};

export const createTIP = async function (values) {
    return request.Post(`/tip/addTip?projectId=${values.projectId}`, values)
};

export const addGrant = async function (incentivePlanId, values) {
    return request.Post(`/grant/addGrant?incentivePlanId=${incentivePlanId}`,values)
}

export const getGrantInfo = async function(grantId) {
    return request(`/grant/grantInfo?grantId=${grantId}`)
}

export const getGrantSignInfo = async function(projectId, grantId) {
    return request(`/grant/${grantId}/sign`)
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