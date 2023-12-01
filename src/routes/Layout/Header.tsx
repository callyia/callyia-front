import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SearchBar from "./SearchBar";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCombo, setSearchCombo] = useState("user");

  const goToSignInPage = () => {
    navigate("/SignInPage");
  };

  const goToSignUpPage = () => {
    navigate("/SignUpPage");
  };

  const goToMyProfilePage = () => {
    navigate("/MyProfilePage");
  };

  const goToUserProfilePage = () => {
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
    if (event.key === "Enter") {
      navigate(`/ListPage?searchcombo=${searchCombo}&searchkeyword=${searchKeyword}`);
    }
  };

  const renderSearchBar = () => {
    if (location.pathname === "/" || location.pathname === "/MyProfilePage" || location.pathname === "/UserProfilePage") {
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

  return (
    <header className="header">
      <div className="header-top-bar">
        <a href="/">
          <img src="/topbar-logo.png" alt="Logo" className="header-logo" />
        </a>
        {renderSearchBar()}
        <div></div>
      </div>
      <button className="header-action-button" onClick={toggleBtn}>
        toggle btn
      </button>
      <button className="header-action-button" onClick={handleProfileButtonClick}>
      {isLoggedIn ? "My Profile" : "Sign In"}
      </button>
      <button className="header-action-button" onClick={goToUserProfilePage}>
        User Profile
      </button>
      <button className="header-action-button" onClick={goToSignUpPage}>
        Sign Up
      </button>
    </header>
  );
}
