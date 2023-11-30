import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import "./MainPage.css";

interface MainPageProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

// const Main: React.FC<MainPageProps> = ({ isLoggedIn, toggleLogin }) => {
const Main: React.FC<MainPageProps> = () => {
  // const navigate = useNavigate();
  // const [searchKeyword, setSearchKeyword] = useState("");
  // const [searchCombo, setSearchCombo] = useState("user");
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        // 실제 사용할 때는 크기봐서 조절해야할 듯
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     navigate(
  //       `/SignUpPage?searchcombo=${searchCombo}&searchkeyword=${searchKeyword}`,
  //       { state: { searchKeyword } }
  //     );
  //   }
  // };

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchKeyword(event.target.value);
  // };

  // const handleComboChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSearchCombo(event.target.value);
  // };

  // const getPlaceholder = () => {
  //   switch (searchCombo) {
  //     case "user":
  //       return "여행친구를 검색하세요!";
  //     case "location":
  //       return "가고 싶은 곳에 대한 정보를 드리겠습니다";
  //     case "schedule":
  //       return "아름다운 여행 일정을 만들기 위해 참고하세요";
  //   }
  // };

  return (
    <div className="main-container">
      {/* <header className="header">
        <div className="top-bar">
          <a href="/">
            <img src="/topbar-logo.png" alt="Logo" className="logo" />
          </a>
          <div className="search-bar">
            <select onChange={handleComboChange} className="search-dropdown">
              <option value="user">유저</option>
              <option value="location">장소</option>
              <option value="schedule">일정</option>
            </select>
            <input
              type="text"
              className="search-input"
              placeholder={getPlaceholder()}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-section">
            <h2 onClick={toggleLogin}>프로필 자리</h2>
            {isLoggedIn ? (
              <button>My profile</button>
            ) : (
              <>
                <button>로그인</button>
                <button>회원가입</button>
              </>
            )}
          </div>
        </div>
      </header> */}
      <main className="content">
        <div className="section-container">
          <section className="section-div" style={{ marginRight: "30%" }}>
            <h2>여행 정보</h2>
            <h3>여행 정보 1</h3>
            <table>
              <tr>
                <td>subTitle : subtitle</td>
                <td>subTitle : subtitle</td>
              </tr>
              <tr>
                <td>subTitle : subtitle</td>
                <td>subTitle : subtitle</td>
              </tr>
            </table>
            <h4>subTitle : subtitle</h4>
            <img src="/topbar-logo.png" alt="Logo" className="logo" />
          </section>
          <img
            src="/logo192.png"
            alt="Logo"
            className="main-margin-image"
            style={{ marginLeft: "-200px", marginRight: "200px" }}
          />
        </div>
        <div className="section-container">
          <img
            src="/logo192.png"
            alt="Logo"
            className="main-margin-image"
            style={{ marginLeft: "200px", marginRight: "-200px" }}
          />
          <section className="section-div" style={{ marginLeft: "30%" }}>
            <h2>여행 계획</h2>
            <h1>
              <a href="/SchedulePage">Schedule</a>
            </h1>
            <h3>여행 계획 1</h3>
            <h4>subTitle : subtitle</h4>
            <input
              type="text"
              className="trip-plan-input"
              placeholder="여행 계획을 입력하세요!"
            />
            <img src="/topbar-logo.png" alt="Logo" className="logo" />
          </section>
        </div>
        <div className="section-container">
          <section className="section-div" style={{ marginRight: "30%" }}>
            <h2>여행 공유 커뮤니티</h2>
            <h3>Title : 여행 공유 커뮤니티1</h3>
            <h4>subTitle : subtitle</h4>
            <img src="/topbar-logo.png" alt="Logo" className="logo" />
          </section>
          <img
            src="/logo192.png"
            alt="Logo"
            className="main-margin-image"
            style={{ marginLeft: "-200px", marginRight: "200px" }}
          />
        </div>
      </main>
      <button
        type="button"
        className="top-button"
        style={{ visibility: showTopButton ? "visible" : "hidden" }} // 스크롤이 조건이상 내려가면 보이게
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></button>
    </div>
  );
};

export default Main;
