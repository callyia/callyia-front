import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SearchBar from "./SearchBar";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCombo, setSearchCombo] = useState("user");


  const goToLogout = () => {
    setSearchKeyword("");
    localStorage.removeItem('token');
    navigate("/SignInPage");
  }
  const goToSignInPage = () => {
    setSearchKeyword("");
    navigate("/SignInPage");
  };

  const goToSignUpPage = () => {
    setSearchKeyword("");
    navigate("/SignUpPage");
  };

  const goToMyProfilePage = () => {
    setSearchKeyword("");
    navigate("/MyProfilePage");
  };

  const goToUserProfilePage = () => {
    setSearchKeyword("");
    navigate("/UserProfilePage");
  };

  const toggleBtn = () => {
    setLoggedIn((prevLoggedIn) => !prevLoggedIn);
  };

  const handleProfileButtonClick = () => {
    if (isLoggedIn) {
      goToMyProfilePage();
    } else {
      goToSignInPage();
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchKeyword.trim() !== "") {
      navigate(`/ListPage?searchcombo=${searchCombo}&searchkeyword=${searchKeyword}`);
    }
  };

  const renderSearchBar = () => {
    if (location.pathname === "/" || location.pathname === "/MyProfilePage" || location.pathname === "/UserProfilePage"
    || location.pathname === "/ListPage") {
      return (
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          searchCombo={searchCombo}
          setSearchCombo={setSearchCombo}
          onSearch={handleSearchKeyDown}
        />
      );
    }
    return null;
  };

  const getButtonClassName = (baseClass: string) => {
    return location.pathname === "/PlanningPage" ? `${baseClass}-fixed` : baseClass ;
  };

  return (
    <header className="header">
      <div className="header-top-bar">
        <a href="/">
          <img src="/topbar-logo.png" alt="Logo" className="header-logo" />
        </a>
        {renderSearchBar()}
        <div></div>
      </div>
      <button className={getButtonClassName("header-action-button-1 header-action-button")} onClick={toggleBtn}>
        toggle btn
      </button>
      <button className={getButtonClassName("header-action-button-2 header-action-button")} onClick={handleProfileButtonClick}>
      {isLoggedIn ? "Profile" : "Sign In"}
      </button>
      <button className={getButtonClassName("header-action-button-3 header-action-button")} onClick={goToUserProfilePage}>
        User Profile
      </button>
      <button className={getButtonClassName("header-action-button-4 header-action-button")} onClick={goToSignUpPage}>
        Sign Up
      </button>
      <button className={getButtonClassName("header-action-button-5 header-action-button")} onClick={goToLogout}>
        Logout
      </button>
    </header>
  );
}
