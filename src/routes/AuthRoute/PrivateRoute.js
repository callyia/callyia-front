import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { getUserAuthorities } from "./authService";

const PrivateRoute = ({ element, children }) => {
  const navigate = useNavigate();
  const userAuthoritiesString = getUserAuthorities();
  let userAuthorities = [];

  try {
    userAuthorities = JSON.parse(userAuthoritiesString);
  } catch (error) {
    console.error("Error parsing userAuthorities:", error);
  }

  console.log(
    userAuthorities.some((authority) => authority.authority === "ROLE_USER")
  );

  if (
    !userAuthorities.some(
      (authority) =>
        authority.authority === "ROLE_USER" ||
        authority.authority === "ROLE_ADMIN"
    )
  ) {
    // 권한이 없는 경우 SignInPage로 이동
    return <Navigate to="/SignInPage" />;
  }

  // 권한이 있는 경우 해당 페이지로 이동
  return (
    <Routes>
      <Route element={element}>{children}</Route>
    </Routes>
  );
};

export default PrivateRoute;
