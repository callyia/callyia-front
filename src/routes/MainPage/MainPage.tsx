import React, { useState, useEffect } from "react";

import "./MainPage.css";

interface MainPageProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const Main: React.FC<MainPageProps> = () => {
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

  return (
    <div className="main-container">
      <main className="content">
        <div className="main-section-container">
          <section className="main-section-div" style={{ marginRight: "30%" }}>
            <h2>여행 정보</h2>
            <h3>여행 정보 1</h3>
            <table>
              <tr>
                <td>
                  <a href="/ListPage">ListPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/MyProfilePage">MyProfilePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/PlanningPage">PlanningPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SchedulePage">SchedulePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignInPage">SignInPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignUpPage">SignUpPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/TourPage">TourPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/UserProfilePage">UserProfilePage</a>
                </td>
              </tr>
            </table>
            <h4>subTitle : subtitle</h4>
            <img src="/topbar-logo.png" alt="Logo" className="header-logo" />
          </section>
          <img
            src="/logo192.png"
            alt="Logo"
            className="main-margin-image"
            style={{ marginLeft: "-200px", marginRight: "200px" }}
          />
        </div>
        <div className="main-section-container">
          <img
            src="/logo192.png"
            alt="Logo"
            className="main-margin-image"
            style={{ marginLeft: "200px", marginRight: "-200px" }}
          />
          <section className="main-section-div" style={{ marginLeft: "30%" }}>
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
            <img src="/topbar-logo.png" alt="Logo" className="header-logo" />
          </section>
        </div>
        <div className="main-section-container">
          <section className="main-section-div" style={{ marginRight: "30%" }}>
            <h2>여행 공유 커뮤니티</h2>
            <h3>Title : 여행 공유 커뮤니티1</h3>
            <h4>subTitle : subtitle</h4>
            <img src="/topbar-logo.png" alt="Logo" className="header-logo" />
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
