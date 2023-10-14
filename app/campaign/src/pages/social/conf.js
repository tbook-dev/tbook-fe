export const redirectLocalStorageOnce = (
  navigate,
  key = "redirect_url",
  defualtUrl = "/"
) => {
  const redirect = localStorage.getItem(key);
  if (redirect != null) {
    localStorage.removeItem(key);
    location.href = redirect;
  } else {
    navigate(defualtUrl);
  }
};

export const delay = (ms) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });
