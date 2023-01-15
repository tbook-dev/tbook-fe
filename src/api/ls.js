// 如果是从`/incentive/grant/tmp/create`来创建页面，那么tipId就是tmp
const getDraftGrantDataLSKey = (projectId, tipId) =>
  `_draftDataLSKey_${projectId}_${tipId}`;

export function getDraftGrantData(projectId, tipId) {
  const key = getDraftGrantDataLSKey(projectId, tipId);
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    clearDraftGrantData(projectId, tipId)
    console.log(error);
  }
  return data;
}

export function saveDraftGrantData(projectId, tipId, data) {
  const key = getDraftGrantDataLSKey(projectId, tipId);
  localStorage.setItem(key, JSON.stringify(data));
}

export function clearDraftGrantData(projectId, tipId) {
  const key = getDraftGrantDataLSKey(projectId, tipId);
  localStorage.removeItem(key);
}

const currentProjectId = "__currentProjectId";
export function getCurrentProjectId() {
  let id = null;
  try {
    id = JSON.parse(localStorage.getItem(currentProjectId));
  } catch (error) {
    localStorage.clear(currentProjectId)
    console.log(error);
  }
  return id;
}

export function saveCurrentProjectId(id) {
  localStorage.setItem(currentProjectId, id);
}
