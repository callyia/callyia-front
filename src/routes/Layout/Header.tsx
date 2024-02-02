import React, { useState, useEffect  } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { MdEditDocument } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";

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
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('authorities');
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
  
  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchKeyword.trim() !== "") {
      navigate(`/ListPage?searchcombo=${searchCombo}&searchkeyword=${searchKeyword}`);
      window.location.reload();
    }
  };

  const renderSearchBar = () => { 
    const allowPath = ["/", "/MyProfilePage", "/UserProfilePage", "/ListPage", "/ScheduleListPage", 
    "/TourPage/Food", "/TourPage/Tourist", "/SchedulePage/:sno", "/CartPage", "/PlanningPage"]; // 헤더바 검색창 허용 페이지

      if(allowPath.includes(location.pathname)) {
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

            { isLoggedIn ? (
              <>
                <div className="header-button-container" style={{cursor:"pointer"}} onClick={goToMyProfilePage}>
                  <FaRegUserCircle className="header-button" />
                  <span className="header-button-message">Profile</span>
                </div>
                <div className="header-button-container" style={{cursor:"pointer"}} onClick={goToLogout}>
                  <HiOutlineLogout className="header-button" />
                  <span className="header-button-message" >Logout</span>
                </div>
              </>
                ) : (
              <>
                <div className="header-button-container" style={{cursor:"pointer"}} onClick={goToSignInPage}>
                  <HiOutlineLogin className="header-button" />
                  <span className="header-button-message">SignIn</span>
                </div>
                <div className="header-button-container" style={{cursor:"pointer"}} onClick={goToSignUpPage}>
                  <MdEditDocument className="header-button" />
                  <span className="header-button-message">SignUp</span>
                </div>
              </>)
      }

      </header>
  );
}
