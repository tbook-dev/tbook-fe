const currentProjectId = "__currentProjectId";
export function getCurrentProjectId() {
  let id = null;
  try {
    id = JSON.parse(localStorage.getItem(currentProjectId));
  } catch (error) {
    localStorage.clear(currentProjectId);
    console.log(error);
  }
  return id;
}

export function saveCurrentProjectId(id) {
  localStorage.setItem(currentProjectId, id);
}

const themeKey = "__theme";
const themeList = ["dark", "light", "system"];
export function getCurrentTheme() {
  const storedTheme = localStorage.getItem(themeKey);
  if (themeList.includes(storedTheme)) {
    return storedTheme;
  } else {
    localStorage.setItem("themeKey", "dark");
    return "dark";
  }
}

export function setCurrentTheme(value) {
  if (!themeList.includes(value)) return;
  // if (value === "light") {
  //   document.documentElement.classList.remove("dark");
  // }
  // if (value === "dark") {
  //   document.documentElement.classList.add("dark");
  // }
  localStorage.setItem(themeKey, value);
}
