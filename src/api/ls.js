const getDraftGrantDataLSKey = (projectId, tipId) =>
  `_draftDataLSKey_${projectId}_${tipId}`;

export function getDraftGrantData(projectId, tipId) {
  const key = getDraftTipDataLSKey(projectId, tipId);
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log(error);
  }
  return data;
}

export function saveDraftGrantData(projectId, tipId, data) {
  const key = getDraftGrantDataLSKey(projectId, tipId);
  localStorage.setItem(key, JSON.stringify(data));
}

export function clearDraftGrantData(projectId, tipId){
  const key = getDraftGrantDataLSKey(projectId, tipId);
  localStorage.removeItem(key)
}
