const getDraftTipDataLSKey = (projectId) => `_draftDataLSKey_${projectId}`;

export function getDraftTipData(projectId) {
  const key = getDraftTipDataLSKey(projectId);
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log(error);
  }
  return data;
}

export function saveDraftTipData(projectId, data) {
  const key = getDraftTipDataLSKey(projectId);
  localStorage.setItem(key, JSON.stringify(data));
}
