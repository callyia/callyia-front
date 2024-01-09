import React, { useState, useEffect } from "react";

import axios from "axios";

import "./MainPage.css";

interface TourData {
  placeId: number;
  placeName: string;
  address: string;
  latitude: number;
  longitude: number;
  placeContent: string;
  checkColumn: string;
  image: string;
}

interface MainPageProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const Main: React.FC<MainPageProps> = () => {
  const [tourData, setTourData] = useState<TourData[]>([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Callyia/Tour/all?page=${currentPage}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTourData(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    };

    fetchTourData();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1700) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)} disabled={i === currentPage}>
          {i}
        </button>
      );
    }
    return pages;
  };

  // useEffect(() => {
  //   const fetchTourData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:8080/Callyia/Tour/all?page=${currentPage}`);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       setTourData(data.content);
  //       setTotalPages(data.totalPages); // 서버로부터 받은 총 페이지 수 설정
  //     } catch (error) {
  //       console.error("Error fetching tour data:", error);
  //     }
  //   };

  //   fetchTourData();

  //   const handleScroll = () => {
  //     if (window.scrollY > 1700) {
  //       setShowTopButton(true);
  //     } else {
  //       setShowTopButton(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [currentPage]);

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  // // 페이지네이션 버튼 렌더링
  // const renderPagination = () => {
  //   let pages = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pages.push(
  //       <button key={i} onClick={() => handlePageChange(i)} disabled={i === currentPage}>
  //         {i}
  //       </button>
  //     );
  //   }
  //   return pages;
  // };

  return (
    <div className="main-container">
      <main className="content">
        <div className="main-section-container">
          <section className="main-section-div" style={{ marginRight: "13%" }}>
            <span className="main-section-span-title">여행 정보</span>
            <div className="main-tour-info-section">
            {tourData.map((tour) => (
              <div key={tour.placeId}>
                {tour.image && (
                  <img src={tour.image} alt={tour.placeName} style={{width: "300px", justifyItems:"center"}}/>
                  )}
                  <h3 className="main-tour-info-text">{tour.placeName}</h3>
              </div>
            ))}
          </div>
            <div className="main-info-pagination-controls">
                  {renderPagination()}
            </div>
          </section>
          
          <table style={{ paddingLeft: "-200px", paddingRight: "200px" }}>
              <tr>
                <td>
                  <a href="/ListPage" style={{fontSize: "50px"}}>ListPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/MyProfilePage" style={{fontSize: "50px"}}>MyProfilePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/PlanningPage" style={{fontSize: "50px"}}>PlanningPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SchedulePage" style={{fontSize: "50px"}}>SchedulePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignInPage" style={{fontSize: "50px"}}>SignInPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignUpPage" style={{fontSize: "50px"}}>SignUpPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/TourPage" style={{fontSize: "50px"}}>TourPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/UserProfilePage" style={{fontSize: "50px"}}>UserProfilePage</a>
                </td>
              </tr>
            </table>
        </div>
        <div className="main-section-container">
        <table style={{ paddingLeft: "200px", paddingRight: "-200px" }}>
              <tr>
                <td>
                  <a href="/ListPage" style={{fontSize: "50px"}}>ListPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/MyProfilePage" style={{fontSize: "50px"}}>MyProfilePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/PlanningPage" style={{fontSize: "50px"}}>PlanningPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SchedulePage" style={{fontSize: "50px"}}>SchedulePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignInPage" style={{fontSize: "50px"}}>SignInPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignUpPage" style={{fontSize: "50px"}}>SignUpPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/TourPage" style={{fontSize: "50px"}}>TourPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/UserProfilePage" style={{fontSize: "50px"}}>UserProfilePage</a>
                </td>
              </tr>
            </table>
          <section className="main-section-div" style={{ marginLeft: "13%" }}>
            <span className="main-section-span-title">여행 계획</span>
            <div></div>
            <input
              type="text"
              className="trip-plan-input"
              placeholder="여행 계획을 입력하세요!"
            />
          </section>
        </div>
        <div className="main-section-container">
          <section className="main-section-div" style={{ marginRight: "13%" }}>
            <span className="main-section-span-title">여행 공유 커뮤니티</span>
            <h3>Title : 여행 공유 커뮤니티1</h3>
            <h4>subTitle : subtitle</h4>
            <img src="/topbar-logo.png" alt="Logo" className="header-logo" />
          </section>
          <table style={{ paddingLeft: "-200px", paddingRight: "200px" }}>
              <tr>
                <td>
                  <a href="/ListPage" style={{fontSize: "50px"}}>ListPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/MyProfilePage" style={{fontSize: "50px"}}>MyProfilePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/PlanningPage" style={{fontSize: "50px"}}>PlanningPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SchedulePage" style={{fontSize: "50px"}}>SchedulePage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignInPage" style={{fontSize: "50px"}}>SignInPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/SignUpPage" style={{fontSize: "50px"}}>SignUpPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/TourPage" style={{fontSize: "50px"}}>TourPage</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/UserProfilePage" style={{fontSize: "50px"}}>UserProfilePage</a>
                </td>
              </tr>
            </table>
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
