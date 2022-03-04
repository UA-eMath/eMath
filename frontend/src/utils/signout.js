export const signOut = () => {
  const auth2 = window.gapi.auth2.getAuthInstance();
  if (auth2 != null) {
    auth2.signOut().then(auth2.disconnect().then(onLogoutSuccess()));
  } else {
    onLogoutSuccess();
  }
};

export function onLogoutSuccess() {
  localStorage.clear();
  window.location.href = "/";
}
