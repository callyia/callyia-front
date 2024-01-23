import React, { useState, useEffect  } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SearchBar from "./SearchBar";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCombo, setSearchCombo] = useState("user");


  // 의존성으로 navigate를 넣긴했는데 token의 유무 변화에 따라 useEffect가 실행되도록 작성해야한다.
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, [navigate]);
  
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
  // token이 있으면 로그아웃과 myprofile이 나오고 token이 없으면 sign in 버튼이 나오도록 하기


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

      {isLoggedIn ? (
        <>
          <button className={getButtonClassName("header-action-button-2 header-action-button")} onClick={goToMyProfilePage}>
            My Profile
          </button>
          <button className={getButtonClassName("header-action-button-5 header-action-button")} onClick={goToLogout}>
            Logout
          </button>
        </>
      ) : (
      <> 
        <button className={getButtonClassName("header-action-button-2 header-action-button")} onClick={goToSignInPage}>
          Sign In
        </button>
        <button className={getButtonClassName("header-action-button-4 header-action-button")} onClick={goToSignUpPage}>
          Sign Up
        </button>
      </>
      )}
      
    </header>
  );
}
