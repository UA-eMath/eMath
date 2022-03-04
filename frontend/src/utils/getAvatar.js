export function generateRandomAvatar(name) {
  return "https://ui-avatars.com/api/?background=random&name=" + name;
}

export const getAvatarSource = (name) => {
  return localStorage.getItem("avatar") ?? generateRandomAvatar(name);
};
