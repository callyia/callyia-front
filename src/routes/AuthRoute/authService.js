export const getUserAuthorities = () => {
  const authorities = localStorage.getItem("authorities");
  return authorities ? authorities.split(",") : [];
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authorities");
};
